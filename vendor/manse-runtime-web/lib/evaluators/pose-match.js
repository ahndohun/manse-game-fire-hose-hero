import { mirrorJointName } from "../body-metrics.js";
import { TIER_PROFILES } from "../config.js";
import { baseGuide, framingHint, } from "./evaluator.js";
/**
 * Angle-based pose comparison. Judgments use interior joint angles, which are
 * independent of body size, camera distance, and screen position; the
 * mirrorPolicy accepts the left/right swapped pose when packs allow it.
 * Partially hidden joints simply drop out of the ratio's denominator.
 */
export class PoseMatchEvaluator {
    config;
    ctx;
    noiseScale;
    cursor = 0;
    heldMs = 0;
    matchedNow = false;
    mirroredBest = false;
    lastSample = null;
    framing = null;
    confidence = 0;
    constructor(config, ctx) {
        this.config = config;
        this.ctx = ctx;
        this.noiseScale = TIER_PROFILES[ctx.tier].noiseScale;
    }
    enter() {
        this.cursor = 0;
        this.heldMs = 0;
    }
    update(sample, _pose, deltaMs) {
        this.framing = framingHint(sample);
        this.lastSample = sample;
        if (this.isComplete())
            return;
        const pose = this.config.poses[this.cursor];
        if (pose === undefined)
            return;
        const strict = this.matchScore(sample, pose, false);
        const mirrored = this.config.mirrorPolicy === "either"
            ? this.matchScore(sample, pose, true)
            : { ratio: -1, judged: 0 };
        const best = mirrored.ratio > strict.ratio ? mirrored : strict;
        this.mirroredBest = best === mirrored;
        this.confidence = pose.joints.length === 0 ? 0 : best.judged / pose.joints.length;
        // Every listed joint hidden → hold pauses rather than failing.
        if (best.judged === 0) {
            this.matchedNow = false;
            return;
        }
        this.matchedNow = best.ratio >= this.config.matchRatio;
        const holdGoal = this.holdGoalMs(pose);
        this.heldMs = this.matchedNow ? this.heldMs + deltaMs : 0;
        if (this.heldMs >= holdGoal) {
            this.cursor += 1;
            this.heldMs = 0;
            this.ctx.emit({
                type: "unit-complete",
                unit: this.cursor,
                total: this.config.poses.length,
                label: "pose",
            });
        }
    }
    tick() { }
    isComplete() {
        return this.cursor >= this.config.poses.length;
    }
    targets() {
        return [];
    }
    guide() {
        const done = this.isComplete();
        const pose = this.config.poses[Math.min(this.cursor, this.config.poses.length - 1)];
        const holdGoal = pose === undefined ? 1 : this.holdGoalMs(pose);
        return {
            ...baseGuide("pose_match"),
            phase: done ? "done" : this.matchedNow ? "holding" : "active",
            progress: done
                ? 1
                : (this.cursor + (this.matchedNow ? Math.min(1, this.heldMs / holdGoal) : 0)) / this.config.poses.length,
            completedUnits: this.cursor,
            totalUnits: this.config.poses.length,
            holdProgress: done ? 1 : Math.min(1, this.heldMs / holdGoal),
            confidence: this.confidence,
            silhouette: pose === undefined ? [] : buildSilhouette(pose),
            jointFeedback: pose === undefined || this.lastSample === null
                ? []
                : this.jointFeedback(this.lastSample, pose),
            framing: this.framing,
        };
    }
    holdGoalMs(pose) {
        return Math.max(1, pose.holdMs * TIER_PROFILES[this.ctx.tier].dwellScale);
    }
    matchScore(sample, pose, mirrored) {
        let matched = 0;
        let judged = 0;
        for (const joint of pose.joints) {
            const name = mirrored ? mirrorJointName(joint.joint) : joint.joint;
            const actual = sample.angles.get(name);
            if (actual === undefined)
                continue;
            judged += 1;
            if (Math.abs(actual - joint.angleDeg) <= joint.toleranceDeg * this.noiseScale)
                matched += 1;
        }
        return { ratio: judged === 0 ? 0 : matched / judged, judged };
    }
    jointFeedback(sample, pose) {
        return pose.joints.map((joint) => {
            const name = this.mirroredBest ? mirrorJointName(joint.joint) : joint.joint;
            const actual = sample.angles.get(name);
            const position = sample.joints.get(name);
            return {
                joint: name,
                x: position?.x ?? null,
                y: position?.y ?? null,
                ok: actual !== undefined && Math.abs(actual - joint.angleDeg) <= joint.toleranceDeg * this.noiseScale,
            };
        });
    }
}
const CANON = {
    left_shoulder: { x: 0.4, y: 0.34 },
    right_shoulder: { x: 0.6, y: 0.34 },
    left_hip: { x: 0.44, y: 0.6 },
    right_hip: { x: 0.56, y: 0.6 },
    head: { x: 0.5, y: 0.2 },
};
const UPPER_ARM = 0.13;
const FOREARM = 0.12;
const THIGH = 0.16;
const SHIN = 0.16;
/**
 * Deterministic ghost skeleton for the target pose: limbs rotate outward from
 * a canonical torso by the pack's target angles, so creators see the shape
 * they asked for without any model inference.
 */
export function buildSilhouette(pose) {
    const angle = (name, fallback) => {
        const joint = pose.joints.find((candidate) => candidate.joint === name);
        return joint?.angleDeg ?? fallback;
    };
    const segments = [];
    const torso = [
        [CANON.left_shoulder, CANON.right_shoulder],
        [CANON.left_hip, CANON.right_hip],
        [CANON.left_shoulder, CANON.left_hip],
        [CANON.right_shoulder, CANON.right_hip],
        [CANON.head, { x: 0.5, y: 0.34 }],
    ];
    for (const [a, b] of torso)
        segments.push({ x0: a.x, y0: a.y, x1: b.x, y1: b.y });
    for (const side of ["left", "right"]) {
        // Screen coordinates are y-down: a positive rotation is clockwise, which
        // swings the screen-left limbs outward to the left.
        const sign = side === "left" ? 1 : -1;
        const shoulder = side === "left" ? CANON.left_shoulder : CANON.right_shoulder;
        const hip = side === "left" ? CANON.left_hip : CANON.right_hip;
        // Shoulder angle is measured elbow-shoulder-hip; rotate the upper arm away
        // from the torso's downward direction by that interior angle, outward.
        const shoulderDeg = angle(`${side}_shoulder`, 20);
        const armDirection = rotate({ x: hip.x - shoulder.x, y: hip.y - shoulder.y }, sign * shoulderDeg);
        const elbow = advance(shoulder, armDirection, UPPER_ARM);
        segments.push({ x0: shoulder.x, y0: shoulder.y, x1: elbow.x, y1: elbow.y });
        const elbowDeg = angle(`${side}_elbow`, 170);
        const forearmDirection = rotate({ x: shoulder.x - elbow.x, y: shoulder.y - elbow.y }, sign * (180 - elbowDeg));
        const wrist = advance(elbow, { x: -forearmDirection.x, y: -forearmDirection.y }, FOREARM);
        segments.push({ x0: elbow.x, y0: elbow.y, x1: wrist.x, y1: wrist.y });
        const hipDeg = angle(`${side}_hip`, 175);
        const thighDirection = rotate({ x: shoulder.x - hip.x, y: shoulder.y - hip.y }, sign * (180 - hipDeg));
        const knee = advance(hip, { x: -thighDirection.x, y: -thighDirection.y }, THIGH);
        segments.push({ x0: hip.x, y0: hip.y, x1: knee.x, y1: knee.y });
        const kneeDeg = angle(`${side}_knee`, 175);
        const shinDirection = rotate({ x: hip.x - knee.x, y: hip.y - knee.y }, sign * (180 - kneeDeg));
        const ankle = advance(knee, { x: -shinDirection.x, y: -shinDirection.y }, SHIN);
        segments.push({ x0: knee.x, y0: knee.y, x1: ankle.x, y1: ankle.y });
    }
    return segments;
}
function rotate(vector, degrees) {
    const radians = (degrees * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return { x: vector.x * cos - vector.y * sin, y: vector.x * sin + vector.y * cos };
}
function advance(from, direction, length) {
    const magnitude = Math.hypot(direction.x, direction.y);
    if (magnitude === 0)
        return from;
    return { x: from.x + (direction.x / magnitude) * length, y: from.y + (direction.y / magnitude) * length };
}
//# sourceMappingURL=pose-match.js.map