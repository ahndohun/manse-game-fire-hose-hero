import type { SequenceStep } from "@manse/schema";
import { type BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget, SilhouetteSegment } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
type PoseMatchConfig = Extract<SequenceStep, {
    type: "pose_match";
}>;
/**
 * Angle-based pose comparison. Judgments use interior joint angles, which are
 * independent of body size, camera distance, and screen position; the
 * mirrorPolicy accepts the left/right swapped pose when packs allow it.
 * Partially hidden joints simply drop out of the ratio's denominator.
 */
export declare class PoseMatchEvaluator implements ChallengeEvaluator {
    private readonly config;
    private readonly ctx;
    private readonly noiseScale;
    private cursor;
    private heldMs;
    private matchedNow;
    private mirroredBest;
    private lastSample;
    private framing;
    private confidence;
    constructor(config: PoseMatchConfig, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, _pose: RuntimePose | null, deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
    private holdGoalMs;
    private matchScore;
    private jointFeedback;
}
/**
 * Deterministic ghost skeleton for the target pose: limbs rotate outward from
 * a canonical torso by the pack's target angles, so creators see the shape
 * they asked for without any model inference.
 */
export declare function buildSilhouette(pose: PoseMatchConfig["poses"][number]): readonly SilhouetteSegment[];
export {};
//# sourceMappingURL=pose-match.d.ts.map