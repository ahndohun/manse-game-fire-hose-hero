import { BodyMetricsTracker } from "./body-metrics.js";
import { DEFAULT_REACH_BOX, createChallengeEvaluator, } from "./evaluators/index.js";
import { PlayerTracker } from "./player-tracker.js";
export const DEFAULT_RUNTIME_TUNING = {
    minimumLandmarkConfidence: 0.45,
    baseTargetRadius: 0.078,
    passiveSceneDurationMs: 2_500,
    restSceneDurationMs: 2_000,
    celebrationDurationMs: 1_500,
    maximumPoseDeltaMs: 120,
};
/**
 * Scene orchestration for every challenge primitive. The session owns scene
 * flow, timing, transitions, adaptation, and audio cues; per-mechanic
 * detection lives in pluggable evaluators. Multiplayer packs route each
 * tracked player into an isolated evaluator lane.
 */
export class EpisodeSession {
    pack;
    scenes;
    tuning;
    locale;
    tier;
    onEvent;
    maxPlayers;
    playerMode;
    playerTracker;
    currentScene;
    statusValue = "idle";
    sceneStartedAtMs = 0;
    celebrationStartedAtMs = 0;
    targetsValue = [];
    reachBox = DEFAULT_REACH_BOX;
    activeChallenge = null;
    pendingAdaptation = null;
    lanes = new Map();
    constructor(pack, options) {
        this.pack = pack;
        this.scenes = new Map(pack.scenes.map((scene) => [scene.id, scene]));
        const entry = this.scenes.get(pack.entrySceneId);
        if (entry === undefined)
            throw new Error(`Entry scene '${pack.entrySceneId}' does not exist.`);
        this.currentScene = entry;
        this.locale = options.locale;
        this.tier = options.tier;
        this.tuning = options.tuning ?? DEFAULT_RUNTIME_TUNING;
        this.onEvent = options.onEvent ?? (() => undefined);
        this.maxPlayers = pack.meta.players?.max ?? 1;
        this.playerMode = pack.meta.players === undefined || this.maxPlayers === 1
            ? "solo"
            : pack.meta.players.mode === "versus" ? "versus" : "coop";
        this.playerTracker = this.maxPlayers > 1 ? new PlayerTracker({ maxPlayers: this.maxPlayers }) : null;
    }
    setCalibration(result) {
        this.reachBox = result.reachBox;
    }
    start(timestampMs) {
        if (this.statusValue === "complete")
            return;
        if (this.statusValue === "idle")
            this.enterScene(this.currentScene, timestampMs);
        this.statusValue = "playing";
    }
    updatePose(frame) {
        if (this.statusValue !== "playing" || this.activeChallenge === null)
            return;
        if (this.playerTracker === null) {
            const pose = bestPose(frame);
            this.feedLane(this.lane(0), pose, frame.timestampMs);
        }
        else {
            for (const tracked of this.playerTracker.update(frame)) {
                this.feedLane(this.lane(tracked.playerId), tracked.pose, frame.timestampMs);
            }
        }
        this.refreshTargets();
        if (this.statusValue === "playing" && this.challengeSucceeded(frame.timestampMs)) {
            this.onEvent({
                type: "audio-cue",
                sceneId: this.currentScene.id,
                assetId: this.activeChallenge.successAudioId,
                purpose: "success",
            });
            this.statusValue = "celebrating";
            this.celebrationStartedAtMs = frame.timestampMs;
        }
    }
    tick(timestampMs) {
        if (this.statusValue === "idle" || this.statusValue === "complete")
            return;
        if (this.statusValue === "celebrating") {
            if (timestampMs - this.celebrationStartedAtMs >= this.tuning.celebrationDurationMs) {
                this.followTransition("success", timestampMs);
            }
            return;
        }
        if (this.currentScene.terminal) {
            const duration = this.currentScene.kind === "celebration"
                ? this.tuning.celebrationDurationMs
                : this.tuning.passiveSceneDurationMs;
            if (timestampMs - this.sceneStartedAtMs >= duration)
                this.complete();
            return;
        }
        if (this.currentScene.challenge === null) {
            const duration = this.currentScene.kind === "rest"
                ? this.tuning.restSceneDurationMs
                : this.tuning.passiveSceneDurationMs;
            if (timestampMs - this.sceneStartedAtMs >= duration)
                this.followTransition("always", timestampMs);
            return;
        }
        const challenge = this.activeChallenge;
        if (challenge === null)
            throw new Error(`Scene '${this.currentScene.id}' has no executable challenge state.`);
        for (const lane of this.lanes.values())
            lane.evaluator?.tick(timestampMs);
        if (timestampMs - this.sceneStartedAtMs >= challenge.timeBudgetMs) {
            this.onEvent({
                type: "audio-cue",
                sceneId: this.currentScene.id,
                assetId: challenge.encourageAudioId,
                purpose: "encourage",
            });
            this.followTransition("struggle", timestampMs);
        }
    }
    getSnapshot(timestampMs) {
        const primary = this.primaryLane();
        const guide = primary?.evaluator === null || primary === null
            ? null
            : primary.evaluator.guide(timestampMs);
        const players = this.playerTracker === null
            ? []
            : [...this.lanes.values()].map((lane) => ({
                playerId: lane.playerId,
                colorIndex: lane.colorIndex,
                guide: lane.evaluator?.guide(timestampMs) ?? null,
                targets: lane.evaluator?.targets() ?? [],
                landmarks: lane.landmarks,
            }));
        return {
            status: this.statusValue,
            scene: this.currentScene,
            targets: this.targetsValue,
            caption: selectCaption(this.currentScene, this.locale),
            celebrationProgress: this.statusValue === "celebrating"
                ? Math.min(1, Math.max(0, (timestampMs - this.celebrationStartedAtMs) / this.tuning.celebrationDurationMs))
                : this.currentScene.kind === "celebration"
                    ? Math.min(1, Math.max(0, (timestampMs - this.sceneStartedAtMs) / this.tuning.celebrationDurationMs))
                    : 0,
            poseRequired: this.statusValue === "playing" && this.currentScene.challenge !== null,
            completedTargets: guide?.completedUnits ?? 0,
            totalTargets: guide?.totalUnits ?? 0,
            challenge: guide,
            players,
        };
    }
    lane(playerId) {
        let lane = this.lanes.get(playerId);
        if (lane === undefined) {
            lane = {
                playerId,
                colorIndex: this.lanes.size % 4,
                metrics: new BodyMetricsTracker(),
                evaluator: null,
                landmarks: [],
                lastPoseTimestampMs: null,
                complete: false,
            };
            if (this.activeChallenge !== null) {
                lane.evaluator = this.buildEvaluator(this.activeChallenge, playerId);
                lane.evaluator.enter(this.sceneStartedAtMs);
            }
            this.lanes.set(playerId, lane);
        }
        return lane;
    }
    feedLane(lane, pose, timestampMs) {
        if (lane.evaluator === null)
            return;
        const deltaMs = lane.lastPoseTimestampMs === null
            ? 0
            : Math.min(this.tuning.maximumPoseDeltaMs, Math.max(0, timestampMs - lane.lastPoseTimestampMs));
        lane.lastPoseTimestampMs = timestampMs;
        lane.landmarks = pose?.landmarks ?? [];
        const sample = lane.metrics.update(pose, timestampMs);
        lane.evaluator.update(sample, pose, deltaMs);
        lane.complete = lane.evaluator.isComplete();
    }
    challengeSucceeded(nowMs) {
        if (this.lanes.size === 0)
            return false;
        if (this.playerTracker === null || this.playerMode === "solo") {
            return this.primaryLane()?.complete ?? false;
        }
        if (this.playerMode === "versus") {
            return [...this.lanes.values()].some((lane) => lane.complete);
        }
        // Co-op: every player still present must finish. A player who left keeps
        // the game running for the rest instead of blocking success forever.
        const active = new Set(this.playerTracker.activePlayerIds(nowMs));
        const activeLanes = [...this.lanes.values()].filter((lane) => active.has(lane.playerId));
        const judged = activeLanes.length > 0 ? activeLanes : [...this.lanes.values()];
        return judged.every((lane) => lane.complete);
    }
    refreshTargets() {
        this.targetsValue = this.primaryLane()?.evaluator?.targets() ?? [];
    }
    primaryLane() {
        let primary = null;
        for (const lane of this.lanes.values()) {
            if (primary === null || lane.playerId < primary.playerId)
                primary = lane;
        }
        return primary;
    }
    buildEvaluator(challenge, playerId) {
        return createChallengeEvaluator(challenge, {
            sceneId: this.currentScene.id,
            tier: this.tier,
            tuning: this.tuning,
            reachBox: this.reachBox,
            now: () => performanceNow(),
            emit: (event) => {
                if (event.type === "target-hit") {
                    this.onEvent({
                        type: "target-hit",
                        sceneId: this.currentScene.id,
                        targetId: event.targetId,
                        feedbackLatencyMs: event.feedbackLatencyMs,
                        ...(this.playerTracker === null ? {} : { playerId }),
                    });
                }
                else {
                    this.onEvent({
                        type: "challenge-progress",
                        sceneId: this.currentScene.id,
                        unit: event.unit,
                        total: event.total,
                        label: event.label,
                        ...(this.playerTracker === null ? {} : { playerId }),
                    });
                }
            },
        });
    }
    enterScene(scene, timestampMs) {
        this.currentScene = scene;
        this.sceneStartedAtMs = timestampMs;
        this.statusValue = "playing";
        const previousLanes = this.lanes;
        this.lanes = new Map();
        if (scene.challenge === null) {
            this.activeChallenge = null;
            this.targetsValue = [];
        }
        else {
            this.activeChallenge = adaptChallenge(scene.challenge, this.pendingAdaptation);
            this.pendingAdaptation = null;
            // Players persist across scenes; their evaluators restart per scene.
            const playerIds = this.playerTracker === null ? [0] : [...previousLanes.keys()];
            for (const playerId of playerIds.length > 0 ? playerIds : [0]) {
                const previous = previousLanes.get(playerId);
                const lane = previous === undefined
                    ? {
                        playerId,
                        colorIndex: this.lanes.size % 4,
                        metrics: new BodyMetricsTracker(),
                        evaluator: null,
                        landmarks: [],
                        lastPoseTimestampMs: null,
                        complete: false,
                    }
                    : { ...previous, evaluator: null, complete: false, lastPoseTimestampMs: null };
                lane.evaluator = this.buildEvaluator(this.activeChallenge, playerId);
                lane.evaluator.enter(timestampMs);
                this.lanes.set(playerId, lane);
            }
            this.refreshTargets();
        }
        if (scene.challenge === null)
            this.lanes.clear();
        this.onEvent({ type: "scene-changed", sceneId: scene.id });
    }
    followTransition(event, timestampMs) {
        if (this.currentScene.terminal) {
            this.complete();
            return;
        }
        const transition = this.currentScene.transitions.find((candidate) => candidate.on === event)
            ?? this.currentScene.transitions.find((candidate) => candidate.on === "always");
        if (transition === undefined) {
            throw new Error(`Scene '${this.currentScene.id}' has no '${event}' transition.`);
        }
        if (transition.adapt !== null) {
            this.pendingAdaptation = combineAdaptation(this.pendingAdaptation, transition.adapt);
        }
        const next = this.scenes.get(transition.to);
        if (next === undefined)
            throw new Error(`Transition target '${transition.to}' does not exist.`);
        this.enterScene(next, timestampMs);
    }
    complete() {
        if (this.statusValue === "complete")
            return;
        this.statusValue = "complete";
        this.onEvent({ type: "complete", sceneId: this.currentScene.id });
    }
}
/** Backward-compatible name from the touch-only runtime. */
export const TouchEpisodeSession = EpisodeSession;
const IDENTITY_DELTA = {
    targetScaleMul: 1,
    dwellMsMul: 1,
    countDelta: 0,
    timeBudgetMul: 1,
    toleranceMul: 1,
    holdMsMul: 1,
    repetitionsDelta: 0,
    speedMul: 1,
    motionThresholdMul: 1,
};
function combineAdaptation(current, next) {
    if (current === null)
        return next;
    return {
        targetScaleMul: current.targetScaleMul * next.targetScaleMul,
        dwellMsMul: current.dwellMsMul * next.dwellMsMul,
        countDelta: current.countDelta + next.countDelta,
        timeBudgetMul: current.timeBudgetMul * next.timeBudgetMul,
        toleranceMul: (current.toleranceMul ?? 1) * (next.toleranceMul ?? 1),
        holdMsMul: (current.holdMsMul ?? 1) * (next.holdMsMul ?? 1),
        repetitionsDelta: (current.repetitionsDelta ?? 0) + (next.repetitionsDelta ?? 0),
        speedMul: (current.speedMul ?? 1) * (next.speedMul ?? 1),
        motionThresholdMul: (current.motionThresholdMul ?? 1) * (next.motionThresholdMul ?? 1),
    };
}
/**
 * Struggle adaptation for every primitive, clamped to the schema's own bounds
 * so adapted values always stay inside the declared contract.
 */
export function adaptChallenge(challenge, delta) {
    if (delta === null)
        return challenge;
    const d = { ...IDENTITY_DELTA, ...stripUndefined(delta) };
    const base = {
        timeBudgetMs: Math.round(clamp(challenge.timeBudgetMs * d.timeBudgetMul, 1, 300_000)),
    };
    switch (challenge.type) {
        case "touch_targets":
            return {
                ...challenge,
                ...base,
                count: Math.round(clamp(challenge.count + d.countDelta, 1, 12)),
                targetScale: clamp(challenge.targetScale * d.targetScaleMul, 0.5, 2),
                dwellMs: Math.round(clamp(challenge.dwellMs * d.dwellMsMul, 0, 1_500)),
            };
        case "freeze":
            return {
                ...challenge,
                ...base,
                holdMs: Math.round(clamp(challenge.holdMs * d.holdMsMul, 500, 30_000)),
                motionThreshold: clamp(challenge.motionThreshold * d.motionThresholdMul, 0.001, 0.2),
                rounds: Math.round(clamp(challenge.rounds + d.repetitionsDelta, 1, 10)),
            };
        case "body_zone":
            return {
                ...challenge,
                ...base,
                holdMs: Math.round(clamp(challenge.holdMs * d.holdMsMul, 0, 10_000)),
            };
        case "squat":
            return {
                ...challenge,
                ...base,
                repetitions: Math.round(clamp(challenge.repetitions + d.repetitionsDelta, 1, 30)),
                depthRatio: clamp(challenge.depthRatio / d.toleranceMul, 0.1, 0.6),
                kneeAngleMaxDeg: clamp(challenge.kneeAngleMaxDeg * d.toleranceMul, 60, 150),
                holdMs: Math.round(clamp(challenge.holdMs * d.holdMsMul, 0, 3_000)),
            };
        case "pose_match":
            return {
                ...challenge,
                ...base,
                poses: challenge.poses.map((pose) => ({
                    ...pose,
                    holdMs: Math.round(clamp(pose.holdMs * d.holdMsMul, 200, 10_000)),
                    joints: pose.joints.map((joint) => ({
                        ...joint,
                        toleranceDeg: clamp(joint.toleranceDeg * d.toleranceMul, 5, 60),
                    })),
                })),
            };
        case "jump":
            return {
                ...challenge,
                ...base,
                repetitions: Math.round(clamp(challenge.repetitions + d.repetitionsDelta, 1, 20)),
                minRiseRatio: clamp(challenge.minRiseRatio / d.toleranceMul, 0.05, 0.5),
                landingStableMs: Math.round(clamp(challenge.landingStableMs * d.holdMsMul, 100, 2_000)),
            };
        case "velocity_hit":
            return {
                ...challenge,
                ...base,
                count: Math.round(clamp(challenge.count + d.countDelta, 1, 12)),
                targetScale: clamp(challenge.targetScale * d.targetScaleMul, 0.5, 2),
                minSpeed: clamp(challenge.minSpeed * d.speedMul, 0.3, 5),
            };
        case "step":
            return {
                ...challenge,
                ...base,
                stepRatio: clamp(challenge.stepRatio / d.toleranceMul, 0.1, 0.8),
                holdMs: Math.round(clamp(challenge.holdMs * d.holdMsMul, 0, 2_000)),
            };
        case "sequence":
            return {
                ...challenge,
                ...base,
                steps: challenge.steps.map((step) => adaptSequenceStep(step, d)),
            };
    }
}
function adaptSequenceStep(step, d) {
    switch (step.type) {
        case "touch_targets":
            return {
                ...step,
                count: Math.round(clamp(step.count + d.countDelta, 1, 12)),
                targetScale: clamp(step.targetScale * d.targetScaleMul, 0.5, 2),
                dwellMs: Math.round(clamp(step.dwellMs * d.dwellMsMul, 0, 1_500)),
            };
        case "freeze":
            return {
                ...step,
                holdMs: Math.round(clamp(step.holdMs * d.holdMsMul, 500, 30_000)),
                motionThreshold: clamp(step.motionThreshold * d.motionThresholdMul, 0.001, 0.2),
            };
        case "body_zone":
            return { ...step, holdMs: Math.round(clamp(step.holdMs * d.holdMsMul, 0, 10_000)) };
        case "squat":
            return {
                ...step,
                depthRatio: clamp(step.depthRatio / d.toleranceMul, 0.1, 0.6),
                kneeAngleMaxDeg: clamp(step.kneeAngleMaxDeg * d.toleranceMul, 60, 150),
            };
        case "pose_match":
            return {
                ...step,
                poses: step.poses.map((pose) => ({
                    ...pose,
                    joints: pose.joints.map((joint) => ({
                        ...joint,
                        toleranceDeg: clamp(joint.toleranceDeg * d.toleranceMul, 5, 60),
                    })),
                })),
            };
        case "jump":
            return { ...step, minRiseRatio: clamp(step.minRiseRatio / d.toleranceMul, 0.05, 0.5) };
        case "velocity_hit":
            return { ...step, minSpeed: clamp(step.minSpeed * d.speedMul, 0.3, 5) };
        case "step":
            return { ...step, stepRatio: clamp(step.stepRatio / d.toleranceMul, 0.1, 0.8) };
    }
}
function stripUndefined(value) {
    const result = {};
    for (const [key, entry] of Object.entries(value)) {
        if (entry !== undefined)
            result[key] = entry;
    }
    return result;
}
function bestPose(frame) {
    let best = null;
    for (const candidate of frame.poses) {
        if (best === null || candidate.score > best.score)
            best = candidate;
    }
    return best;
}
function selectCaption(scene, locale) {
    const item = scene.narration.items.find((candidate) => candidate.locale === locale)
        ?? scene.narration.items[0];
    return item?.text ?? null;
}
function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}
function performanceNow() {
    return typeof performance === "undefined" ? Date.now() : performance.now();
}
//# sourceMappingURL=session.js.map