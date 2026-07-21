export const DEFAULT_REACH_BOX = { x0: 0.16, y0: 0.16, x1: 0.84, y1: 0.9 };
export const TARGET_PALETTE = [
    [0.98, 0.35, 0.35, 1],
    [0.22, 0.72, 0.98, 1],
    [0.98, 0.76, 0.2, 1],
    [0.35, 0.86, 0.53, 1],
];
export function createGridTargets(sceneId, count, zone, scale, reachBox, baseRadius) {
    const bounds = zoneBounds(zone, reachBox);
    const columns = Math.min(3, Math.ceil(Math.sqrt(count)));
    const rows = Math.ceil(count / columns);
    const radius = Math.min(0.16, baseRadius * scale);
    return Array.from({ length: count }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const xRatio = columns === 1 ? 0.5 : (column + 0.5) / columns;
        const yRatio = rows === 1 ? 0.5 : (row + 0.5) / rows;
        const color = TARGET_PALETTE[index % TARGET_PALETTE.length] ?? TARGET_PALETTE[0] ?? [1, 1, 1, 1];
        return {
            id: `${sceneId}-target-${index + 1}`,
            x: mix(bounds.x0 + radius, bounds.x1 - radius, xRatio),
            y: mix(bounds.y0 + radius, bounds.y1 - radius, yRatio),
            radius,
            color,
            dwellMs: 0,
            hit: false,
        };
    });
}
export function zoneBounds(zone, reachBox) {
    switch (zone) {
        case "upper": return { x0: reachBox.x0, y0: reachBox.y0, x1: reachBox.x1, y1: mix(reachBox.y0, reachBox.y1, 0.52) };
        case "lower": return { x0: reachBox.x0, y0: mix(reachBox.y0, reachBox.y1, 0.48), x1: reachBox.x1, y1: reachBox.y1 };
        case "full": return DEFAULT_REACH_BOX;
        case "reachable": return reachBox;
    }
}
export function getLimbPoints(pose, limb, confidence) {
    if (pose === null)
        return [];
    const names = limb === "hands"
        ? new Set(["left_wrist", "right_wrist"])
        : limb === "feet"
            ? new Set(["left_ankle", "right_ankle"])
            : new Set(["left_wrist", "right_wrist", "left_ankle", "right_ankle"]);
    return pose.landmarks.filter((landmark) => names.has(landmark.name) && Math.min(landmark.visibility, landmark.presence) >= confidence);
}
/** Guidance when the player's torso is unusably small or large on screen. */
export function framingHint(sample) {
    if (sample.bodyScale === 0)
        return null;
    if (sample.bodyScale < 0.09)
        return "closer";
    if (sample.bodyScale > 0.5)
        return "farther";
    return null;
}
export function baseGuide(kind) {
    return {
        kind,
        phase: "idle",
        progress: 0,
        completedUnits: 0,
        totalUnits: 1,
        holdProgress: 0,
        confidence: 0,
        repetitionCount: null,
        zones: [],
        silhouette: [],
        jointFeedback: [],
        arrow: null,
        stepLabel: null,
        framing: null,
    };
}
export function toRuntimeTarget(target, dwellGoal, requiredDirection = null) {
    return {
        id: target.id,
        x: target.x,
        y: target.y,
        radius: target.radius,
        dwellProgress: target.hit ? 1 : Math.min(1, target.dwellMs / Math.max(1, dwellGoal)),
        hit: target.hit,
        color: target.color,
        requiredDirection,
    };
}
export function distanceSquared(x0, y0, x1, y1) {
    return (x0 - x1) ** 2 + (y0 - y1) ** 2;
}
export function mix(a, b, t) {
    return a + (b - a) * t;
}
export function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}
export function meanConfidence(sample, names) {
    let total = 0;
    let count = 0;
    for (const name of names) {
        const point = sample.joints.get(name);
        if (point === undefined)
            continue;
        total += point.confidence;
        count += 1;
    }
    return count === 0 ? 0 : total / count;
}
//# sourceMappingURL=evaluator.js.map