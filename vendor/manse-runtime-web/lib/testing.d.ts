export { ReplayPoseProvider, SimulatedPoseProvider } from "./pose-providers.js";
export { TouchEpisodeSession, EpisodeSession } from "./session.js";
export type { RuntimePlatform, RuntimePoseFrame } from "./types.js";
import type { RuntimeLandmark, RuntimePoseFrame } from "./types.js";
/**
 * Deterministic replay synthesis: every detector is testable without a camera
 * by expanding a compact keyframe script into full 33-landmark pose frames.
 * The same scripts drive unit tests, the Playground's replay mode, and
 * device benchmarking, so a regression means the same numbers everywhere.
 */
export interface MotionAdjust {
    readonly dx?: number;
    readonly dy?: number;
    /** Overrides both visibility and presence when set. */
    readonly visibility?: number;
}
export interface MotionKeyframe {
    readonly atMs: number;
    /** Whole-body offset — jumps, crouches, side steps. */
    readonly body?: {
        readonly dx?: number;
        readonly dy?: number;
    };
    /** Per-landmark offsets from the canonical standing pose. */
    readonly joints?: Readonly<Record<string, MotionAdjust>>;
}
export interface MotionScript {
    readonly fps: number;
    readonly durationMs: number;
    readonly keyframes: readonly MotionKeyframe[];
}
export declare function standingLandmarks(): RuntimeLandmark[];
/** Expand a keyframe script into deterministic full-body pose frames. */
export declare function synthesizePoseFrames(script: MotionScript, startSequence?: number): RuntimePoseFrame[];
/** Zip per-player scripts into shared multi-pose frames (multiplayer replays). */
export declare function synthesizeMultiPoseFrames(scripts: readonly MotionScript[], fps: number, durationMs: number): RuntimePoseFrame[];
//# sourceMappingURL=testing.d.ts.map