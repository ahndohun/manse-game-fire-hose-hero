import { TIER_PROFILES } from "../config.js";
import { baseGuide, framingHint, } from "./evaluator.js";
const REARM_MS = 1_000;
/**
 * Statue mechanic: whole-body motion must stay under the pack's threshold for
 * the hold window. Short spikes inside graceMs pause the hold instead of
 * resetting it, and losing joints below minVisibleJoints pauses judging
 * entirely — occlusion never fails the player.
 */
export class FreezeEvaluator {
    challenge;
    ctx;
    holdGoalMs;
    noiseScaledThreshold;
    heldMs = 0;
    spikeMs = 0;
    roundsDone = 0;
    paused = false;
    armed = true;
    rearmMs = 0;
    framing = null;
    confidence = 0;
    constructor(challenge, ctx) {
        this.challenge = challenge;
        this.ctx = ctx;
        const profile = TIER_PROFILES[ctx.tier];
        this.holdGoalMs = Math.max(1, challenge.holdMs * profile.dwellScale);
        this.noiseScaledThreshold = challenge.motionThreshold * profile.noiseScale;
    }
    enter() {
        this.heldMs = 0;
        this.spikeMs = 0;
        this.roundsDone = 0;
        this.armed = true;
        this.rearmMs = 0;
    }
    update(sample, _pose, deltaMs) {
        this.framing = framingHint(sample);
        this.confidence = Math.min(1, sample.visibleJointCount / Math.max(1, this.challenge.minVisibleJoints));
        if (this.isComplete())
            return;
        this.paused = sample.visibleJointCount < this.challenge.minVisibleJoints;
        if (this.paused)
            return;
        const still = sample.motionPerSecond < this.noiseScaledThreshold;
        if (!this.armed) {
            // Between rounds the player must move once (or wait) so continued
            // stillness cannot double-count a single freeze.
            this.rearmMs += deltaMs;
            if (!still || this.rearmMs >= REARM_MS) {
                this.armed = true;
                this.heldMs = 0;
                this.spikeMs = 0;
            }
            return;
        }
        if (still) {
            this.heldMs += deltaMs;
            this.spikeMs = 0;
        }
        else {
            this.spikeMs += deltaMs;
            if (this.spikeMs > this.challenge.graceMs) {
                this.heldMs = 0;
                this.spikeMs = 0;
            }
        }
        if (this.heldMs >= this.holdGoalMs) {
            this.roundsDone += 1;
            this.ctx.emit({
                type: "unit-complete",
                unit: this.roundsDone,
                total: this.challenge.rounds,
                label: "freeze",
            });
            this.armed = false;
            this.rearmMs = 0;
            this.heldMs = 0;
            this.spikeMs = 0;
        }
    }
    tick() { }
    isComplete() {
        return this.roundsDone >= this.challenge.rounds;
    }
    targets() {
        return [];
    }
    guide() {
        const done = this.isComplete();
        return {
            ...baseGuide("freeze"),
            phase: done ? "done" : this.paused ? "idle" : !this.armed ? "cooldown" : this.heldMs > 0 ? "holding" : "active",
            progress: done ? 1 : (this.roundsDone + Math.min(1, this.heldMs / this.holdGoalMs)) / this.challenge.rounds,
            completedUnits: this.roundsDone,
            totalUnits: this.challenge.rounds,
            holdProgress: done ? 1 : Math.min(1, this.heldMs / this.holdGoalMs),
            confidence: this.confidence,
            repetitionCount: this.challenge.rounds > 1 ? this.roundsDone : null,
            framing: this.framing,
        };
    }
}
//# sourceMappingURL=freeze.js.map