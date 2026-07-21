import { TIER_PROFILES } from "../config.js";
import { baseGuide, framingHint, meanConfidence, } from "./evaluator.js";
const BASELINE_SAMPLES = 3;
/**
 * Dance-step pattern: each entry names the foot that must travel sideways by
 * stepRatio of the player's torso length, in that foot's own direction, and
 * settle for holdMs. Pose frames arrive mirrored into screen space, so the
 * player's left foot moving to their left is a decrease in x.
 */
export class StepEvaluator {
    config;
    ctx;
    holdGoalMs;
    cursor = 0;
    baseline = null;
    baselineCount = 0;
    settleMs = 0;
    travelNow = 0;
    visible = false;
    framing = null;
    confidence = 0;
    constructor(config, ctx) {
        this.config = config;
        this.ctx = ctx;
        this.holdGoalMs = Math.max(0, config.holdMs * TIER_PROFILES[ctx.tier].dwellScale);
    }
    enter() {
        this.cursor = 0;
        this.baseline = null;
        this.baselineCount = 0;
        this.settleMs = 0;
    }
    update(sample, _pose, deltaMs) {
        this.framing = framingHint(sample);
        this.confidence = meanConfidence(sample, ["left_ankle", "right_ankle"]);
        if (this.isComplete())
            return;
        const left = sample.joints.get("left_ankle");
        const right = sample.joints.get("right_ankle");
        this.visible = left !== undefined && right !== undefined && sample.bodyScale > 0;
        if (!this.visible || left === undefined || right === undefined)
            return;
        if (this.baseline === null || this.baselineCount < BASELINE_SAMPLES) {
            this.baseline = this.baseline === null
                ? { left: left.x, right: right.x }
                : {
                    left: this.baseline.left + (left.x - this.baseline.left) * 0.3,
                    right: this.baseline.right + (right.x - this.baseline.right) * 0.3,
                };
            this.baselineCount += 1;
            return;
        }
        const direction = this.config.pattern[this.cursor];
        if (direction === undefined)
            return;
        const foot = direction === "left" ? left : right;
        const start = direction === "left" ? this.baseline.left : this.baseline.right;
        // Mirrored screen space: the player's left is smaller x.
        const travel = direction === "left" ? start - foot.x : foot.x - start;
        const required = this.config.stepRatio * sample.bodyScale;
        this.travelNow = required <= 0 ? 0 : Math.min(1, Math.max(0, travel / required));
        if (travel >= required) {
            this.settleMs += deltaMs;
            if (this.settleMs >= this.holdGoalMs) {
                this.cursor += 1;
                this.settleMs = 0;
                // The new stance becomes the reference for the next pattern entry.
                this.baseline = { left: left.x, right: right.x };
                this.ctx.emit({
                    type: "unit-complete",
                    unit: this.cursor,
                    total: this.config.pattern.length,
                    label: "step",
                });
            }
        }
        else {
            this.settleMs = 0;
        }
    }
    tick() { }
    isComplete() {
        return this.cursor >= this.config.pattern.length;
    }
    targets() {
        return [];
    }
    guide() {
        const done = this.isComplete();
        const direction = this.config.pattern[Math.min(this.cursor, this.config.pattern.length - 1)] ?? null;
        return {
            ...baseGuide("step"),
            phase: done ? "done" : !this.visible ? "idle" : this.settleMs > 0 ? "holding" : "active",
            progress: done ? 1 : (this.cursor + Math.min(1, this.travelNow)) / this.config.pattern.length,
            completedUnits: this.cursor,
            totalUnits: this.config.pattern.length,
            holdProgress: this.holdGoalMs === 0
                ? Math.min(1, this.travelNow)
                : Math.min(1, this.settleMs / this.holdGoalMs),
            confidence: this.confidence,
            arrow: done ? null : direction,
            stepLabel: done ? null : `${this.cursor + 1}/${this.config.pattern.length}`,
            framing: this.framing,
        };
    }
}
//# sourceMappingURL=step.js.map