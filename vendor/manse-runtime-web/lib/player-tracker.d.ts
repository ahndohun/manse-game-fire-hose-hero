import type { RuntimePose, RuntimePoseFrame } from "./types.js";
export interface TrackedPlayerPose {
    readonly playerId: number;
    readonly pose: RuntimePose;
    readonly centroid: {
        readonly x: number;
        readonly y: number;
    };
}
export interface PlayerTrackerOptions {
    readonly maxPlayers: number;
    /** A pose farther than this from a player's last centroid is a stranger. */
    readonly matchRadius?: number;
    /** A missing player keeps their ID and state this long before leaving. */
    readonly leaveGraceMs?: number;
    /** A new body must persist this many frames before becoming a player. */
    readonly joinFrames?: number;
    readonly minPoseScore?: number;
}
/**
 * Frame-to-frame player identity for 2–4 player packs. Greedy nearest-centroid
 * matching keeps IDs stable while per-frame movement stays smaller than player
 * separation; short tracking gaps hold the ID instead of resetting scores;
 * IDs are never reused within a session. On a device that only ever reports
 * one pose this degrades to a stable single player — never an error.
 */
export declare class PlayerTracker {
    private readonly matchRadius;
    private readonly leaveGraceMs;
    private readonly joinFrames;
    private readonly minPoseScore;
    private readonly maxPlayers;
    private readonly players;
    private pending;
    private nextPlayerId;
    constructor(options: PlayerTrackerOptions);
    activePlayerIds(nowMs: number): readonly number[];
    update(frame: RuntimePoseFrame): readonly TrackedPlayerPose[];
    private admitNewPlayers;
}
//# sourceMappingURL=player-tracker.d.ts.map