import type { SequenceChallenge, SequenceStep } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
export type StepEvaluatorFactory = (step: SequenceStep, ctx: EvaluatorContext) => ChallengeEvaluator;
/**
 * Ordered combo of inner motion steps. Each inner evaluator runs unmodified;
 * between steps an interStepGraceMs window ignores input so the player can
 * reset posture (landing a jump must not instantly break the next freeze).
 */
export declare class SequenceEvaluator implements ChallengeEvaluator {
    private readonly challenge;
    private readonly ctx;
    private readonly createStep;
    private cursor;
    private current;
    private graceRemainingMs;
    private enteredAtMs;
    constructor(challenge: SequenceChallenge, ctx: EvaluatorContext, createStep: StepEvaluatorFactory);
    enter(timestampMs: number): void;
    update(sample: BodyMetricsSample, pose: RuntimePose | null, deltaMs: number): void;
    tick(timestampMs: number): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(timestampMs: number): ChallengeGuide;
    private buildCurrent;
}
//# sourceMappingURL=sequence.d.ts.map