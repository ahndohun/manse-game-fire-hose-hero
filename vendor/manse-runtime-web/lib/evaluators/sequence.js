import { baseGuide, } from "./evaluator.js";
/**
 * Ordered combo of inner motion steps. Each inner evaluator runs unmodified;
 * between steps an interStepGraceMs window ignores input so the player can
 * reset posture (landing a jump must not instantly break the next freeze).
 */
export class SequenceEvaluator {
    challenge;
    ctx;
    createStep;
    cursor = 0;
    current = null;
    graceRemainingMs = 0;
    enteredAtMs = 0;
    constructor(challenge, ctx, createStep) {
        this.challenge = challenge;
        this.ctx = ctx;
        this.createStep = createStep;
    }
    enter(timestampMs) {
        this.cursor = 0;
        this.graceRemainingMs = 0;
        this.enteredAtMs = timestampMs;
        this.current = this.buildCurrent();
        this.current?.enter(timestampMs);
    }
    update(sample, pose, deltaMs) {
        if (this.isComplete() || this.current === null)
            return;
        if (this.graceRemainingMs > 0) {
            this.graceRemainingMs = Math.max(0, this.graceRemainingMs - deltaMs);
            if (this.graceRemainingMs > 0)
                return;
            this.current.enter(sample.timestampMs);
        }
        this.current.update(sample, pose, deltaMs);
        if (this.current.isComplete()) {
            this.cursor += 1;
            this.ctx.emit({
                type: "unit-complete",
                unit: this.cursor,
                total: this.challenge.steps.length,
                label: this.challenge.steps[this.cursor - 1]?.type ?? "step",
            });
            if (!this.isComplete()) {
                this.current = this.buildCurrent();
                this.graceRemainingMs = this.challenge.interStepGraceMs;
                if (this.graceRemainingMs === 0)
                    this.current?.enter(sample.timestampMs);
            }
            else {
                this.current = null;
            }
        }
    }
    tick(timestampMs) {
        this.current?.tick(timestampMs);
    }
    isComplete() {
        return this.cursor >= this.challenge.steps.length;
    }
    targets() {
        return this.graceRemainingMs > 0 ? [] : this.current?.targets() ?? [];
    }
    guide(timestampMs) {
        const total = this.challenge.steps.length;
        if (this.isComplete()) {
            return {
                ...baseGuide("sequence"),
                phase: "done",
                progress: 1,
                completedUnits: total,
                totalUnits: total,
                holdProgress: 1,
                confidence: 1,
            };
        }
        const stepType = this.challenge.steps[this.cursor]?.type ?? "step";
        const inner = this.graceRemainingMs > 0 ? null : this.current?.guide(timestampMs) ?? null;
        return {
            ...baseGuide("sequence"),
            ...(inner === null ? {} : {
                zones: inner.zones,
                silhouette: inner.silhouette,
                jointFeedback: inner.jointFeedback,
                arrow: inner.arrow,
                holdProgress: inner.holdProgress,
                confidence: inner.confidence,
                repetitionCount: inner.repetitionCount,
                framing: inner.framing,
            }),
            kind: "sequence",
            phase: this.graceRemainingMs > 0 ? "cooldown" : inner?.phase ?? "active",
            progress: (this.cursor + (inner?.progress ?? 0)) / total,
            completedUnits: this.cursor,
            totalUnits: total,
            stepLabel: `${this.cursor + 1}/${total} ${stepType.replace("_", " ")}`,
        };
    }
    buildCurrent() {
        const step = this.challenge.steps[this.cursor];
        if (step === undefined)
            return null;
        return this.createStep(step, this.ctx);
    }
}
//# sourceMappingURL=sequence.js.map