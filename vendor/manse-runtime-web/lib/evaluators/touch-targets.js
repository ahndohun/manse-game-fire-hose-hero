import { TIER_PROFILES } from "../config.js";
import { baseGuide, createGridTargets, distanceSquared, framingHint, getLimbPoints, meanConfidence, toRuntimeTarget, } from "./evaluator.js";
const LIMB_JOINTS = {
    hands: ["left_wrist", "right_wrist"],
    feet: ["left_ankle", "right_ankle"],
    any: ["left_wrist", "right_wrist", "left_ankle", "right_ankle"],
};
/**
 * The 0.1 touch mechanic, unchanged: dwell inside a target with the named limb
 * until the tier-scaled dwell goal is met. One hit per pose sample keeps
 * overlapping layouts deterministic.
 */
export class TouchTargetsEvaluator {
    challenge;
    ctx;
    dwellGoal;
    targetList = [];
    framing = null;
    confidence = 0;
    constructor(challenge, ctx) {
        this.challenge = challenge;
        this.ctx = ctx;
        this.dwellGoal = challenge.dwellMs * TIER_PROFILES[ctx.tier].dwellScale;
    }
    enter() {
        this.targetList = createGridTargets(this.ctx.sceneId, this.challenge.count, this.challenge.zone, this.challenge.targetScale * TIER_PROFILES[this.ctx.tier].targetScale, this.ctx.reachBox, this.ctx.tuning.baseTargetRadius);
    }
    update(sample, pose, deltaMs) {
        this.framing = framingHint(sample);
        this.confidence = meanConfidence(sample, LIMB_JOINTS[this.challenge.limb]);
        const points = getLimbPoints(pose, this.challenge.limb, this.ctx.tuning.minimumLandmarkConfidence);
        for (const target of this.targetList) {
            if (target.hit)
                continue;
            const touching = points.some((point) => distanceSquared(point.x, point.y, target.x, target.y) <= target.radius ** 2);
            target.dwellMs = touching ? target.dwellMs + (this.dwellGoal === 0 ? 1 : deltaMs) : 0;
            if (target.dwellMs >= Math.max(1, this.dwellGoal)) {
                target.hit = true;
                this.ctx.emit({
                    type: "target-hit",
                    targetId: target.id,
                    feedbackLatencyMs: Math.max(0, this.ctx.now() - sample.timestampMs),
                });
                this.ctx.emit({
                    type: "unit-complete",
                    unit: this.completedCount(),
                    total: this.targetList.length,
                    label: "target",
                });
            }
            // One target per limb sample makes overlapping target layouts deterministic.
            if (target.hit)
                break;
        }
    }
    tick() { }
    isComplete() {
        return this.targetList.length > 0 && this.targetList.every((target) => target.hit);
    }
    targets() {
        return this.targetList.map((target) => toRuntimeTarget(target, this.dwellGoal));
    }
    guide() {
        const completed = this.completedCount();
        const activeDwell = this.targetList.reduce((best, target) => target.hit ? best : Math.max(best, target.dwellMs / Math.max(1, this.dwellGoal)), 0);
        return {
            ...baseGuide("touch_targets"),
            phase: this.isComplete() ? "done" : activeDwell > 0 ? "holding" : "active",
            progress: this.targetList.length === 0 ? 0 : completed / this.targetList.length,
            completedUnits: completed,
            totalUnits: this.targetList.length,
            holdProgress: Math.min(1, activeDwell),
            confidence: this.confidence,
            framing: this.framing,
        };
    }
    completedCount() {
        return this.targetList.filter((target) => target.hit).length;
    }
}
//# sourceMappingURL=touch-targets.js.map