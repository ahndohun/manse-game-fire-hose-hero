import type { RuntimePose } from "./types.js";
/**
 * Body-relative measurement layer shared by every challenge evaluator.
 *
 * Detectors never judge absolute pixels: thresholds are expressed as ratios of
 * the player's own torso length ("body units") and joint angles in degrees, so
 * a small child close to the camera and an adult far away meet the same
 * challenge. Landmarks below confidence are excluded, and briefly occluded
 * joints are held at their last confident position instead of failing the
 * player (hysteresis).
 */
export type JointAngleName = "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
export interface TrackedPoint {
    readonly x: number;
    readonly y: number;
    /** Confidence of the underlying landmark when last observed. */
    readonly confidence: number;
    /** True when the value is a held-over position during brief occlusion. */
    readonly held: boolean;
}
export interface LimbMotion {
    readonly x: number;
    readonly y: number;
    /** Screen-space speed in normalized units per second. */
    readonly speed: number;
    readonly vx: number;
    readonly vy: number;
}
export interface BodyMetricsSample {
    readonly timestampMs: number;
    /** Smoothed torso length in normalized units; 0 while the body is unseen. */
    readonly bodyScale: number;
    /** Shoulder/hip centroid. */
    readonly center: TrackedPoint | null;
    readonly headY: number | null;
    readonly hipY: number | null;
    /** Rolling estimate of the floor line from confident ankle positions. */
    readonly floorY: number | null;
    /** Mean confident-landmark motion in normalized units per second. */
    readonly motionPerSecond: number;
    readonly visibleJointCount: number;
    /** Confidence-gated joints, with brief occlusion held. */
    readonly joints: ReadonlyMap<string, TrackedPoint>;
    /** Joint angles in degrees (straight = 180). Missing when a vertex is unseen. */
    readonly angles: ReadonlyMap<JointAngleName, number>;
    readonly limbSpeeds: ReadonlyMap<string, LimbMotion>;
}
export interface BodyMetricsOptions {
    /** Landmark becomes visible at or above this confidence. */
    readonly enterConfidence?: number;
    /** Landmark stays visible until it falls below this confidence. */
    readonly exitConfidence?: number;
    /** How long an occluded joint keeps its last confident position. */
    readonly occlusionHoldMs?: number;
    /** EMA factor for body scale smoothing (higher = snappier). */
    readonly scaleSmoothing?: number;
}
export declare const SPEED_TRACKED_LANDMARKS: readonly ["left_wrist", "right_wrist", "left_ankle", "right_ankle"];
export declare class BodyMetricsTracker {
    private readonly enterConfidence;
    private readonly exitConfidence;
    private readonly occlusionHoldMs;
    private readonly scaleSmoothing;
    private readonly gates;
    private readonly previousJoints;
    private readonly limbHistory;
    private previousTimestampMs;
    private smoothedScale;
    private floorEstimate;
    constructor(options?: BodyMetricsOptions);
    reset(): void;
    update(pose: RuntimePose | null, timestampMs: number): BodyMetricsSample;
    private gateLandmarks;
    private computeMotion;
    private computeLimbSpeeds;
    private updateScale;
    private updateFloor;
    private computeAngles;
}
/** Interior angle at vertex b, in degrees. Straight limb = 180. */
export declare function angleDegrees(a: {
    readonly x: number;
    readonly y: number;
}, b: {
    readonly x: number;
    readonly y: number;
}, c: {
    readonly x: number;
    readonly y: number;
}): number;
export declare function mirrorJointName(name: JointAngleName): JointAngleName;
//# sourceMappingURL=body-metrics.d.ts.map