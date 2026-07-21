import type { SequenceStep } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
type VelocityHitConfig = Extract<SequenceStep, {
    type: "velocity_hit";
}>;
/**
 * Strike targets: contact only counts when the limb arrives at or above the
 * pack's on-screen speed, optionally from a required direction. Copy shown to
 * players must call this screen speed — the engine cannot measure real-world
 * force and never claims to.
 */
export declare class VelocityHitEvaluator implements ChallengeEvaluator {
    private readonly config;
    private readonly ctx;
    private targetList;
    private lastSpeed;
    private framing;
    private confidence;
    constructor(config: VelocityHitConfig, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, _pose: RuntimePose | null, _deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
    private completedCount;
}
export {};
//# sourceMappingURL=velocity-hit.d.ts.map