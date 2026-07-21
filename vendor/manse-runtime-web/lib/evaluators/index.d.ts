import type { Challenge } from "@manse/schema";
import type { ChallengeEvaluator, EvaluatorContext } from "./evaluator.js";
export * from "./evaluator.js";
export { buildSilhouette } from "./pose-match.js";
/**
 * The registry is the only place that knows every primitive. Adding the next
 * mechanic means adding one evaluator file and one case here — the session,
 * player, and renderers stay untouched.
 */
export declare function createChallengeEvaluator(challenge: Challenge, ctx: EvaluatorContext): ChallengeEvaluator;
//# sourceMappingURL=index.d.ts.map