import type { BodyMetricsSample } from "../body-metrics.js";
import type { RuntimeTuning } from "../session.js";
import type { ChallengeGuide, DeviceTier, RuntimePose, RuntimeTarget } from "../types.js";
export interface NormBox {
    readonly x0: number;
    readonly y0: number;
    readonly x1: number;
    readonly y1: number;
}
export declare const DEFAULT_REACH_BOX: NormBox;
export type EvaluatorEvent = {
    readonly type: "target-hit";
    readonly targetId: string;
    readonly feedbackLatencyMs: number;
} | {
    readonly type: "unit-complete";
    readonly unit: number;
    readonly total: number;
    readonly label: string;
};
export interface EvaluatorContext {
    readonly sceneId: string;
    readonly tier: DeviceTier;
    readonly tuning: RuntimeTuning;
    readonly reachBox: NormBox;
    readonly emit: (event: EvaluatorEvent) => void;
    /** Wall clock for feedback-latency measurement only; never for judging. */
    readonly now: () => number;
}
/**
 * One challenge primitive = one evaluator. The session owns scenes, timing,
 * transitions, and audio; the evaluator owns detection state and reports
 * progress through the shared ChallengeGuide contract.
 */
export interface ChallengeEvaluator {
    enter(timestampMs: number): void;
    /**
     * Feed one pose frame. `pose` is the raw best-scoring pose (for contact
     * checks needing original confidence semantics); `sample` is the gated,
     * body-relative measurement set. `deltaMs` is session-clamped frame delta.
     */
    update(sample: BodyMetricsSample, pose: RuntimePose | null, deltaMs: number): void;
    /** Render-clock tick for cooldowns and grace windows between pose frames. */
    tick(timestampMs: number): void;
    isComplete(): boolean;
    targets(): readonly RuntimeTarget[];
    guide(timestampMs: number): ChallengeGuide;
}
export declare const TARGET_PALETTE: readonly (readonly [number, number, number, number])[];
export interface MutableTarget {
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly radius: number;
    readonly color: readonly [number, number, number, number];
    dwellMs: number;
    hit: boolean;
}
export declare function createGridTargets(sceneId: string, count: number, zone: "upper" | "lower" | "full" | "reachable", scale: number, reachBox: NormBox, baseRadius: number): MutableTarget[];
export declare function zoneBounds(zone: "upper" | "lower" | "full" | "reachable", reachBox: NormBox): NormBox;
export declare function getLimbPoints(pose: RuntimePose | null, limb: "hands" | "feet" | "any", confidence: number): readonly {
    readonly x: number;
    readonly y: number;
    readonly name: string;
}[];
/** Guidance when the player's torso is unusably small or large on screen. */
export declare function framingHint(sample: BodyMetricsSample): "closer" | "farther" | null;
export declare function baseGuide(kind: ChallengeGuide["kind"]): ChallengeGuide;
export declare function toRuntimeTarget(target: MutableTarget, dwellGoal: number, requiredDirection?: "any" | "up" | "down" | "left" | "right" | null): RuntimeTarget;
export declare function distanceSquared(x0: number, y0: number, x1: number, y1: number): number;
export declare function mix(a: number, b: number, t: number): number;
export declare function clamp(value: number, minimum: number, maximum: number): number;
export declare function meanConfidence(sample: BodyMetricsSample, names: readonly string[]): number;
//# sourceMappingURL=evaluator.d.ts.map