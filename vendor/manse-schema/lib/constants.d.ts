export declare const MANSE_SCHEMA_VERSION: 1;
export declare const MANSE_PACK_SCHEMA_VERSIONS: readonly [1, 2];
export declare const MANSE_GAME_MANIFEST_PATH: "/.well-known/manse-game.json";
export declare const MANSE_PACK_FILENAME: "manse.pack.json";
export declare const SUPPORTED_LOCALES: readonly ["en", "ko", "es", "ja", "zh", "fr", "de", "ar"];
export declare const CHALLENGE_TYPES: readonly ["touch_targets", "freeze", "body_zone", "squat", "pose_match", "jump", "velocity_hit", "step", "sequence"];
export type ChallengeTypeName = (typeof CHALLENGE_TYPES)[number];
/** Public Showcase movement tag for each executable challenge primitive. */
export declare const CHALLENGE_MOVEMENT_TAGS: {
    readonly touch_targets: "touch";
    readonly freeze: "freeze";
    readonly body_zone: "dodge";
    readonly squat: "squat";
    readonly pose_match: "pose";
    readonly jump: "jump";
    readonly velocity_hit: "strike";
    readonly step: "step";
    readonly sequence: "combo";
};
//# sourceMappingURL=constants.d.ts.map