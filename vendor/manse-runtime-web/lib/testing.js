export { ReplayPoseProvider, SimulatedPoseProvider } from "./pose-providers.js";
export { TouchEpisodeSession, EpisodeSession } from "./session.js";
import { POSE_LANDMARK_NAMES } from "./pose-providers.js";
const STANDING_COORDINATES = [
    [.5, .14, -.1], [.47, .13, -.1], [.46, .13, -.1], [.45, .14, -.1],
    [.53, .13, -.1], [.54, .13, -.1], [.55, .14, -.1], [.42, .16, 0],
    [.58, .16, 0], [.47, .19, -.08], [.53, .19, -.08], [.40, .31, 0],
    [.60, .31, 0], [.36, .43, 0], [.64, .43, 0], [.33, .55, 0],
    [.67, .55, 0], [.31, .56, 0], [.69, .56, 0], [.32, .55, 0],
    [.68, .55, 0], [.34, .54, 0], [.66, .54, 0], [.44, .58, 0],
    [.56, .58, 0], [.43, .76, 0], [.57, .76, 0], [.42, .94, 0],
    [.58, .94, 0], [.41, .96, .03], [.59, .96, .03], [.43, .98, -.04],
    [.57, .98, -.04],
];
export function standingLandmarks() {
    return POSE_LANDMARK_NAMES.map((name, index) => {
        const coordinate = STANDING_COORDINATES[index] ?? [.5, .5, 0];
        return {
            index,
            name,
            x: coordinate[0],
            y: coordinate[1],
            z: coordinate[2],
            visibility: 1,
            presence: 1,
        };
    });
}
/** Expand a keyframe script into deterministic full-body pose frames. */
export function synthesizePoseFrames(script, startSequence = 0) {
    const keyframes = [...script.keyframes].sort((a, b) => a.atMs - b.atMs);
    const frameCount = Math.max(1, Math.round((script.durationMs / 1000) * script.fps));
    const frames = [];
    for (let index = 0; index <= frameCount; index += 1) {
        const timestampMs = Math.round((index * 1000) / script.fps);
        if (timestampMs > script.durationMs)
            break;
        frames.push({
            timestampMs,
            sequence: startSequence + index,
            poses: [poseAt(keyframes, timestampMs)],
            source: "replay",
            mirrored: true,
            synthetic: true,
            inferenceTimeMs: 0,
        });
    }
    return frames;
}
/** Zip per-player scripts into shared multi-pose frames (multiplayer replays). */
export function synthesizeMultiPoseFrames(scripts, fps, durationMs) {
    const sortedScripts = scripts.map((script) => [...script.keyframes].sort((a, b) => a.atMs - b.atMs));
    const frameCount = Math.max(1, Math.round((durationMs / 1000) * fps));
    const frames = [];
    for (let index = 0; index <= frameCount; index += 1) {
        const timestampMs = Math.round((index * 1000) / fps);
        if (timestampMs > durationMs)
            break;
        frames.push({
            timestampMs,
            sequence: index,
            poses: sortedScripts.map((keyframes) => poseAt(keyframes, timestampMs)),
            source: "replay",
            mirrored: true,
            synthetic: true,
            inferenceTimeMs: 0,
        });
    }
    return frames;
}
function poseAt(keyframes, timestampMs) {
    const { before, after, t } = bracket(keyframes, timestampMs);
    const body = {
        dx: lerp(before?.body?.dx ?? 0, after?.body?.dx ?? 0, t),
        dy: lerp(before?.body?.dy ?? 0, after?.body?.dy ?? 0, t),
    };
    const jointNames = new Set([
        ...Object.keys(before?.joints ?? {}),
        ...Object.keys(after?.joints ?? {}),
    ]);
    const landmarks = standingLandmarks().map((landmark) => {
        let dx = body.dx;
        let dy = body.dy;
        let visibility = 1;
        if (jointNames.has(landmark.name)) {
            const a = before?.joints?.[landmark.name];
            const b = after?.joints?.[landmark.name];
            dx += lerp(a?.dx ?? 0, b?.dx ?? 0, t);
            dy += lerp(a?.dy ?? 0, b?.dy ?? 0, t);
            visibility = lerp(a?.visibility ?? 1, b?.visibility ?? 1, t);
        }
        return {
            ...landmark,
            x: clamp01(landmark.x + dx),
            y: clamp01(landmark.y + dy),
            visibility,
            presence: visibility,
        };
    });
    const score = landmarks.reduce((sum, landmark) => sum + Math.min(landmark.visibility, landmark.presence), 0)
        / Math.max(1, landmarks.length);
    return { landmarks, score };
}
function bracket(keyframes, timestampMs) {
    if (keyframes.length === 0)
        return { before: undefined, after: undefined, t: 0 };
    let before = keyframes[0];
    let after = keyframes[keyframes.length - 1];
    for (const keyframe of keyframes) {
        if (keyframe.atMs <= timestampMs)
            before = keyframe;
        if (keyframe.atMs >= timestampMs) {
            after = keyframe;
            break;
        }
    }
    if (before === undefined || after === undefined || after.atMs === before.atMs) {
        return { before, after, t: 0 };
    }
    return { before, after, t: (timestampMs - before.atMs) / (after.atMs - before.atMs) };
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function clamp01(value) {
    return Math.min(1, Math.max(0, value));
}
//# sourceMappingURL=testing.js.map