import { z } from "zod";
import { CHALLENGE_TYPES } from "./constants.js";
import { AgeBandSchema, IdentifierSchema, IsoDateTimeSchema, LocaleSchema, NormBoxSchema } from "./common.js";
import { OutcomeSchema } from "./episode.js";
export const ComprehensionChannelSchema = z.enum(["audio", "visual-demo", "both"]);
export const PlayerProfileSchema = z
    .object({
    schemaVersion: z.literal(1),
    id: IdentifierSchema,
    createdAt: IsoDateTimeSchema,
    displayName: z.string().max(30),
    locale: LocaleSchema,
    ageBand: AgeBandSchema,
    measured: z
        .object({
        reachBox: NormBoxSchema,
        shoulderYRatio: z.number().min(0).max(1),
        tempoBpm: z.number().positive().max(300),
        reactionMsP50: z.number().nonnegative().max(60_000),
        comprehensionChannel: ComprehensionChannelSchema,
    })
        .strict(),
    abilities: z
        .object({ seatedMode: z.boolean(), canJump: z.boolean(), activeSide: z.enum(["both", "left", "right"]) })
        .strict(),
    sensory: z
        .object({
        reducedStimulation: z.boolean(),
        captions: z.boolean(),
        highContrast: z.boolean(),
        audioCues: z.boolean(),
    })
        .strict(),
    skill: z
        .object({
        touch_targets: z.number().min(0).max(1),
        freeze: z.number().min(0).max(1),
        body_zone: z.number().min(0).max(1),
        squat: z.number().min(0).max(1),
        pose_match: z.number().min(0).max(1),
        jump: z.number().min(0).max(1),
        velocity_hit: z.number().min(0).max(1),
        step: z.number().min(0).max(1),
        sequence: z.number().min(0).max(1),
    })
        .strict(),
})
    .strict();
export const SceneStatSchema = z
    .object({
    sceneId: IdentifierSchema,
    challengeType: z.enum(CHALLENGE_TYPES).nullable(),
    outcome: OutcomeSchema.nullable(),
    attempts: z.number().int().nonnegative(),
    reactionMsP50: z.number().nonnegative().nullable(),
    activeMs: z.number().int().nonnegative(),
})
    .strict();
export const SessionStatsSchema = z
    .object({
    schemaVersion: z.literal(1),
    episodeId: IdentifierSchema,
    startedAt: IsoDateTimeSchema,
    scenes: z.array(SceneStatSchema),
    totals: z
        .object({
        jumps: z.number().int().nonnegative(),
        touches: z.number().int().nonnegative(),
        activeMs: z.number().int().nonnegative(),
    })
        .strict(),
})
    .strict();
//# sourceMappingURL=profile.js.map