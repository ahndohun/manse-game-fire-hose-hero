import type { Challenge, EpisodePack, ParamDelta, Scene } from "@manse/schema";
import type { CalibrationResult, ChallengeGuide, DeviceTier, RuntimeLandmark, RuntimePoseFrame, RuntimeTarget } from "./types.js";
export interface RuntimeTuning {
    readonly minimumLandmarkConfidence: number;
    readonly baseTargetRadius: number;
    readonly passiveSceneDurationMs: number;
    readonly restSceneDurationMs: number;
    readonly celebrationDurationMs: number;
    readonly maximumPoseDeltaMs: number;
}
export declare const DEFAULT_RUNTIME_TUNING: RuntimeTuning;
export type RuntimeSessionEvent = {
    readonly type: "target-hit";
    readonly sceneId: string;
    readonly targetId: string;
    readonly feedbackLatencyMs: number;
    readonly playerId?: number;
} | {
    readonly type: "audio-cue";
    readonly sceneId: string;
    readonly assetId: string;
    readonly purpose: "success" | "encourage";
} | {
    readonly type: "scene-changed";
    readonly sceneId: string;
} | {
    readonly type: "complete";
    readonly sceneId: string;
} | {
    readonly type: "challenge-progress";
    readonly sceneId: string;
    readonly unit: number;
    readonly total: number;
    readonly label: string;
    readonly playerId?: number;
};
/** Backward-compatible name from the touch-only runtime. */
export type TouchRuntimeEvent = RuntimeSessionEvent;
export interface SessionPlayerSnapshot {
    readonly playerId: number;
    readonly colorIndex: number;
    readonly guide: ChallengeGuide | null;
    readonly targets: readonly RuntimeTarget[];
    readonly landmarks: readonly RuntimeLandmark[];
}
export interface SessionSnapshot {
    readonly status: "idle" | "playing" | "celebrating" | "complete";
    readonly scene: Scene;
    readonly targets: readonly RuntimeTarget[];
    readonly caption: string | null;
    readonly celebrationProgress: number;
    readonly poseRequired: boolean;
    readonly completedTargets: number;
    readonly totalTargets: number;
    /** Generic progress for the active challenge; null on passive scenes. */
    readonly challenge: ChallengeGuide | null;
    /** Per-player state for multiplayer packs; empty in solo play. */
    readonly players: readonly SessionPlayerSnapshot[];
}
/**
 * Scene orchestration for every challenge primitive. The session owns scene
 * flow, timing, transitions, adaptation, and audio cues; per-mechanic
 * detection lives in pluggable evaluators. Multiplayer packs route each
 * tracked player into an isolated evaluator lane.
 */
export declare class EpisodeSession {
    private readonly pack;
    private readonly scenes;
    private readonly tuning;
    private readonly locale;
    private readonly tier;
    private readonly onEvent;
    private readonly maxPlayers;
    private readonly playerMode;
    private readonly playerTracker;
    private currentScene;
    private statusValue;
    private sceneStartedAtMs;
    private celebrationStartedAtMs;
    private targetsValue;
    private reachBox;
    private activeChallenge;
    private pendingAdaptation;
    private lanes;
    constructor(pack: EpisodePack, options: {
        readonly locale: string;
        readonly tier: DeviceTier;
        readonly tuning?: RuntimeTuning;
        readonly onEvent?: (event: RuntimeSessionEvent) => void;
    });
    setCalibration(result: CalibrationResult): void;
    start(timestampMs: number): void;
    updatePose(frame: RuntimePoseFrame): void;
    tick(timestampMs: number): void;
    getSnapshot(timestampMs: number): SessionSnapshot;
    private lane;
    private feedLane;
    private challengeSucceeded;
    private refreshTargets;
    private primaryLane;
    private buildEvaluator;
    private enterScene;
    private followTransition;
    private complete;
}
/** Backward-compatible name from the touch-only runtime. */
export declare const TouchEpisodeSession: typeof EpisodeSession;
export type TouchEpisodeSession = EpisodeSession;
/**
 * Struggle adaptation for every primitive, clamped to the schema's own bounds
 * so adapted values always stay inside the declared contract.
 */
export declare function adaptChallenge(challenge: Challenge, delta: ParamDelta | null): Challenge;
//# sourceMappingURL=session.d.ts.map