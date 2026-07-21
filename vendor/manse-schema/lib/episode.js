import { z } from "zod";
import { AssetCollectionsSchema } from "./assets.js";
import { AgeBandSchema, IdentifierSchema, IsoDateTimeSchema, LocaleSchema, LocalizedTextSchema, NormBoxSchema, PermissionsSchema, SemverSchema, compareSemver, duplicateValues, } from "./common.js";
/** Runtime release that first executes schemaVersion 2 challenge primitives. */
export const MOTION_CONTRACT_ENGINE_VERSION = "0.2.0";
const ChallengeBaseShape = {
    timeBudgetMs: z.number().int().positive().max(300_000),
    successAudioId: IdentifierSchema,
    encourageAudioId: IdentifierSchema,
};
/**
 * Every threshold, hold time, and tolerance lives in pack data so designers tune
 * behavior without engine changes. Packs stay declarative JSON: no code, ever.
 */
const TouchTargetsShape = {
    type: z.literal("touch_targets"),
    count: z.number().int().min(1).max(12),
    zone: z.enum(["upper", "lower", "full", "reachable"]),
    targetScale: z.number().min(0.5).max(2),
    dwellMs: z.number().int().min(0).max(1_500),
    limb: z.enum(["hands", "feet", "any"]),
};
const FreezeShape = {
    type: z.literal("freeze"),
    /** How long the whole body must stay under motionThreshold. */
    holdMs: z.number().int().min(500).max(30_000),
    /** Mean landmark motion (normalized units/second) treated as "still". */
    motionThreshold: z.number().min(0.001).max(0.2),
    /** Motion spikes shorter than this do not reset the hold. */
    graceMs: z.number().int().min(0).max(2_000),
    rounds: z.number().int().min(1).max(10),
    /** Frames with fewer confident joints pause, never fail, the hold. */
    minVisibleJoints: z.number().int().min(4).max(20),
};
const BodyZoneShape = {
    type: z.literal("body_zone"),
    part: z.enum(["head", "hands", "feet", "torso", "any"]),
    mode: z.enum(["enter", "avoid"]),
    zones: z
        .array(z.object({ id: IdentifierSchema, box: NormBoxSchema }).strict())
        .min(1)
        .max(6),
    /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
    holdMs: z.number().int().min(0).max(10_000),
};
const SquatShape = {
    type: z.literal("squat"),
    repetitions: z.number().int().min(1).max(30),
    /** Required hip drop as a fraction of the player's own torso length. */
    depthRatio: z.number().min(0.1).max(0.6),
    /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
    kneeAngleMaxDeg: z.number().min(60).max(150),
    /** Hold at the bottom before the repetition counts. */
    holdMs: z.number().int().min(0).max(3_000),
    /** Minimum time between counted repetitions; rejects bounce double counts. */
    cooldownMs: z.number().int().min(200).max(3_000),
};
export const PoseMatchJointSchema = z
    .object({
    joint: z.enum([
        "left_elbow", "right_elbow", "left_knee", "right_knee",
        "left_shoulder", "right_shoulder", "left_hip", "right_hip",
    ]),
    angleDeg: z.number().min(0).max(180),
    toleranceDeg: z.number().min(5).max(60),
})
    .strict();
const PoseMatchShape = {
    type: z.literal("pose_match"),
    poses: z
        .array(z
        .object({
        id: IdentifierSchema,
        joints: z.array(PoseMatchJointSchema).min(1).max(8),
        holdMs: z.number().int().min(200).max(10_000),
    })
        .strict())
        .min(1)
        .max(8),
    /** Fraction of listed joints that must be inside tolerance at once. */
    matchRatio: z.number().min(0.5).max(1),
    /** "either" also accepts the left/right mirrored pose. */
    mirrorPolicy: z.enum(["strict", "either"]),
};
const JumpShape = {
    type: z.literal("jump"),
    repetitions: z.number().int().min(1).max(20),
    /** Required hip rise relative to the player's own torso length. */
    minRiseRatio: z.number().min(0.05).max(0.5),
    /** Both feet must be back down and stable for this long to count a landing. */
    landingStableMs: z.number().int().min(100).max(2_000),
    cooldownMs: z.number().int().min(200).max(4_000),
};
const VelocityHitShape = {
    type: z.literal("velocity_hit"),
    count: z.number().int().min(1).max(12),
    zone: z.enum(["upper", "lower", "full", "reachable"]),
    targetScale: z.number().min(0.5).max(2),
    limb: z.enum(["hands", "feet", "any"]),
    /** On-screen limb speed (normalized units/second) required at contact. */
    minSpeed: z.number().min(0.3).max(5),
    direction: z.enum(["any", "up", "down", "left", "right"]),
};
const StepShape = {
    type: z.literal("step"),
    pattern: z.array(z.enum(["left", "right"])).min(1).max(16),
    /** Lateral foot travel required, relative to the player's own torso length. */
    stepRatio: z.number().min(0.1).max(0.8),
    /** Settle time on the new stance before the step counts. */
    holdMs: z.number().int().min(0).max(2_000),
};
export const TouchTargetsSchema = z.object({ ...TouchTargetsShape, ...ChallengeBaseShape }).strict();
export const FreezeSchema = z.object({ ...FreezeShape, ...ChallengeBaseShape }).strict();
export const BodyZoneSchema = z.object({ ...BodyZoneShape, ...ChallengeBaseShape }).strict();
export const SquatSchema = z.object({ ...SquatShape, ...ChallengeBaseShape }).strict();
export const PoseMatchSchema = z.object({ ...PoseMatchShape, ...ChallengeBaseShape }).strict();
export const JumpSchema = z.object({ ...JumpShape, ...ChallengeBaseShape }).strict();
export const VelocityHitSchema = z.object({ ...VelocityHitShape, ...ChallengeBaseShape }).strict();
export const StepSchema = z.object({ ...StepShape, ...ChallengeBaseShape }).strict();
/** Sequence steps are inner motion configs: base timing/audio belongs to the sequence. */
export const SequenceStepSchema = z.discriminatedUnion("type", [
    z.object(TouchTargetsShape).strict(),
    z.object(FreezeShape).strict(),
    z.object(BodyZoneShape).strict(),
    z.object(SquatShape).strict(),
    z.object(PoseMatchShape).strict(),
    z.object(JumpShape).strict(),
    z.object(VelocityHitShape).strict(),
    z.object(StepShape).strict(),
]);
export const SequenceSchema = z
    .object({
    type: z.literal("sequence"),
    steps: z.array(SequenceStepSchema).min(2).max(8),
    /** Pause allowed between completed steps before the next one arms. */
    interStepGraceMs: z.number().int().min(0).max(5_000),
    ...ChallengeBaseShape,
})
    .strict();
export const ChallengeSchema = z.discriminatedUnion("type", [
    TouchTargetsSchema,
    FreezeSchema,
    BodyZoneSchema,
    SquatSchema,
    PoseMatchSchema,
    JumpSchema,
    VelocityHitSchema,
    StepSchema,
    SequenceSchema,
]);
export const LearningMomentSchema = z
    .object({
    kind: z.enum(["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]),
    payload: z.array(z.string().min(1).max(100)).max(10),
})
    .strict();
export const NarrationItemSchema = z
    .object({
    locale: LocaleSchema,
    text: z.string().trim().min(1).max(5_000),
    audioAssetId: IdentifierSchema.nullable(),
})
    .strict();
export const NarrationSchema = z
    .object({ items: z.array(NarrationItemSchema).min(1), captionDefaultOn: z.literal(true) })
    .strict();
export const OutcomeSchema = z.enum(["success", "partial", "struggle"]);
export const ParamDeltaSchema = z
    .object({
    targetScaleMul: z.number().min(0.75).max(1.5),
    dwellMsMul: z.number().min(0.5).max(1.5),
    countDelta: z.number().int().min(-3).max(3),
    timeBudgetMul: z.number().min(0.75).max(1.6),
    /**
     * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
     * existing v1 pack valid byte-for-byte.
     */
    toleranceMul: z.number().min(0.75).max(1.5).optional(),
    holdMsMul: z.number().min(0.5).max(1.5).optional(),
    repetitionsDelta: z.number().int().min(-5).max(5).optional(),
    speedMul: z.number().min(0.6).max(1.5).optional(),
    motionThresholdMul: z.number().min(0.6).max(1.6).optional(),
})
    .strict();
export const TransitionEventSchema = z.union([OutcomeSchema, z.literal("always")]);
export const TransitionSchema = z
    .object({ on: TransitionEventSchema, to: IdentifierSchema, adapt: ParamDeltaSchema.nullable() })
    .strict();
const SceneCommonShape = {
    id: IdentifierSchema,
    kind: z.enum(["story", "calibration-check", "challenge", "rest", "celebration"]),
    narration: NarrationSchema,
    demo: z
        .object({ characterId: IdentifierSchema, animation: z.string().trim().min(1).max(200) })
        .strict()
        .nullable(),
    challenge: ChallengeSchema.nullable(),
    learning: LearningMomentSchema.nullable(),
    artAssetId: IdentifierSchema.nullable(),
    energy: z.enum(["calm", "medium", "high"]),
};
export const NonTerminalSceneSchema = z
    .object({ ...SceneCommonShape, terminal: z.literal(false), transitions: z.array(TransitionSchema).min(1) })
    .strict();
export const TerminalSceneSchema = z
    .object({ ...SceneCommonShape, terminal: z.literal(true), transitions: z.array(TransitionSchema).max(0) })
    .strict();
export const SceneSchema = z.discriminatedUnion("terminal", [NonTerminalSceneSchema, TerminalSceneSchema]);
export const AdaptPolicySchema = z
    .object({
    targetSuccessBand: z
        .tuple([z.number().min(0).max(1), z.number().min(0).max(1)])
        .refine(([low, high]) => low <= high, "Success band lower bound must not exceed upper bound"),
    maxStruggleStreak: z.number().int().min(1).max(4),
    maxHighEnergyMs: z.number().int().positive().max(180_000),
})
    .strict();
export const EngineCompatibilitySchema = z
    .object({ minimumVersion: SemverSchema, maximumVersion: SemverSchema.nullable() })
    .strict();
export const CompilerMetadataSchema = z
    .object({
    model: z.string().trim().min(1).max(200),
    reasoningEffort: z.string().trim().min(1).max(100),
    generatedAt: IsoDateTimeSchema,
})
    .strict();
export const PlayersSchema = z
    .object({
    min: z.number().int().min(1).max(4),
    max: z.number().int().min(1).max(4),
    mode: z.enum(["solo", "coop", "versus"]),
})
    .strict()
    .refine(({ min, max }) => min <= max, "Minimum players must not exceed maximum players");
export const EpisodePackBaseSchema = z
    .object({
    schemaVersion: z.union([z.literal(1), z.literal(2)]),
    meta: z
        .object({
        id: IdentifierSchema,
        title: z.array(LocalizedTextSchema).min(1),
        summary: z.array(LocalizedTextSchema).min(1),
        theme: z.string().trim().min(1).max(500),
        locales: z.array(LocaleSchema).min(1),
        ageBands: z.array(AgeBandSchema).min(1),
        estMinutes: z.number().min(1).max(60),
        engine: EngineCompatibilitySchema,
        compiler: CompilerMetadataSchema.nullable(),
        /** schemaVersion 2 only. Absent means one player. */
        players: PlayersSchema.optional(),
    })
        .strict(),
    permissions: PermissionsSchema,
    cast: z
        .array(z
        .object({
        id: IdentifierSchema,
        name: z.array(LocalizedTextSchema).min(1),
        artAssetId: IdentifierSchema.nullable(),
        description: z.string().trim().min(1).max(2_000),
    })
        .strict())
        .min(1),
    entrySceneId: IdentifierSchema,
    scenes: z.array(SceneSchema).min(3),
    adaptPolicy: AdaptPolicySchema,
    assets: AssetCollectionsSchema,
})
    .strict();
function makeIssue(code, path, message) {
    return { code, path, message };
}
function validateLocalizedSet(entries, declaredLocales, path, issues) {
    for (const duplicate of duplicateValues(entries.map((entry) => entry.locale))) {
        issues.push(makeIssue("locale_mismatch", path, `Locale '${duplicate}' is declared more than once`));
    }
    const present = new Set(entries.map((entry) => entry.locale));
    const declared = new Set(declaredLocales);
    for (const locale of declared) {
        if (!present.has(locale))
            issues.push(makeIssue("locale_mismatch", path, `Missing declared locale '${locale}'`));
    }
    for (const locale of present) {
        if (!declared.has(locale)) {
            issues.push(makeIssue("locale_mismatch", path, `Locale '${locale}' is not declared by the pack`));
        }
    }
}
const V2_ADAPT_KEYS = [
    "toleranceMul", "holdMsMul", "repetitionsDelta", "speedMul", "motionThresholdMul",
];
function validateContractVersion(pack, issues) {
    if (pack.schemaVersion === 1) {
        if (pack.meta.players !== undefined) {
            issues.push(makeIssue("schema_version", ["meta", "players"], "Multiplayer declarations require pack schemaVersion 2"));
        }
        pack.scenes.forEach((scene, sceneIndex) => {
            if (scene.challenge !== null && scene.challenge.type !== "touch_targets") {
                issues.push(makeIssue("schema_version", ["scenes", sceneIndex, "challenge", "type"], `Challenge type '${scene.challenge.type}' requires pack schemaVersion 2`));
            }
            scene.transitions.forEach((transition, transitionIndex) => {
                if (transition.adapt === null)
                    return;
                for (const key of V2_ADAPT_KEYS) {
                    if (transition.adapt[key] !== undefined) {
                        issues.push(makeIssue("schema_version", ["scenes", sceneIndex, "transitions", transitionIndex, "adapt", key], `Adaptation '${key}' requires pack schemaVersion 2`));
                    }
                }
            });
        });
        return;
    }
    if (compareSemver(pack.meta.engine.minimumVersion, MOTION_CONTRACT_ENGINE_VERSION) < 0) {
        issues.push(makeIssue("engine_compatibility", ["meta", "engine", "minimumVersion"], `schemaVersion 2 packs require engine.minimumVersion >= ${MOTION_CONTRACT_ENGINE_VERSION} so 0.1 runtimes reject them cleanly`));
    }
}
function validateChallengeShape(challenge, path, issues) {
    if (challenge.type === "body_zone") {
        for (const duplicate of duplicateValues(challenge.zones.map((zone) => zone.id))) {
            issues.push(makeIssue("duplicate_id", [...path, "zones"], `Duplicate zone id '${duplicate}'`));
        }
    }
    if (challenge.type === "pose_match") {
        for (const duplicate of duplicateValues(challenge.poses.map((pose) => pose.id))) {
            issues.push(makeIssue("duplicate_id", [...path, "poses"], `Duplicate pose id '${duplicate}'`));
        }
        challenge.poses.forEach((pose, poseIndex) => {
            for (const duplicate of duplicateValues(pose.joints.map((joint) => joint.joint))) {
                issues.push(makeIssue("duplicate_id", [...path, "poses", poseIndex, "joints"], `Joint '${duplicate}' is listed more than once in pose '${pose.id}'`));
            }
        });
    }
    if (challenge.type === "sequence") {
        challenge.steps.forEach((step, stepIndex) => {
            validateChallengeShape(step, [...path, "steps", stepIndex], issues);
        });
    }
}
/** Pure semantic validation for a structurally parsed pack. */
export function validateEpisodePackIntegrity(pack) {
    const issues = [];
    const declaredLocales = pack.meta.locales;
    validateContractVersion(pack, issues);
    for (const duplicate of duplicateValues(declaredLocales)) {
        issues.push(makeIssue("locale_mismatch", ["meta", "locales"], `Locale '${duplicate}' is declared more than once`));
    }
    validateLocalizedSet(pack.meta.title, declaredLocales, ["meta", "title"], issues);
    validateLocalizedSet(pack.meta.summary, declaredLocales, ["meta", "summary"], issues);
    const images = new Map(pack.assets.images.map((asset) => [asset.id, asset]));
    const audio = new Map(pack.assets.audio.map((asset) => [asset.id, asset]));
    const allAssetIds = [
        ...pack.assets.images.map((asset) => asset.id),
        ...pack.assets.audio.map((asset) => asset.id),
        ...pack.assets.music.map((asset) => asset.id),
    ];
    for (const duplicate of duplicateValues(allAssetIds)) {
        issues.push(makeIssue("duplicate_id", ["assets"], `Asset id '${duplicate}' must be unique across every asset kind`));
    }
    const allAssetIdSet = new Set(allAssetIds);
    const validateAssetReference = (id, expected, expectedKind, path) => {
        if (id === null || expected.has(id))
            return;
        const wrongKind = allAssetIdSet.has(id);
        issues.push(makeIssue(wrongKind ? "wrong_asset_type" : "missing_reference", path, wrongKind
            ? `Asset '${id}' exists but is not an ${expectedKind} asset`
            : `Referenced ${expectedKind} asset '${id}' does not exist`));
    };
    pack.assets.images.forEach((asset, index) => {
        validateLocalizedSet(asset.alt, declaredLocales, ["assets", "images", index, "alt"], issues);
    });
    const castById = new Map();
    pack.cast.forEach((character, index) => {
        if (castById.has(character.id)) {
            issues.push(makeIssue("duplicate_id", ["cast", index, "id"], `Duplicate cast id '${character.id}'`));
        }
        else {
            castById.set(character.id, character);
        }
        validateLocalizedSet(character.name, declaredLocales, ["cast", index, "name"], issues);
        validateAssetReference(character.artAssetId, images, "image", ["cast", index, "artAssetId"]);
    });
    const sceneById = new Map();
    pack.scenes.forEach((scene, index) => {
        if (sceneById.has(scene.id)) {
            issues.push(makeIssue("duplicate_id", ["scenes", index, "id"], `Duplicate scene id '${scene.id}'`));
        }
        else {
            sceneById.set(scene.id, scene);
        }
    });
    if (!sceneById.has(pack.entrySceneId)) {
        issues.push(makeIssue("missing_reference", ["entrySceneId"], `Entry scene '${pack.entrySceneId}' does not exist`));
    }
    pack.scenes.forEach((scene, sceneIndex) => {
        const scenePath = ["scenes", sceneIndex];
        validateLocalizedSet(scene.narration.items, declaredLocales, [...scenePath, "narration", "items"], issues);
        scene.narration.items.forEach((item, itemIndex) => {
            const path = [...scenePath, "narration", "items", itemIndex, "audioAssetId"];
            validateAssetReference(item.audioAssetId, audio, "audio", path);
            if (item.audioAssetId !== null) {
                const audioAsset = audio.get(item.audioAssetId);
                if (audioAsset && audioAsset.locale !== item.locale) {
                    issues.push(makeIssue("locale_mismatch", path, `Narration locale '${item.locale}' must reference audio with the same locale`));
                }
            }
        });
        validateAssetReference(scene.artAssetId, images, "image", [...scenePath, "artAssetId"]);
        if (scene.demo !== null && !castById.has(scene.demo.characterId)) {
            issues.push(makeIssue("missing_reference", [...scenePath, "demo", "characterId"], `Character '${scene.demo.characterId}' does not exist`));
        }
        if (scene.kind === "challenge" && scene.challenge === null) {
            issues.push(makeIssue("invalid_scene", [...scenePath, "challenge"], "Challenge scenes require a challenge"));
        }
        if ((scene.kind === "story" || scene.kind === "rest" || scene.kind === "celebration") &&
            scene.challenge !== null) {
            issues.push(makeIssue("invalid_scene", [...scenePath, "challenge"], `Scene kind '${scene.kind}' cannot contain a challenge`));
        }
        if (scene.terminal && scene.challenge !== null) {
            issues.push(makeIssue("invalid_scene", [...scenePath, "challenge"], "Terminal scenes cannot contain a challenge"));
        }
        if (scene.challenge !== null) {
            validateAssetReference(scene.challenge.successAudioId, audio, "audio", [...scenePath, "challenge", "successAudioId"]);
            validateAssetReference(scene.challenge.encourageAudioId, audio, "audio", [...scenePath, "challenge", "encourageAudioId"]);
            validateChallengeShape(scene.challenge, [...scenePath, "challenge"], issues);
        }
        const events = scene.transitions.map((transition) => transition.on);
        for (const duplicate of duplicateValues(events)) {
            issues.push(makeIssue("duplicate_outcome", [...scenePath, "transitions"], `Transition event '${duplicate}' may appear at most once per scene`));
        }
        if (events.includes("always") && events.length > 1) {
            issues.push(makeIssue("invalid_transition", [...scenePath, "transitions"], "An 'always' transition must be the only transition in its scene"));
        }
        if (!scene.terminal && scene.challenge === null && (events.length !== 1 || events[0] !== "always")) {
            issues.push(makeIssue("invalid_transition", [...scenePath, "transitions"], "A non-terminal scene without a challenge requires exactly one 'always' transition"));
        }
        if (scene.challenge !== null) {
            for (const required of ["success", "struggle"]) {
                if (!events.includes(required)) {
                    issues.push(makeIssue("missing_outcome", [...scenePath, "transitions"], `Challenge scenes require a unique '${required}' transition`));
                }
            }
        }
        scene.transitions.forEach((transition, transitionIndex) => {
            if (!sceneById.has(transition.to)) {
                issues.push(makeIssue("missing_reference", [...scenePath, "transitions", transitionIndex, "to"], `Target scene '${transition.to}' does not exist`));
            }
        });
    });
    const terminalIds = new Set(pack.scenes.filter((scene) => scene.terminal).map((scene) => scene.id));
    if (terminalIds.size === 0) {
        issues.push(makeIssue("terminal_unreachable", ["scenes"], "At least one explicit terminal scene is required"));
    }
    const reachable = new Set();
    const visitQueue = sceneById.has(pack.entrySceneId) ? [pack.entrySceneId] : [];
    while (visitQueue.length > 0) {
        const id = visitQueue.pop();
        if (id === undefined || reachable.has(id))
            continue;
        reachable.add(id);
        const scene = sceneById.get(id);
        if (!scene)
            continue;
        for (const transition of scene.transitions) {
            if (sceneById.has(transition.to))
                visitQueue.push(transition.to);
        }
    }
    pack.scenes.forEach((scene, index) => {
        if (!reachable.has(scene.id)) {
            issues.push(makeIssue("unreachable_scene", ["scenes", index, "id"], `Scene '${scene.id}' is not reachable from entry scene '${pack.entrySceneId}'`));
        }
    });
    const reverse = new Map();
    for (const id of sceneById.keys())
        reverse.set(id, []);
    for (const scene of sceneById.values()) {
        for (const transition of scene.transitions)
            reverse.get(transition.to)?.push(scene.id);
    }
    const canReachTerminal = new Set();
    const reverseQueue = [...terminalIds];
    while (reverseQueue.length > 0) {
        const id = reverseQueue.pop();
        if (id === undefined || canReachTerminal.has(id))
            continue;
        canReachTerminal.add(id);
        for (const parent of reverse.get(id) ?? [])
            reverseQueue.push(parent);
    }
    pack.scenes.forEach((scene, index) => {
        if (reachable.has(scene.id) && !canReachTerminal.has(scene.id)) {
            issues.push(makeIssue("terminal_unreachable", ["scenes", index, "id"], `No terminal scene can be reached from scene '${scene.id}'`));
        }
    });
    return issues;
}
export const EpisodePackSchema = EpisodePackBaseSchema.superRefine((pack, context) => {
    for (const issue of validateEpisodePackIntegrity(pack)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: issue.path,
            message: `[${issue.code}] ${issue.message}`,
        });
    }
});
//# sourceMappingURL=episode.js.map