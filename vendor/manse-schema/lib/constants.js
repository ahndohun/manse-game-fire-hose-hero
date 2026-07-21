export const MANSE_SCHEMA_VERSION = 1;
export const MANSE_PACK_SCHEMA_VERSIONS = [1, 2];
export const MANSE_GAME_MANIFEST_PATH = "/.well-known/manse-game.json";
export const MANSE_PACK_FILENAME = "manse.pack.json";
export const SUPPORTED_LOCALES = ["en", "ko", "es", "ja", "zh", "fr", "de", "ar"];
export const CHALLENGE_TYPES = [
    "touch_targets",
    "freeze",
    "body_zone",
    "squat",
    "pose_match",
    "jump",
    "velocity_hit",
    "step",
    "sequence",
];
/** Public Showcase movement tag for each executable challenge primitive. */
export const CHALLENGE_MOVEMENT_TAGS = {
    touch_targets: "touch",
    freeze: "freeze",
    body_zone: "dodge",
    squat: "squat",
    pose_match: "pose",
    jump: "jump",
    velocity_hit: "strike",
    step: "step",
    sequence: "combo",
};
//# sourceMappingURL=constants.js.map