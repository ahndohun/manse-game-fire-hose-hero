import type { TouchTargetsChallenge } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
/**
 * The 0.1 touch mechanic, unchanged: dwell inside a target with the named limb
 * until the tier-scaled dwell goal is met. One hit per pose sample keeps
 * overlapping layouts deterministic.
 */
export declare class TouchTargetsEvaluator implements ChallengeEvaluator {
    private readonly challenge;
    private readonly ctx;
    private readonly dwellGoal;
    private targetList;
    private framing;
    private confidence;
    constructor(challenge: TouchTargetsChallenge, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, pose: RuntimePose | null, deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
    private completedCount;
}
//# sourceMappingURL=touch-targets.d.ts.map