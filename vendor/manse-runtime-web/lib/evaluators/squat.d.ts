import type { SequenceStep } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
type SquatConfig = Extract<SequenceStep, {
    type: "squat";
}>;
/**
 * Repetition state machine over body-relative depth: standing hip height is a
 * rolling baseline, the bottom requires the pack's depth ratio (of the
 * player's own torso) plus a bent knee, and a cooldown rejects bounce double
 * counts. Judged joints missing → the machine pauses, it never miscounts.
 */
export declare class SquatEvaluator implements ChallengeEvaluator {
    private readonly config;
    private readonly ctx;
    private readonly holdGoalMs;
    private state;
    private standingHipY;
    private baselineCount;
    private bottomHoldMs;
    private cooldownRemainingMs;
    private reps;
    private visible;
    private depthNow;
    private framing;
    private confidence;
    constructor(config: SquatConfig, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, _pose: RuntimePose | null, deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
    private trackBaseline;
}
export {};
//# sourceMappingURL=squat.d.ts.map