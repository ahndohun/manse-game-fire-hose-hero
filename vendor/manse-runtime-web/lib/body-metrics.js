const ANGLE_VERTICES = {
    left_elbow: ["left_shoulder", "left_elbow", "left_wrist"],
    right_elbow: ["right_shoulder", "right_elbow", "right_wrist"],
    left_knee: ["left_hip", "left_knee", "left_ankle"],
    right_knee: ["right_hip", "right_knee", "right_ankle"],
    left_shoulder: ["left_elbow", "left_shoulder", "left_hip"],
    right_shoulder: ["right_elbow", "right_shoulder", "right_hip"],
    left_hip: ["left_shoulder", "left_hip", "left_knee"],
    right_hip: ["right_shoulder", "right_hip", "right_knee"],
};
export const SPEED_TRACKED_LANDMARKS = ["left_wrist", "right_wrist", "left_ankle", "right_ankle"];
export class BodyMetricsTracker {
    enterConfidence;
    exitConfidence;
    occlusionHoldMs;
    scaleSmoothing;
    gates = new Map();
    previousJoints = new Map();
    limbHistory = new Map();
    previousTimestampMs = null;
    smoothedScale = 0;
    floorEstimate = null;
    constructor(options = {}) {
        this.enterConfidence = options.enterConfidence ?? 0.5;
        this.exitConfidence = options.exitConfidence ?? 0.35;
        this.occlusionHoldMs = options.occlusionHoldMs ?? 300;
        this.scaleSmoothing = options.scaleSmoothing ?? 0.25;
    }
    reset() {
        this.gates.clear();
        this.previousJoints.clear();
        this.limbHistory.clear();
        this.previousTimestampMs = null;
        this.smoothedScale = 0;
        this.floorEstimate = null;
    }
    update(pose, timestampMs) {
        const joints = this.gateLandmarks(pose?.landmarks ?? [], timestampMs);
        const deltaMs = this.previousTimestampMs === null ? 0 : Math.max(0, timestampMs - this.previousTimestampMs);
        const motionPerSecond = this.computeMotion(joints, deltaMs);
        const limbSpeeds = this.computeLimbSpeeds(joints, timestampMs);
        const scale = this.updateScale(joints);
        const floorY = this.updateFloor(joints);
        this.previousJoints.clear();
        for (const [name, point] of joints)
            this.previousJoints.set(name, point);
        this.previousTimestampMs = timestampMs;
        return {
            timestampMs,
            bodyScale: scale,
            center: centroid(joints, ["left_shoulder", "right_shoulder", "left_hip", "right_hip"]),
            headY: joints.get("nose")?.y ?? null,
            hipY: averageY(joints, ["left_hip", "right_hip"]),
            floorY,
            motionPerSecond,
            visibleJointCount: joints.size,
            joints,
            angles: this.computeAngles(joints),
            limbSpeeds,
        };
    }
    gateLandmarks(landmarks, timestampMs) {
        const seen = new Set();
        for (const landmark of landmarks) {
            seen.add(landmark.name);
            const confidence = Math.min(landmark.visibility, landmark.presence);
            const gate = this.gates.get(landmark.name);
            if (gate === undefined) {
                if (confidence >= this.enterConfidence) {
                    this.gates.set(landmark.name, {
                        visible: true,
                        x: landmark.x,
                        y: landmark.y,
                        confidence,
                        lastConfidentMs: timestampMs,
                    });
                }
                continue;
            }
            const threshold = gate.visible ? this.exitConfidence : this.enterConfidence;
            if (confidence >= threshold) {
                gate.visible = true;
                gate.x = landmark.x;
                gate.y = landmark.y;
                gate.confidence = confidence;
                gate.lastConfidentMs = timestampMs;
            }
            else if (gate.visible && timestampMs - gate.lastConfidentMs > this.occlusionHoldMs) {
                gate.visible = false;
            }
        }
        for (const [name, gate] of this.gates) {
            if (!seen.has(name) && gate.visible && timestampMs - gate.lastConfidentMs > this.occlusionHoldMs) {
                gate.visible = false;
            }
        }
        const result = new Map();
        for (const [name, gate] of this.gates) {
            if (!gate.visible)
                continue;
            result.set(name, {
                x: gate.x,
                y: gate.y,
                confidence: gate.confidence,
                held: timestampMs - gate.lastConfidentMs > 0,
            });
        }
        return result;
    }
    computeMotion(joints, deltaMs) {
        if (deltaMs <= 0 || this.previousJoints.size === 0)
            return 0;
        let total = 0;
        let counted = 0;
        for (const [name, point] of joints) {
            const previous = this.previousJoints.get(name);
            if (previous === undefined || point.held)
                continue;
            total += Math.hypot(point.x - previous.x, point.y - previous.y);
            counted += 1;
        }
        if (counted === 0)
            return 0;
        return (total / counted) * (1000 / deltaMs);
    }
    computeLimbSpeeds(joints, timestampMs) {
        const speeds = new Map();
        for (const name of SPEED_TRACKED_LANDMARKS) {
            const point = joints.get(name);
            if (point === undefined) {
                // Tracking loss must not preserve stale velocity: a re-appearing limb
                // starts from rest instead of registering a phantom strike.
                this.limbHistory.delete(name);
                continue;
            }
            const history = this.limbHistory.get(name);
            if (history !== undefined && timestampMs > history.timestampMs) {
                const deltaSeconds = (timestampMs - history.timestampMs) / 1000;
                const vx = (point.x - history.x) / deltaSeconds;
                const vy = (point.y - history.y) / deltaSeconds;
                speeds.set(name, { x: point.x, y: point.y, speed: Math.hypot(vx, vy), vx, vy });
            }
            else {
                speeds.set(name, { x: point.x, y: point.y, speed: 0, vx: 0, vy: 0 });
            }
            if (!point.held)
                this.limbHistory.set(name, { x: point.x, y: point.y, timestampMs });
        }
        return speeds;
    }
    updateScale(joints) {
        const shoulders = centroid(joints, ["left_shoulder", "right_shoulder"]);
        const hips = centroid(joints, ["left_hip", "right_hip"]);
        if (shoulders !== null && hips !== null) {
            const torso = Math.hypot(shoulders.x - hips.x, shoulders.y - hips.y);
            if (torso > 0.01) {
                this.smoothedScale = this.smoothedScale === 0
                    ? torso
                    : this.smoothedScale + (torso - this.smoothedScale) * this.scaleSmoothing;
            }
        }
        return this.smoothedScale;
    }
    updateFloor(joints) {
        const ankleY = averageY(joints, ["left_ankle", "right_ankle"]);
        if (ankleY !== null) {
            // The floor line only creeps upward slowly but adopts lower (larger y)
            // evidence quickly, so stepping closer to the camera re-calibrates fast.
            this.floorEstimate = this.floorEstimate === null
                ? ankleY
                : ankleY > this.floorEstimate
                    ? this.floorEstimate + (ankleY - this.floorEstimate) * 0.5
                    : this.floorEstimate + (ankleY - this.floorEstimate) * 0.02;
        }
        return this.floorEstimate;
    }
    computeAngles(joints) {
        const angles = new Map();
        for (const [name, [a, b, c]] of Object.entries(ANGLE_VERTICES)) {
            const pa = joints.get(a);
            const pb = joints.get(b);
            const pc = joints.get(c);
            if (pa === undefined || pb === undefined || pc === undefined)
                continue;
            angles.set(name, angleDegrees(pa, pb, pc));
        }
        return angles;
    }
}
/** Interior angle at vertex b, in degrees. Straight limb = 180. */
export function angleDegrees(a, b, c) {
    const abx = a.x - b.x;
    const aby = a.y - b.y;
    const cbx = c.x - b.x;
    const cby = c.y - b.y;
    const dot = abx * cbx + aby * cby;
    const magnitude = Math.hypot(abx, aby) * Math.hypot(cbx, cby);
    if (magnitude === 0)
        return 180;
    const cosine = Math.min(1, Math.max(-1, dot / magnitude));
    return (Math.acos(cosine) * 180) / Math.PI;
}
export function mirrorJointName(name) {
    return (name.startsWith("left_")
        ? name.replace("left_", "right_")
        : name.replace("right_", "left_"));
}
function centroid(joints, names) {
    let x = 0;
    let y = 0;
    let confidence = 0;
    let count = 0;
    let held = false;
    for (const name of names) {
        const point = joints.get(name);
        if (point === undefined)
            continue;
        x += point.x;
        y += point.y;
        confidence += point.confidence;
        held = held || point.held;
        count += 1;
    }
    if (count === 0)
        return null;
    return { x: x / count, y: y / count, confidence: confidence / count, held };
}
function averageY(joints, names) {
    let total = 0;
    let count = 0;
    for (const name of names) {
        const point = joints.get(name);
        if (point === undefined)
            continue;
        total += point.y;
        count += 1;
    }
    return count === 0 ? null : total / count;
}
//# sourceMappingURL=body-metrics.js.map