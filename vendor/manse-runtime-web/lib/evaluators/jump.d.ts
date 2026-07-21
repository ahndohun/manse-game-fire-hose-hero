import type { SequenceStep } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
type JumpConfig = Extract<SequenceStep, {
    type: "jump";
}>;
/**
 * Jump repetitions against the player's own grounded hip baseline: take off by
 * rising minRiseRatio of torso length, then land and stay stable for
 * landingStableMs before the repetition counts. Cooldown rejects re-triggering
 * from landing wobble.
 */
export declare class JumpEvaluator implements ChallengeEvaluator {
    private readonly config;
    private readonly ctx;
    private state;
    private groundedHipY;
    private baselineCount;
    private landingStableMs;
    private cooldownRemainingMs;
    private reps;
    private riseNow;
    private visible;
    private framing;
    private confidence;
    constructor(config: JumpConfig, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, _pose: RuntimePose | null, deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
    private trackBaseline;
}
export {};
//# sourceMappingURL=jump.d.ts.map