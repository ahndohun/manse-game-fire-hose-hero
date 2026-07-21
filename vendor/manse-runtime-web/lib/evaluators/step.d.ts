import type { SequenceStep } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
type StepConfig = Extract<SequenceStep, {
    type: "step";
}>;
/**
 * Dance-step pattern: each entry names the foot that must travel sideways by
 * stepRatio of the player's torso length, in that foot's own direction, and
 * settle for holdMs. Pose frames arrive mirrored into screen space, so the
 * player's left foot moving to their left is a decrease in x.
 */
export declare class StepEvaluator implements ChallengeEvaluator {
    private readonly config;
    private readonly ctx;
    private readonly holdGoalMs;
    private cursor;
    private baseline;
    private baselineCount;
    private settleMs;
    private travelNow;
    private visible;
    private framing;
    private confidence;
    constructor(config: StepConfig, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, _pose: RuntimePose | null, deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
}
export {};
//# sourceMappingURL=step.d.ts.map