import { mergeMediaPipeAssets, parseRuntimeOverrides, resolveProvider, resolveTier, } from "./config.js";
import { loadEpisodePack, resolvePackAssetUrl } from "./loader.js";
import { createBrowserPlatform } from "./platform.js";
import { createDefaultPoseProvider, isPointerControllable, } from "./pose-providers.js";
import { createDefaultRenderer } from "./renderers/index.js";
import { TouchEpisodeSession } from "./session.js";
const DEFAULT_CALIBRATION = {
    sampleCount: 0,
    confidence: 0,
    reachBox: { x0: 0.16, y0: 0.16, x1: 0.84, y1: 0.9 },
};
export function createMansePlayer(options) {
    return new BrowserMansePlayer(options);
}
class BrowserMansePlayer {
    options;
    platform;
    providerKind;
    tier;
    mirror;
    reducedStimulation;
    captions;
    listeners = new Set();
    loaded = null;
    session = null;
    provider = null;
    renderer = null;
    providerUnsubscribe = null;
    stream = null;
    video = null;
    phase = "idle";
    error = null;
    calibration = null;
    caption = null;
    animationFrame = null;
    renderWindowStartedAtMs = 0;
    renderFramesInWindow = 0;
    renderFps = 0;
    inputToFeedbackMs = null;
    narrationAudio = null;
    effectAudio = null;
    constructor(options) {
        this.options = options;
        this.platform = options.platform ?? createBrowserPlatform();
        const overrides = parseRuntimeOverrides(this.platform.location.search);
        this.providerKind = resolveProvider(options.provider ?? "auto", overrides.provider);
        this.tier = resolveTier(options.tier ?? "auto", overrides.tier, this.platform.document);
        this.mirror = options.mirror ?? true;
        this.reducedStimulation = options.reducedStimulation ?? false;
        this.captions = options.captions ?? true;
    }
    async load(source) {
        this.assertAlive();
        this.setPhase("loading");
        this.error = null;
        try {
            const loaded = await loadEpisodePack(source, this.platform);
            this.loaded = loaded;
            this.session = new TouchEpisodeSession(loaded.pack, {
                locale: this.options.locale ?? loaded.pack.meta.locales[0] ?? "en",
                tier: this.tier,
                onEvent: (event) => this.handleSessionEvent(event),
            });
            this.options.onEvent?.({ type: "pack-loaded", packId: loaded.pack.meta.id });
            this.setPhase("ready");
            return loaded;
        }
        catch (error) {
            throw this.fail(error, "Unable to load the Manse game pack.");
        }
    }
    async setup() {
        this.assertAlive();
        this.assertLoaded();
        if (this.provider !== null)
            return;
        this.setPhase("setting-up");
        try {
            this.renderer = (this.options.rendererFactory ?? createDefaultRenderer)({
                container: this.options.container,
                tier: this.tier,
                mirror: this.mirror,
                reducedStimulation: this.reducedStimulation,
                document: this.platform.document,
            });
            this.provider = await (this.options.providerFactory ?? createDefaultPoseProvider)({
                kind: this.providerKind,
                tier: this.tier,
                mirror: this.mirror,
                mediaPipeAssets: mergeMediaPipeAssets(this.options.mediaPipeAssets, this.platform),
                replayFrames: this.options.replayFrames,
                document: this.platform.document,
                timing: this.platform,
                maxPoses: this.loaded?.pack.meta.players?.max ?? 1,
            });
            this.providerUnsubscribe = this.provider.subscribe((frame) => this.handlePose(frame));
            await this.provider.initialize();
            if (this.providerKind === "mediapipe") {
                await this.startCameraProvider();
            }
            else {
                await this.provider.start();
            }
            this.setPhase("ready");
            this.renderNow(this.platform.now());
        }
        catch (error) {
            await this.releaseRuntimeResources();
            throw this.fail(error, "Unable to prepare the Manse player.");
        }
    }
    async calibrate(options = {}) {
        this.assertAlive();
        this.assertLoaded();
        if (this.provider === null)
            await this.setup();
        const provider = this.provider;
        if (provider === null)
            throw new Error("Pose provider setup did not complete.");
        this.setPhase("calibrating");
        const minimumSamples = options.minimumSamples ?? (this.providerKind === "mediapipe" ? 8 : 1);
        const durationMs = options.durationMs ?? (this.providerKind === "mediapipe" ? 1_200 : 80);
        const frames = [];
        const latest = provider.getLatestFrame();
        if (latest !== null)
            frames.push(latest);
        const unsubscribe = provider.subscribe((frame) => frames.push(frame));
        await delay(this.platform, durationMs);
        unsubscribe();
        const result = calibrationFromFrames(frames, minimumSamples);
        this.calibration = result;
        this.session?.setCalibration(result);
        this.options.onEvent?.({ type: "calibrated", result });
        this.setPhase("ready");
        return result;
    }
    async play() {
        this.assertAlive();
        this.assertLoaded();
        if (this.provider === null || this.renderer === null)
            await this.setup();
        if (this.provider?.state === "paused")
            this.provider.resume();
        this.session?.start(this.platform.now());
        this.setPhase("playing");
        this.startRenderLoop();
    }
    async pause() {
        this.assertAlive();
        this.stopRenderLoop();
        this.provider?.pause();
        this.setPhase("paused");
    }
    async destroy() {
        if (this.phase === "destroyed")
            return;
        this.stopRenderLoop();
        await this.releaseRuntimeResources();
        this.loaded = null;
        this.session = null;
        this.caption = null;
        this.setPhase("destroyed");
        this.listeners.clear();
    }
    getSnapshot() {
        const now = this.platform.now();
        const session = this.session?.getSnapshot(now) ?? null;
        const providerMetrics = this.provider?.getMetrics();
        return {
            phase: this.phase,
            packId: this.loaded?.pack.meta.id ?? null,
            sceneId: session?.scene.id ?? null,
            sceneKind: session?.scene.kind ?? null,
            provider: this.providerKind,
            tier: this.tier,
            renderer: this.renderer?.kind ?? null,
            cameraActive: this.stream !== null,
            mirror: this.mirror,
            reducedStimulation: this.reducedStimulation,
            captions: this.captions,
            caption: this.captions ? (session?.caption ?? this.caption) : null,
            calibration: this.calibration,
            targetProgress: session === null || session.totalTargets === 0
                ? null
                : { completed: session.completedTargets, total: session.totalTargets },
            challenge: session?.challenge ?? null,
            players: session?.players ?? [],
            metrics: {
                renderFps: this.renderFps,
                inferenceHz: providerMetrics?.inferenceHz ?? 0,
                averageInferenceMs: providerMetrics?.averageInferenceMs ?? 0,
                inputToFeedbackMs: this.inputToFeedbackMs,
            },
            error: this.error,
        };
    }
    subscribe(listener) {
        this.assertAlive();
        this.listeners.add(listener);
        listener(this.getSnapshot());
        return () => this.listeners.delete(listener);
    }
    setPointer(x, y, side = "right") {
        this.assertAlive();
        if (this.provider === null || !isPointerControllable(this.provider)) {
            throw new Error("Pointer control is available only in simulator mode after setup.");
        }
        this.provider.setPointer(clamp(x, 0, 1), clamp(y, 0, 1), side);
    }
    async startCameraProvider() {
        const provider = this.provider;
        if (provider === null)
            return;
        const video = this.platform.document.createElement("video");
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("aria-hidden", "true");
        const stream = await this.platform.getUserMedia({
            audio: false,
            video: {
                facingMode: this.options.camera?.facingMode ?? "user",
                width: { ideal: this.options.camera?.width ?? 1280 },
                height: { ideal: this.options.camera?.height ?? 720 },
            },
        });
        video.srcObject = stream;
        await video.play();
        this.video = video;
        this.stream = stream;
        this.options.onEvent?.({ type: "camera-started" });
        await provider.start(video);
    }
    handlePose(frame) {
        this.session?.updatePose(frame);
    }
    handleSessionEvent(event) {
        switch (event.type) {
            case "target-hit":
                this.inputToFeedbackMs = event.feedbackLatencyMs;
                this.options.onEvent?.({
                    type: "target-hit",
                    sceneId: event.sceneId,
                    targetId: event.targetId,
                    ...(event.playerId === undefined ? {} : { playerId: event.playerId }),
                });
                break;
            case "challenge-progress":
                this.options.onEvent?.({
                    type: "challenge-progress",
                    sceneId: event.sceneId,
                    unit: event.unit,
                    total: event.total,
                    label: event.label,
                    ...(event.playerId === undefined ? {} : { playerId: event.playerId }),
                });
                break;
            case "audio-cue":
                void this.playEffect(event.assetId).catch(() => undefined);
                break;
            case "scene-changed":
                this.options.onEvent?.({ type: "scene-changed", sceneId: event.sceneId });
                void this.playSceneNarration(event.sceneId).catch(() => undefined);
                break;
            case "complete":
                this.setPhase("complete");
                this.options.onEvent?.({ type: "complete" });
                this.stopRenderLoop();
                break;
        }
    }
    startRenderLoop() {
        if (this.animationFrame !== null)
            return;
        this.renderWindowStartedAtMs = this.platform.now();
        this.renderFramesInWindow = 0;
        const update = (timestampMs) => {
            this.animationFrame = null;
            this.renderNow(timestampMs);
            if (this.phase === "playing" || this.phase === "celebrating") {
                this.animationFrame = this.platform.requestAnimationFrame(update);
            }
        };
        this.animationFrame = this.platform.requestAnimationFrame(update);
    }
    stopRenderLoop() {
        if (this.animationFrame === null)
            return;
        this.platform.cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
    }
    renderNow(timestampMs) {
        const session = this.session;
        const renderer = this.renderer;
        if (session === null || renderer === null)
            return;
        session.tick(timestampMs);
        const state = session.getSnapshot(timestampMs);
        if (state.status === "celebrating" && this.phase !== "celebrating")
            this.setPhase("celebrating");
        if (state.status === "playing" && this.phase === "celebrating")
            this.setPhase("playing");
        if (state.status === "complete" && this.phase !== "complete")
            this.setPhase("complete");
        const caption = this.captions ? state.caption : null;
        if (caption !== this.caption) {
            this.caption = caption;
            this.options.onCaption?.(caption);
        }
        renderer.render({
            timestampMs,
            video: this.video,
            poseFrame: this.provider?.getLatestFrame() ?? null,
            targets: state.targets,
            celebrationProgress: state.celebrationProgress,
            caption,
            mirror: this.mirror,
            reducedStimulation: this.reducedStimulation,
            tier: this.tier,
            challenge: state.challenge,
            players: state.players,
        });
        this.trackRenderRate(timestampMs);
        this.emitSnapshot();
    }
    trackRenderRate(timestampMs) {
        this.renderFramesInWindow += 1;
        const elapsed = timestampMs - this.renderWindowStartedAtMs;
        if (elapsed < 500)
            return;
        this.renderFps = this.renderFramesInWindow * 1000 / Math.max(1, elapsed);
        this.renderFramesInWindow = 0;
        this.renderWindowStartedAtMs = timestampMs;
    }
    setPhase(phase) {
        if (this.phase === phase)
            return;
        this.phase = phase;
        const event = { type: "phase", phase };
        this.options.onEvent?.(event);
        this.emitSnapshot();
    }
    emitSnapshot() {
        if (this.listeners.size === 0)
            return;
        const snapshot = this.getSnapshot();
        for (const listener of this.listeners)
            listener(snapshot);
    }
    fail(error, fallback) {
        const normalized = error instanceof Error ? error : new Error(fallback, { cause: error });
        this.error = normalized;
        this.phase = "error";
        this.options.onEvent?.({ type: "error", error: normalized });
        this.emitSnapshot();
        return normalized;
    }
    assertLoaded() {
        if (this.loaded === null || this.session === null)
            throw new Error("Load a Manse pack before starting the player.");
    }
    assertAlive() {
        if (this.phase === "destroyed")
            throw new Error("This Manse player has been destroyed.");
    }
    async releaseRuntimeResources() {
        await this.stopNarration();
        this.stopAudio("effect");
        this.providerUnsubscribe?.();
        this.providerUnsubscribe = null;
        await this.provider?.destroy();
        this.provider = null;
        if (this.stream !== null) {
            for (const track of this.stream.getTracks())
                track.stop();
            this.options.onEvent?.({ type: "camera-stopped" });
        }
        this.stream = null;
        if (this.video !== null) {
            this.video.pause();
            this.video.srcObject = null;
            this.video.remove();
        }
        this.video = null;
        this.renderer?.destroy();
        this.renderer = null;
    }
    async playSceneNarration(sceneId) {
        await this.stopNarration();
        const loaded = this.loaded;
        if (loaded === null || this.phase === "destroyed")
            return;
        const scene = loaded.pack.scenes.find((candidate) => candidate.id === sceneId);
        if (scene === undefined)
            return;
        const locale = this.options.locale ?? loaded.pack.meta.locales[0] ?? "en";
        const item = scene.narration.items.find((candidate) => candidate.locale === locale)
            ?? scene.narration.items[0];
        if (item === undefined)
            return;
        const cue = {
            sceneId,
            locale: item.locale,
            text: item.text,
            audioUrl: item.audioAssetId === null
                ? null
                : resolvePackAssetUrl(loaded.pack, item.audioAssetId, loaded.baseUrl),
        };
        if (this.options.narration !== undefined) {
            await this.options.narration.play(cue);
        }
        else if (cue.audioUrl !== null) {
            await this.playDefaultAudio(cue.audioUrl, "narration");
        }
    }
    async playEffect(assetId) {
        const loaded = this.loaded;
        if (loaded === null || this.phase === "destroyed")
            return;
        await this.playDefaultAudio(resolvePackAssetUrl(loaded.pack, assetId, loaded.baseUrl), "effect");
    }
    async playDefaultAudio(url, channel) {
        this.stopAudio(channel);
        const audio = this.platform.document.createElement("audio");
        audio.preload = "auto";
        audio.src = url.toString();
        if (channel === "narration")
            this.narrationAudio = audio;
        else
            this.effectAudio = audio;
        try {
            await audio.play();
        }
        catch (error) {
            this.stopAudio(channel);
            throw error;
        }
    }
    async stopNarration() {
        this.stopAudio("narration");
        try {
            await this.options.narration?.stop();
        }
        catch {
            // Audio cleanup must not prevent camera or renderer cleanup.
        }
    }
    stopAudio(channel) {
        const audio = channel === "narration" ? this.narrationAudio : this.effectAudio;
        if (audio === null)
            return;
        audio.pause();
        audio.src = "";
        audio.remove();
        if (channel === "narration")
            this.narrationAudio = null;
        else
            this.effectAudio = null;
    }
}
function calibrationFromFrames(frames, minimumSamples) {
    const points = [];
    for (const frame of frames) {
        const pose = frame.poses.reduce((best, candidate) => best === undefined || candidate.score > best.score ? candidate : best, undefined);
        for (const landmark of pose?.landmarks ?? []) {
            if (!["left_wrist", "right_wrist", "left_ankle", "right_ankle"].includes(landmark.name))
                continue;
            if (Math.min(landmark.visibility, landmark.presence) < 0.35)
                continue;
            points.push({ x: landmark.x, y: landmark.y });
        }
    }
    if (points.length === 0)
        return { ...DEFAULT_CALIBRATION, sampleCount: frames.length };
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const x0 = clamp(Math.min(...xs) - 0.14, 0.03, 0.45);
    const x1 = clamp(Math.max(...xs) + 0.14, 0.55, 0.97);
    const y0 = clamp(Math.min(...ys) - 0.14, 0.03, 0.45);
    const y1 = clamp(Math.max(...ys) + 0.08, 0.55, 0.97);
    return {
        sampleCount: frames.length,
        confidence: clamp(frames.length / Math.max(1, minimumSamples), 0, 1),
        reachBox: { x0, y0, x1, y1 },
    };
}
function delay(platform, durationMs) {
    return new Promise((resolve) => platform.setTimeout(resolve, Math.max(0, durationMs)));
}
function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}
//# sourceMappingURL=player.js.map