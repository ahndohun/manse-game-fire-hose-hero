import type { BodyZoneChallenge } from "@manse/schema";
import type { BodyMetricsSample } from "../body-metrics.js";
import type { ChallengeGuide, RuntimePose, RuntimeTarget } from "../types.js";
import { type ChallengeEvaluator, type EvaluatorContext } from "./evaluator.js";
/**
 * Enter/avoid regions with the named body part. Zones arm one at a time in
 * pack order; `enter` demands staying inside the active zone for the hold,
 * `avoid` demands staying out of it.
 */
export declare class BodyZoneEvaluator implements ChallengeEvaluator {
    private readonly challenge;
    private readonly ctx;
    private readonly holdGoalMs;
    private cursor;
    private heldMs;
    private inside;
    private partSeen;
    private framing;
    private confidence;
    constructor(challenge: BodyZoneChallenge, ctx: EvaluatorContext);
    enter(): void;
    update(sample: BodyMetricsSample, _pose: RuntimePose | null, deltaMs: number): void;
    tick(): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(): ChallengeGuide;
    private partPoints;
}
//# sourceMappingURL=body-zone.d.ts.map