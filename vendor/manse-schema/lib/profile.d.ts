import { z } from "zod";
export declare const ComprehensionChannelSchema: z.ZodEnum<["audio", "visual-demo", "both"]>;
export type ComprehensionChannel = z.infer<typeof ComprehensionChannelSchema>;
export declare const PlayerProfileSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    id: z.ZodString;
    createdAt: z.ZodString;
    displayName: z.ZodString;
    locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
    ageBand: z.ZodEnum<["2-3", "4-5", "6-7", "8+"]>;
    measured: z.ZodObject<{
        reachBox: z.ZodEffects<z.ZodObject<{
            x0: z.ZodNumber;
            y0: z.ZodNumber;
            x1: z.ZodNumber;
            y1: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        }, {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        }>, {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        }, {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        }>;
        shoulderYRatio: z.ZodNumber;
        tempoBpm: z.ZodNumber;
        reactionMsP50: z.ZodNumber;
        comprehensionChannel: z.ZodEnum<["audio", "visual-demo", "both"]>;
    }, "strict", z.ZodTypeAny, {
        reachBox: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
        shoulderYRatio: number;
        tempoBpm: number;
        reactionMsP50: number;
        comprehensionChannel: "audio" | "visual-demo" | "both";
    }, {
        reachBox: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
        shoulderYRatio: number;
        tempoBpm: number;
        reactionMsP50: number;
        comprehensionChannel: "audio" | "visual-demo" | "both";
    }>;
    abilities: z.ZodObject<{
        seatedMode: z.ZodBoolean;
        canJump: z.ZodBoolean;
        activeSide: z.ZodEnum<["both", "left", "right"]>;
    }, "strict", z.ZodTypeAny, {
        seatedMode: boolean;
        canJump: boolean;
        activeSide: "left" | "right" | "both";
    }, {
        seatedMode: boolean;
        canJump: boolean;
        activeSide: "left" | "right" | "both";
    }>;
    sensory: z.ZodObject<{
        reducedStimulation: z.ZodBoolean;
        captions: z.ZodBoolean;
        highContrast: z.ZodBoolean;
        audioCues: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        captions: boolean;
        highContrast: boolean;
        reducedStimulation: boolean;
        audioCues: boolean;
    }, {
        captions: boolean;
        highContrast: boolean;
        reducedStimulation: boolean;
        audioCues: boolean;
    }>;
    skill: z.ZodObject<{
        touch_targets: z.ZodNumber;
        freeze: z.ZodNumber;
        body_zone: z.ZodNumber;
        squat: z.ZodNumber;
        pose_match: z.ZodNumber;
        jump: z.ZodNumber;
        velocity_hit: z.ZodNumber;
        step: z.ZodNumber;
        sequence: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        touch_targets: number;
        freeze: number;
        body_zone: number;
        squat: number;
        pose_match: number;
        jump: number;
        velocity_hit: number;
        step: number;
        sequence: number;
    }, {
        touch_targets: number;
        freeze: number;
        body_zone: number;
        squat: number;
        pose_match: number;
        jump: number;
        velocity_hit: number;
        step: number;
        sequence: number;
    }>;
}, "strict", z.ZodTypeAny, {
    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
    createdAt: string;
    id: string;
    schemaVersion: 1;
    displayName: string;
    ageBand: "2-3" | "4-5" | "6-7" | "8+";
    measured: {
        reachBox: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
        shoulderYRatio: number;
        tempoBpm: number;
        reactionMsP50: number;
        comprehensionChannel: "audio" | "visual-demo" | "both";
    };
    abilities: {
        seatedMode: boolean;
        canJump: boolean;
        activeSide: "left" | "right" | "both";
    };
    sensory: {
        captions: boolean;
        highContrast: boolean;
        reducedStimulation: boolean;
        audioCues: boolean;
    };
    skill: {
        touch_targets: number;
        freeze: number;
        body_zone: number;
        squat: number;
        pose_match: number;
        jump: number;
        velocity_hit: number;
        step: number;
        sequence: number;
    };
}, {
    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
    createdAt: string;
    id: string;
    schemaVersion: 1;
    displayName: string;
    ageBand: "2-3" | "4-5" | "6-7" | "8+";
    measured: {
        reachBox: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
        shoulderYRatio: number;
        tempoBpm: number;
        reactionMsP50: number;
        comprehensionChannel: "audio" | "visual-demo" | "both";
    };
    abilities: {
        seatedMode: boolean;
        canJump: boolean;
        activeSide: "left" | "right" | "both";
    };
    sensory: {
        captions: boolean;
        highContrast: boolean;
        reducedStimulation: boolean;
        audioCues: boolean;
    };
    skill: {
        touch_targets: number;
        freeze: number;
        body_zone: number;
        squat: number;
        pose_match: number;
        jump: number;
        velocity_hit: number;
        step: number;
        sequence: number;
    };
}>;
export type PlayerProfile = z.infer<typeof PlayerProfileSchema>;
export declare const SceneStatSchema: z.ZodObject<{
    sceneId: z.ZodString;
    challengeType: z.ZodNullable<z.ZodEnum<["touch_targets", "freeze", "body_zone", "squat", "pose_match", "jump", "velocity_hit", "step", "sequence"]>>;
    outcome: z.ZodNullable<z.ZodEnum<["success", "partial", "struggle"]>>;
    attempts: z.ZodNumber;
    reactionMsP50: z.ZodNullable<z.ZodNumber>;
    activeMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    reactionMsP50: number | null;
    sceneId: string;
    challengeType: "touch_targets" | "freeze" | "body_zone" | "squat" | "pose_match" | "jump" | "velocity_hit" | "step" | "sequence" | null;
    outcome: "success" | "partial" | "struggle" | null;
    attempts: number;
    activeMs: number;
}, {
    reactionMsP50: number | null;
    sceneId: string;
    challengeType: "touch_targets" | "freeze" | "body_zone" | "squat" | "pose_match" | "jump" | "velocity_hit" | "step" | "sequence" | null;
    outcome: "success" | "partial" | "struggle" | null;
    attempts: number;
    activeMs: number;
}>;
export type SceneStat = z.infer<typeof SceneStatSchema>;
export declare const SessionStatsSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    episodeId: z.ZodString;
    startedAt: z.ZodString;
    scenes: z.ZodArray<z.ZodObject<{
        sceneId: z.ZodString;
        challengeType: z.ZodNullable<z.ZodEnum<["touch_targets", "freeze", "body_zone", "squat", "pose_match", "jump", "velocity_hit", "step", "sequence"]>>;
        outcome: z.ZodNullable<z.ZodEnum<["success", "partial", "struggle"]>>;
        attempts: z.ZodNumber;
        reactionMsP50: z.ZodNullable<z.ZodNumber>;
        activeMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        reactionMsP50: number | null;
        sceneId: string;
        challengeType: "touch_targets" | "freeze" | "body_zone" | "squat" | "pose_match" | "jump" | "velocity_hit" | "step" | "sequence" | null;
        outcome: "success" | "partial" | "struggle" | null;
        attempts: number;
        activeMs: number;
    }, {
        reactionMsP50: number | null;
        sceneId: string;
        challengeType: "touch_targets" | "freeze" | "body_zone" | "squat" | "pose_match" | "jump" | "velocity_hit" | "step" | "sequence" | null;
        outcome: "success" | "partial" | "struggle" | null;
        attempts: number;
        activeMs: number;
    }>, "many">;
    totals: z.ZodObject<{
        jumps: z.ZodNumber;
        touches: z.ZodNumber;
        activeMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        activeMs: number;
        jumps: number;
        touches: number;
    }, {
        activeMs: number;
        jumps: number;
        touches: number;
    }>;
}, "strict", z.ZodTypeAny, {
    schemaVersion: 1;
    scenes: {
        reactionMsP50: number | null;
        sceneId: string;
        challengeType: "touch_targets" | "freeze" | "body_zone" | "squat" | "pose_match" | "jump" | "velocity_hit" | "step" | "sequence" | null;
        outcome: "success" | "partial" | "struggle" | null;
        attempts: number;
        activeMs: number;
    }[];
    episodeId: string;
    startedAt: string;
    totals: {
        activeMs: number;
        jumps: number;
        touches: number;
    };
}, {
    schemaVersion: 1;
    scenes: {
        reactionMsP50: number | null;
        sceneId: string;
        challengeType: "touch_targets" | "freeze" | "body_zone" | "squat" | "pose_match" | "jump" | "velocity_hit" | "step" | "sequence" | null;
        outcome: "success" | "partial" | "struggle" | null;
        attempts: number;
        activeMs: number;
    }[];
    episodeId: string;
    startedAt: string;
    totals: {
        activeMs: number;
        jumps: number;
        touches: number;
    };
}>;
export type SessionStats = z.infer<typeof SessionStatsSchema>;
//# sourceMappingURL=profile.d.ts.map