import { TIER_PROFILES } from "../config.js";
import { baseGuide, framingHint, meanConfidence, } from "./evaluator.js";
const PART_JOINTS = {
    head: ["nose"],
    torso: ["left_shoulder", "right_shoulder", "left_hip", "right_hip"],
    hands: ["left_wrist", "right_wrist"],
    feet: ["left_ankle", "right_ankle"],
    any: ["nose", "left_wrist", "right_wrist", "left_ankle", "right_ankle"],
};
/**
 * Enter/avoid regions with the named body part. Zones arm one at a time in
 * pack order; `enter` demands staying inside the active zone for the hold,
 * `avoid` demands staying out of it.
 */
export class BodyZoneEvaluator {
    challenge;
    ctx;
    holdGoalMs;
    cursor = 0;
    heldMs = 0;
    inside = false;
    partSeen = false;
    framing = null;
    confidence = 0;
    constructor(challenge, ctx) {
        this.challenge = challenge;
        this.ctx = ctx;
        this.holdGoalMs = Math.max(1, challenge.holdMs * TIER_PROFILES[ctx.tier].dwellScale);
    }
    enter() {
        this.cursor = 0;
        this.heldMs = 0;
    }
    update(sample, _pose, deltaMs) {
        this.framing = framingHint(sample);
        this.confidence = meanConfidence(sample, PART_JOINTS[this.challenge.part]);
        if (this.isComplete())
            return;
        const zone = this.challenge.zones[this.cursor];
        if (zone === undefined)
            return;
        const points = this.partPoints(sample);
        this.partSeen = points.length > 0;
        if (!this.partSeen)
            return; // Occlusion pauses judging; it never fails or rewards.
        this.inside = this.challenge.part === "torso"
            ? points.every((point) => insideBox(point, zone.box))
            : points.some((point) => insideBox(point, zone.box));
        const satisfying = this.challenge.mode === "enter" ? this.inside : !this.inside;
        this.heldMs = satisfying ? this.heldMs + deltaMs : 0;
        if (this.heldMs >= this.holdGoalMs) {
            this.cursor += 1;
            this.heldMs = 0;
            this.ctx.emit({
                type: "unit-complete",
                unit: this.cursor,
                total: this.challenge.zones.length,
                label: this.challenge.mode === "enter" ? "zone" : "dodge",
            });
        }
    }
    tick() { }
    isComplete() {
        return this.cursor >= this.challenge.zones.length;
    }
    targets() {
        return [];
    }
    guide() {
        const zones = this.challenge.zones.map((zone, index) => ({
            id: zone.id,
            box: zone.box,
            mode: this.challenge.mode,
            state: index < this.cursor
                ? "done"
                : index > this.cursor
                    ? "pending"
                    : this.challenge.mode === "avoid" && this.inside
                        ? "danger"
                        : "active",
        }));
        const done = this.isComplete();
        return {
            ...baseGuide("body_zone"),
            phase: done ? "done" : !this.partSeen ? "idle" : this.heldMs > 0 ? "holding" : "active",
            progress: done
                ? 1
                : (this.cursor + Math.min(1, this.heldMs / this.holdGoalMs)) / this.challenge.zones.length,
            completedUnits: this.cursor,
            totalUnits: this.challenge.zones.length,
            holdProgress: done ? 1 : Math.min(1, this.heldMs / this.holdGoalMs),
            confidence: this.confidence,
            zones,
            framing: this.framing,
        };
    }
    partPoints(sample) {
        if (this.challenge.part === "torso") {
            return sample.center === null ? [] : [sample.center];
        }
        const points = [];
        for (const name of PART_JOINTS[this.challenge.part]) {
            const point = sample.joints.get(name);
            if (point !== undefined)
                points.push(point);
        }
        return points;
    }
}
function insideBox(point, box) {
    return point.x >= box.x0 && point.x <= box.x1 && point.y >= box.y0 && point.y <= box.y1;
}
//# sourceMappingURL=body-zone.js.map