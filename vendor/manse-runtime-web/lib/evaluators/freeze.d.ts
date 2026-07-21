import type { FreezeChallenge } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
/**
 * Statue mechanic: whole-body motion must stay under the pack's threshold for
 * the hold window. Short spikes inside graceMs pause the hold instead of
 * resetting it, and losing joints below minVisibleJoints pauses judging
 * entirely — occlusion never fails the player.
 */
export declare class FreezeEvaluator implements ChallengeEvaluator {
    private readonly challenge;
    private readonly ctx;
    private readonly holdGoalMs;
    private readonly noiseScaledThreshold;
    private heldMs;
    private spikeMs;
    private roundsDone;
    private paused;
    private armed;
    private rearmMs;
    private framing;
    private confidence;
    constructor(challenge: FreezeChallenge, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, _pose: RuntimePose | null, deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
}
//# sourceMappingURL=freeze.d.ts.map