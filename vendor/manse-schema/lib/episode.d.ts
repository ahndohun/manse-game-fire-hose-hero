import { z } from "zod";
/** Runtime release that first executes schemaVersion 2 challenge primitives. */
export declare const MOTION_CONTRACT_ENGINE_VERSION = "0.2.0";
export declare const PoseMatchJointSchema: z.ZodObject<{
    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
    angleDeg: z.ZodNumber;
    toleranceDeg: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
    angleDeg: number;
    toleranceDeg: number;
}, {
    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
    angleDeg: number;
    toleranceDeg: number;
}>;
export type PoseMatchJoint = z.infer<typeof PoseMatchJointSchema>;
export declare const TouchTargetsSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"touch_targets">;
    count: z.ZodNumber;
    zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
    targetScale: z.ZodNumber;
    dwellMs: z.ZodNumber;
    limb: z.ZodEnum<["hands", "feet", "any"]>;
}, "strict", z.ZodTypeAny, {
    type: "touch_targets";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    dwellMs: number;
    limb: "hands" | "feet" | "any";
}, {
    type: "touch_targets";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    dwellMs: number;
    limb: "hands" | "feet" | "any";
}>;
export declare const FreezeSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"freeze">;
    /** How long the whole body must stay under motionThreshold. */
    holdMs: z.ZodNumber;
    /** Mean landmark motion (normalized units/second) treated as "still". */
    motionThreshold: z.ZodNumber;
    /** Motion spikes shorter than this do not reset the hold. */
    graceMs: z.ZodNumber;
    rounds: z.ZodNumber;
    /** Frames with fewer confident joints pause, never fail, the hold. */
    minVisibleJoints: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "freeze";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    motionThreshold: number;
    graceMs: number;
    rounds: number;
    minVisibleJoints: number;
}, {
    type: "freeze";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    motionThreshold: number;
    graceMs: number;
    rounds: number;
    minVisibleJoints: number;
}>;
export declare const BodyZoneSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"body_zone">;
    part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
    mode: z.ZodEnum<["enter", "avoid"]>;
    zones: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        box: z.ZodEffects<z.ZodObject<{
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
    }, "strict", z.ZodTypeAny, {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }, {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }>, "many">;
    /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
    holdMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "body_zone";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    part: "hands" | "feet" | "any" | "head" | "torso";
    mode: "enter" | "avoid";
    zones: {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }[];
}, {
    type: "body_zone";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    part: "hands" | "feet" | "any" | "head" | "torso";
    mode: "enter" | "avoid";
    zones: {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }[];
}>;
export declare const SquatSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"squat">;
    repetitions: z.ZodNumber;
    /** Required hip drop as a fraction of the player's own torso length. */
    depthRatio: z.ZodNumber;
    /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
    kneeAngleMaxDeg: z.ZodNumber;
    /** Hold at the bottom before the repetition counts. */
    holdMs: z.ZodNumber;
    /** Minimum time between counted repetitions; rejects bounce double counts. */
    cooldownMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "squat";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    depthRatio: number;
    kneeAngleMaxDeg: number;
    cooldownMs: number;
}, {
    type: "squat";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    depthRatio: number;
    kneeAngleMaxDeg: number;
    cooldownMs: number;
}>;
export declare const PoseMatchSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"pose_match">;
    poses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        joints: z.ZodArray<z.ZodObject<{
            joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
            angleDeg: z.ZodNumber;
            toleranceDeg: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }, {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }>, "many">;
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }, {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }>, "many">;
    /** Fraction of listed joints that must be inside tolerance at once. */
    matchRatio: z.ZodNumber;
    /** "either" also accepts the left/right mirrored pose. */
    mirrorPolicy: z.ZodEnum<["strict", "either"]>;
}, "strict", z.ZodTypeAny, {
    type: "pose_match";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    poses: {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }[];
    matchRatio: number;
    mirrorPolicy: "strict" | "either";
}, {
    type: "pose_match";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    poses: {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }[];
    matchRatio: number;
    mirrorPolicy: "strict" | "either";
}>;
export declare const JumpSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"jump">;
    repetitions: z.ZodNumber;
    /** Required hip rise relative to the player's own torso length. */
    minRiseRatio: z.ZodNumber;
    /** Both feet must be back down and stable for this long to count a landing. */
    landingStableMs: z.ZodNumber;
    cooldownMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "jump";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    cooldownMs: number;
    minRiseRatio: number;
    landingStableMs: number;
}, {
    type: "jump";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    cooldownMs: number;
    minRiseRatio: number;
    landingStableMs: number;
}>;
export declare const VelocityHitSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"velocity_hit">;
    count: z.ZodNumber;
    zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
    targetScale: z.ZodNumber;
    limb: z.ZodEnum<["hands", "feet", "any"]>;
    /** On-screen limb speed (normalized units/second) required at contact. */
    minSpeed: z.ZodNumber;
    direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
}, "strict", z.ZodTypeAny, {
    type: "velocity_hit";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    limb: "hands" | "feet" | "any";
    minSpeed: number;
    direction: "any" | "up" | "down" | "left" | "right";
}, {
    type: "velocity_hit";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    limb: "hands" | "feet" | "any";
    minSpeed: number;
    direction: "any" | "up" | "down" | "left" | "right";
}>;
export declare const StepSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"step">;
    pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
    /** Lateral foot travel required, relative to the player's own torso length. */
    stepRatio: z.ZodNumber;
    /** Settle time on the new stance before the step counts. */
    holdMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "step";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    pattern: ("left" | "right")[];
    stepRatio: number;
}, {
    type: "step";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    pattern: ("left" | "right")[];
    stepRatio: number;
}>;
/** Sequence steps are inner motion configs: base timing/audio belongs to the sequence. */
export declare const SequenceStepSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"touch_targets">;
    count: z.ZodNumber;
    zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
    targetScale: z.ZodNumber;
    dwellMs: z.ZodNumber;
    limb: z.ZodEnum<["hands", "feet", "any"]>;
}, "strict", z.ZodTypeAny, {
    type: "touch_targets";
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    dwellMs: number;
    limb: "hands" | "feet" | "any";
}, {
    type: "touch_targets";
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    dwellMs: number;
    limb: "hands" | "feet" | "any";
}>, z.ZodObject<{
    type: z.ZodLiteral<"freeze">;
    /** How long the whole body must stay under motionThreshold. */
    holdMs: z.ZodNumber;
    /** Mean landmark motion (normalized units/second) treated as "still". */
    motionThreshold: z.ZodNumber;
    /** Motion spikes shorter than this do not reset the hold. */
    graceMs: z.ZodNumber;
    rounds: z.ZodNumber;
    /** Frames with fewer confident joints pause, never fail, the hold. */
    minVisibleJoints: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "freeze";
    holdMs: number;
    motionThreshold: number;
    graceMs: number;
    rounds: number;
    minVisibleJoints: number;
}, {
    type: "freeze";
    holdMs: number;
    motionThreshold: number;
    graceMs: number;
    rounds: number;
    minVisibleJoints: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"body_zone">;
    part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
    mode: z.ZodEnum<["enter", "avoid"]>;
    zones: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        box: z.ZodEffects<z.ZodObject<{
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
    }, "strict", z.ZodTypeAny, {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }, {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }>, "many">;
    /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
    holdMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "body_zone";
    holdMs: number;
    part: "hands" | "feet" | "any" | "head" | "torso";
    mode: "enter" | "avoid";
    zones: {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }[];
}, {
    type: "body_zone";
    holdMs: number;
    part: "hands" | "feet" | "any" | "head" | "torso";
    mode: "enter" | "avoid";
    zones: {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"squat">;
    repetitions: z.ZodNumber;
    /** Required hip drop as a fraction of the player's own torso length. */
    depthRatio: z.ZodNumber;
    /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
    kneeAngleMaxDeg: z.ZodNumber;
    /** Hold at the bottom before the repetition counts. */
    holdMs: z.ZodNumber;
    /** Minimum time between counted repetitions; rejects bounce double counts. */
    cooldownMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "squat";
    holdMs: number;
    repetitions: number;
    depthRatio: number;
    kneeAngleMaxDeg: number;
    cooldownMs: number;
}, {
    type: "squat";
    holdMs: number;
    repetitions: number;
    depthRatio: number;
    kneeAngleMaxDeg: number;
    cooldownMs: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"pose_match">;
    poses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        joints: z.ZodArray<z.ZodObject<{
            joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
            angleDeg: z.ZodNumber;
            toleranceDeg: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }, {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }>, "many">;
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }, {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }>, "many">;
    /** Fraction of listed joints that must be inside tolerance at once. */
    matchRatio: z.ZodNumber;
    /** "either" also accepts the left/right mirrored pose. */
    mirrorPolicy: z.ZodEnum<["strict", "either"]>;
}, "strict", z.ZodTypeAny, {
    type: "pose_match";
    poses: {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }[];
    matchRatio: number;
    mirrorPolicy: "strict" | "either";
}, {
    type: "pose_match";
    poses: {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }[];
    matchRatio: number;
    mirrorPolicy: "strict" | "either";
}>, z.ZodObject<{
    type: z.ZodLiteral<"jump">;
    repetitions: z.ZodNumber;
    /** Required hip rise relative to the player's own torso length. */
    minRiseRatio: z.ZodNumber;
    /** Both feet must be back down and stable for this long to count a landing. */
    landingStableMs: z.ZodNumber;
    cooldownMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "jump";
    repetitions: number;
    cooldownMs: number;
    minRiseRatio: number;
    landingStableMs: number;
}, {
    type: "jump";
    repetitions: number;
    cooldownMs: number;
    minRiseRatio: number;
    landingStableMs: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"velocity_hit">;
    count: z.ZodNumber;
    zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
    targetScale: z.ZodNumber;
    limb: z.ZodEnum<["hands", "feet", "any"]>;
    /** On-screen limb speed (normalized units/second) required at contact. */
    minSpeed: z.ZodNumber;
    direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
}, "strict", z.ZodTypeAny, {
    type: "velocity_hit";
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    limb: "hands" | "feet" | "any";
    minSpeed: number;
    direction: "any" | "up" | "down" | "left" | "right";
}, {
    type: "velocity_hit";
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    limb: "hands" | "feet" | "any";
    minSpeed: number;
    direction: "any" | "up" | "down" | "left" | "right";
}>, z.ZodObject<{
    type: z.ZodLiteral<"step">;
    pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
    /** Lateral foot travel required, relative to the player's own torso length. */
    stepRatio: z.ZodNumber;
    /** Settle time on the new stance before the step counts. */
    holdMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "step";
    holdMs: number;
    pattern: ("left" | "right")[];
    stepRatio: number;
}, {
    type: "step";
    holdMs: number;
    pattern: ("left" | "right")[];
    stepRatio: number;
}>]>;
export type SequenceStep = z.infer<typeof SequenceStepSchema>;
export declare const SequenceSchema: z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"sequence">;
    steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"touch_targets">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        dwellMs: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
    }, "strict", z.ZodTypeAny, {
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }, {
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"freeze">;
        /** How long the whole body must stay under motionThreshold. */
        holdMs: z.ZodNumber;
        /** Mean landmark motion (normalized units/second) treated as "still". */
        motionThreshold: z.ZodNumber;
        /** Motion spikes shorter than this do not reset the hold. */
        graceMs: z.ZodNumber;
        rounds: z.ZodNumber;
        /** Frames with fewer confident joints pause, never fail, the hold. */
        minVisibleJoints: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }, {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"body_zone">;
        part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
        mode: z.ZodEnum<["enter", "avoid"]>;
        zones: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            box: z.ZodEffects<z.ZodObject<{
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
        }, "strict", z.ZodTypeAny, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }>, "many">;
        /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }, {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"squat">;
        repetitions: z.ZodNumber;
        /** Required hip drop as a fraction of the player's own torso length. */
        depthRatio: z.ZodNumber;
        /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
        kneeAngleMaxDeg: z.ZodNumber;
        /** Hold at the bottom before the repetition counts. */
        holdMs: z.ZodNumber;
        /** Minimum time between counted repetitions; rejects bounce double counts. */
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }, {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"pose_match">;
        poses: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            joints: z.ZodArray<z.ZodObject<{
                joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                angleDeg: z.ZodNumber;
                toleranceDeg: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }>, "many">;
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }>, "many">;
        /** Fraction of listed joints that must be inside tolerance at once. */
        matchRatio: z.ZodNumber;
        /** "either" also accepts the left/right mirrored pose. */
        mirrorPolicy: z.ZodEnum<["strict", "either"]>;
    }, "strict", z.ZodTypeAny, {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }, {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"jump">;
        repetitions: z.ZodNumber;
        /** Required hip rise relative to the player's own torso length. */
        minRiseRatio: z.ZodNumber;
        /** Both feet must be back down and stable for this long to count a landing. */
        landingStableMs: z.ZodNumber;
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }, {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"velocity_hit">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
        /** On-screen limb speed (normalized units/second) required at contact. */
        minSpeed: z.ZodNumber;
        direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
    }, "strict", z.ZodTypeAny, {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }, {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"step">;
        pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
        /** Lateral foot travel required, relative to the player's own torso length. */
        stepRatio: z.ZodNumber;
        /** Settle time on the new stance before the step counts. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }, {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }>]>, "many">;
    /** Pause allowed between completed steps before the next one arms. */
    interStepGraceMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "sequence";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    steps: ({
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    })[];
    interStepGraceMs: number;
}, {
    type: "sequence";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    steps: ({
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    })[];
    interStepGraceMs: number;
}>;
export declare const ChallengeSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"touch_targets">;
    count: z.ZodNumber;
    zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
    targetScale: z.ZodNumber;
    dwellMs: z.ZodNumber;
    limb: z.ZodEnum<["hands", "feet", "any"]>;
}, "strict", z.ZodTypeAny, {
    type: "touch_targets";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    dwellMs: number;
    limb: "hands" | "feet" | "any";
}, {
    type: "touch_targets";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    dwellMs: number;
    limb: "hands" | "feet" | "any";
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"freeze">;
    /** How long the whole body must stay under motionThreshold. */
    holdMs: z.ZodNumber;
    /** Mean landmark motion (normalized units/second) treated as "still". */
    motionThreshold: z.ZodNumber;
    /** Motion spikes shorter than this do not reset the hold. */
    graceMs: z.ZodNumber;
    rounds: z.ZodNumber;
    /** Frames with fewer confident joints pause, never fail, the hold. */
    minVisibleJoints: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "freeze";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    motionThreshold: number;
    graceMs: number;
    rounds: number;
    minVisibleJoints: number;
}, {
    type: "freeze";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    motionThreshold: number;
    graceMs: number;
    rounds: number;
    minVisibleJoints: number;
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"body_zone">;
    part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
    mode: z.ZodEnum<["enter", "avoid"]>;
    zones: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        box: z.ZodEffects<z.ZodObject<{
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
    }, "strict", z.ZodTypeAny, {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }, {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }>, "many">;
    /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
    holdMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "body_zone";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    part: "hands" | "feet" | "any" | "head" | "torso";
    mode: "enter" | "avoid";
    zones: {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }[];
}, {
    type: "body_zone";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    part: "hands" | "feet" | "any" | "head" | "torso";
    mode: "enter" | "avoid";
    zones: {
        id: string;
        box: {
            x0: number;
            y0: number;
            x1: number;
            y1: number;
        };
    }[];
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"squat">;
    repetitions: z.ZodNumber;
    /** Required hip drop as a fraction of the player's own torso length. */
    depthRatio: z.ZodNumber;
    /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
    kneeAngleMaxDeg: z.ZodNumber;
    /** Hold at the bottom before the repetition counts. */
    holdMs: z.ZodNumber;
    /** Minimum time between counted repetitions; rejects bounce double counts. */
    cooldownMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "squat";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    depthRatio: number;
    kneeAngleMaxDeg: number;
    cooldownMs: number;
}, {
    type: "squat";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    depthRatio: number;
    kneeAngleMaxDeg: number;
    cooldownMs: number;
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"pose_match">;
    poses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        joints: z.ZodArray<z.ZodObject<{
            joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
            angleDeg: z.ZodNumber;
            toleranceDeg: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }, {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }>, "many">;
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }, {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }>, "many">;
    /** Fraction of listed joints that must be inside tolerance at once. */
    matchRatio: z.ZodNumber;
    /** "either" also accepts the left/right mirrored pose. */
    mirrorPolicy: z.ZodEnum<["strict", "either"]>;
}, "strict", z.ZodTypeAny, {
    type: "pose_match";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    poses: {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }[];
    matchRatio: number;
    mirrorPolicy: "strict" | "either";
}, {
    type: "pose_match";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    poses: {
        id: string;
        joints: {
            joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
            angleDeg: number;
            toleranceDeg: number;
        }[];
        holdMs: number;
    }[];
    matchRatio: number;
    mirrorPolicy: "strict" | "either";
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"jump">;
    repetitions: z.ZodNumber;
    /** Required hip rise relative to the player's own torso length. */
    minRiseRatio: z.ZodNumber;
    /** Both feet must be back down and stable for this long to count a landing. */
    landingStableMs: z.ZodNumber;
    cooldownMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "jump";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    cooldownMs: number;
    minRiseRatio: number;
    landingStableMs: number;
}, {
    type: "jump";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    repetitions: number;
    cooldownMs: number;
    minRiseRatio: number;
    landingStableMs: number;
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"velocity_hit">;
    count: z.ZodNumber;
    zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
    targetScale: z.ZodNumber;
    limb: z.ZodEnum<["hands", "feet", "any"]>;
    /** On-screen limb speed (normalized units/second) required at contact. */
    minSpeed: z.ZodNumber;
    direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
}, "strict", z.ZodTypeAny, {
    type: "velocity_hit";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    limb: "hands" | "feet" | "any";
    minSpeed: number;
    direction: "any" | "up" | "down" | "left" | "right";
}, {
    type: "velocity_hit";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    count: number;
    zone: "upper" | "lower" | "full" | "reachable";
    targetScale: number;
    limb: "hands" | "feet" | "any";
    minSpeed: number;
    direction: "any" | "up" | "down" | "left" | "right";
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"step">;
    pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
    /** Lateral foot travel required, relative to the player's own torso length. */
    stepRatio: z.ZodNumber;
    /** Settle time on the new stance before the step counts. */
    holdMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "step";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    pattern: ("left" | "right")[];
    stepRatio: number;
}, {
    type: "step";
    holdMs: number;
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    pattern: ("left" | "right")[];
    stepRatio: number;
}>, z.ZodObject<{
    timeBudgetMs: z.ZodNumber;
    successAudioId: z.ZodString;
    encourageAudioId: z.ZodString;
    type: z.ZodLiteral<"sequence">;
    steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"touch_targets">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        dwellMs: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
    }, "strict", z.ZodTypeAny, {
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }, {
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"freeze">;
        /** How long the whole body must stay under motionThreshold. */
        holdMs: z.ZodNumber;
        /** Mean landmark motion (normalized units/second) treated as "still". */
        motionThreshold: z.ZodNumber;
        /** Motion spikes shorter than this do not reset the hold. */
        graceMs: z.ZodNumber;
        rounds: z.ZodNumber;
        /** Frames with fewer confident joints pause, never fail, the hold. */
        minVisibleJoints: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }, {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"body_zone">;
        part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
        mode: z.ZodEnum<["enter", "avoid"]>;
        zones: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            box: z.ZodEffects<z.ZodObject<{
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
        }, "strict", z.ZodTypeAny, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }>, "many">;
        /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }, {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"squat">;
        repetitions: z.ZodNumber;
        /** Required hip drop as a fraction of the player's own torso length. */
        depthRatio: z.ZodNumber;
        /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
        kneeAngleMaxDeg: z.ZodNumber;
        /** Hold at the bottom before the repetition counts. */
        holdMs: z.ZodNumber;
        /** Minimum time between counted repetitions; rejects bounce double counts. */
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }, {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"pose_match">;
        poses: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            joints: z.ZodArray<z.ZodObject<{
                joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                angleDeg: z.ZodNumber;
                toleranceDeg: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }>, "many">;
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }>, "many">;
        /** Fraction of listed joints that must be inside tolerance at once. */
        matchRatio: z.ZodNumber;
        /** "either" also accepts the left/right mirrored pose. */
        mirrorPolicy: z.ZodEnum<["strict", "either"]>;
    }, "strict", z.ZodTypeAny, {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }, {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"jump">;
        repetitions: z.ZodNumber;
        /** Required hip rise relative to the player's own torso length. */
        minRiseRatio: z.ZodNumber;
        /** Both feet must be back down and stable for this long to count a landing. */
        landingStableMs: z.ZodNumber;
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }, {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"velocity_hit">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
        /** On-screen limb speed (normalized units/second) required at contact. */
        minSpeed: z.ZodNumber;
        direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
    }, "strict", z.ZodTypeAny, {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }, {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"step">;
        pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
        /** Lateral foot travel required, relative to the player's own torso length. */
        stepRatio: z.ZodNumber;
        /** Settle time on the new stance before the step counts. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }, {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }>]>, "many">;
    /** Pause allowed between completed steps before the next one arms. */
    interStepGraceMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "sequence";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    steps: ({
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    })[];
    interStepGraceMs: number;
}, {
    type: "sequence";
    timeBudgetMs: number;
    successAudioId: string;
    encourageAudioId: string;
    steps: ({
        type: "touch_targets";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        pattern: ("left" | "right")[];
        stepRatio: number;
    })[];
    interStepGraceMs: number;
}>]>;
export type Challenge = z.infer<typeof ChallengeSchema>;
export type ChallengeType = Challenge["type"];
export type TouchTargetsChallenge = z.infer<typeof TouchTargetsSchema>;
export type FreezeChallenge = z.infer<typeof FreezeSchema>;
export type BodyZoneChallenge = z.infer<typeof BodyZoneSchema>;
export type SquatChallenge = z.infer<typeof SquatSchema>;
export type PoseMatchChallenge = z.infer<typeof PoseMatchSchema>;
export type JumpChallenge = z.infer<typeof JumpSchema>;
export type VelocityHitChallenge = z.infer<typeof VelocityHitSchema>;
export type StepChallenge = z.infer<typeof StepSchema>;
export type SequenceChallenge = z.infer<typeof SequenceSchema>;
export declare const LearningMomentSchema: z.ZodObject<{
    kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
    payload: z.ZodArray<z.ZodString, "many">;
}, "strict", z.ZodTypeAny, {
    kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
    payload: string[];
}, {
    kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
    payload: string[];
}>;
export type LearningMoment = z.infer<typeof LearningMomentSchema>;
export declare const NarrationItemSchema: z.ZodObject<{
    locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
    text: z.ZodString;
    audioAssetId: z.ZodNullable<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
    text: string;
    audioAssetId: string | null;
}, {
    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
    text: string;
    audioAssetId: string | null;
}>;
export type NarrationItem = z.infer<typeof NarrationItemSchema>;
export declare const NarrationSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
        text: z.ZodString;
        audioAssetId: z.ZodNullable<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
        audioAssetId: string | null;
    }, {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
        audioAssetId: string | null;
    }>, "many">;
    captionDefaultOn: z.ZodLiteral<true>;
}, "strict", z.ZodTypeAny, {
    items: {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
        audioAssetId: string | null;
    }[];
    captionDefaultOn: true;
}, {
    items: {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
        audioAssetId: string | null;
    }[];
    captionDefaultOn: true;
}>;
export type Narration = z.infer<typeof NarrationSchema>;
export declare const OutcomeSchema: z.ZodEnum<["success", "partial", "struggle"]>;
export type Outcome = z.infer<typeof OutcomeSchema>;
export declare const ParamDeltaSchema: z.ZodObject<{
    targetScaleMul: z.ZodNumber;
    dwellMsMul: z.ZodNumber;
    countDelta: z.ZodNumber;
    timeBudgetMul: z.ZodNumber;
    /**
     * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
     * existing v1 pack valid byte-for-byte.
     */
    toleranceMul: z.ZodOptional<z.ZodNumber>;
    holdMsMul: z.ZodOptional<z.ZodNumber>;
    repetitionsDelta: z.ZodOptional<z.ZodNumber>;
    speedMul: z.ZodOptional<z.ZodNumber>;
    motionThresholdMul: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    targetScaleMul: number;
    dwellMsMul: number;
    countDelta: number;
    timeBudgetMul: number;
    toleranceMul?: number | undefined;
    holdMsMul?: number | undefined;
    repetitionsDelta?: number | undefined;
    speedMul?: number | undefined;
    motionThresholdMul?: number | undefined;
}, {
    targetScaleMul: number;
    dwellMsMul: number;
    countDelta: number;
    timeBudgetMul: number;
    toleranceMul?: number | undefined;
    holdMsMul?: number | undefined;
    repetitionsDelta?: number | undefined;
    speedMul?: number | undefined;
    motionThresholdMul?: number | undefined;
}>;
export type ParamDelta = z.infer<typeof ParamDeltaSchema>;
export declare const TransitionEventSchema: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
export type TransitionEvent = z.infer<typeof TransitionEventSchema>;
export declare const TransitionSchema: z.ZodObject<{
    on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
    to: z.ZodString;
    adapt: z.ZodNullable<z.ZodObject<{
        targetScaleMul: z.ZodNumber;
        dwellMsMul: z.ZodNumber;
        countDelta: z.ZodNumber;
        timeBudgetMul: z.ZodNumber;
        /**
         * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
         * existing v1 pack valid byte-for-byte.
         */
        toleranceMul: z.ZodOptional<z.ZodNumber>;
        holdMsMul: z.ZodOptional<z.ZodNumber>;
        repetitionsDelta: z.ZodOptional<z.ZodNumber>;
        speedMul: z.ZodOptional<z.ZodNumber>;
        motionThresholdMul: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        targetScaleMul: number;
        dwellMsMul: number;
        countDelta: number;
        timeBudgetMul: number;
        toleranceMul?: number | undefined;
        holdMsMul?: number | undefined;
        repetitionsDelta?: number | undefined;
        speedMul?: number | undefined;
        motionThresholdMul?: number | undefined;
    }, {
        targetScaleMul: number;
        dwellMsMul: number;
        countDelta: number;
        timeBudgetMul: number;
        toleranceMul?: number | undefined;
        holdMsMul?: number | undefined;
        repetitionsDelta?: number | undefined;
        speedMul?: number | undefined;
        motionThresholdMul?: number | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    on: "success" | "partial" | "struggle" | "always";
    to: string;
    adapt: {
        targetScaleMul: number;
        dwellMsMul: number;
        countDelta: number;
        timeBudgetMul: number;
        toleranceMul?: number | undefined;
        holdMsMul?: number | undefined;
        repetitionsDelta?: number | undefined;
        speedMul?: number | undefined;
        motionThresholdMul?: number | undefined;
    } | null;
}, {
    on: "success" | "partial" | "struggle" | "always";
    to: string;
    adapt: {
        targetScaleMul: number;
        dwellMsMul: number;
        countDelta: number;
        timeBudgetMul: number;
        toleranceMul?: number | undefined;
        holdMsMul?: number | undefined;
        repetitionsDelta?: number | undefined;
        speedMul?: number | undefined;
        motionThresholdMul?: number | undefined;
    } | null;
}>;
export type Transition = z.infer<typeof TransitionSchema>;
export declare const NonTerminalSceneSchema: z.ZodObject<{
    terminal: z.ZodLiteral<false>;
    transitions: z.ZodArray<z.ZodObject<{
        on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
        to: z.ZodString;
        adapt: z.ZodNullable<z.ZodObject<{
            targetScaleMul: z.ZodNumber;
            dwellMsMul: z.ZodNumber;
            countDelta: z.ZodNumber;
            timeBudgetMul: z.ZodNumber;
            /**
             * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
             * existing v1 pack valid byte-for-byte.
             */
            toleranceMul: z.ZodOptional<z.ZodNumber>;
            holdMsMul: z.ZodOptional<z.ZodNumber>;
            repetitionsDelta: z.ZodOptional<z.ZodNumber>;
            speedMul: z.ZodOptional<z.ZodNumber>;
            motionThresholdMul: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }>, "many">;
    id: z.ZodString;
    kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
    narration: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
            audioAssetId: z.ZodNullable<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }>, "many">;
        captionDefaultOn: z.ZodLiteral<true>;
    }, "strict", z.ZodTypeAny, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }>;
    demo: z.ZodNullable<z.ZodObject<{
        characterId: z.ZodString;
        animation: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        characterId: string;
        animation: string;
    }, {
        characterId: string;
        animation: string;
    }>>;
    challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"touch_targets">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        dwellMs: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
    }, "strict", z.ZodTypeAny, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"freeze">;
        /** How long the whole body must stay under motionThreshold. */
        holdMs: z.ZodNumber;
        /** Mean landmark motion (normalized units/second) treated as "still". */
        motionThreshold: z.ZodNumber;
        /** Motion spikes shorter than this do not reset the hold. */
        graceMs: z.ZodNumber;
        rounds: z.ZodNumber;
        /** Frames with fewer confident joints pause, never fail, the hold. */
        minVisibleJoints: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"body_zone">;
        part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
        mode: z.ZodEnum<["enter", "avoid"]>;
        zones: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            box: z.ZodEffects<z.ZodObject<{
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
        }, "strict", z.ZodTypeAny, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }>, "many">;
        /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"squat">;
        repetitions: z.ZodNumber;
        /** Required hip drop as a fraction of the player's own torso length. */
        depthRatio: z.ZodNumber;
        /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
        kneeAngleMaxDeg: z.ZodNumber;
        /** Hold at the bottom before the repetition counts. */
        holdMs: z.ZodNumber;
        /** Minimum time between counted repetitions; rejects bounce double counts. */
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"pose_match">;
        poses: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            joints: z.ZodArray<z.ZodObject<{
                joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                angleDeg: z.ZodNumber;
                toleranceDeg: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }>, "many">;
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }>, "many">;
        /** Fraction of listed joints that must be inside tolerance at once. */
        matchRatio: z.ZodNumber;
        /** "either" also accepts the left/right mirrored pose. */
        mirrorPolicy: z.ZodEnum<["strict", "either"]>;
    }, "strict", z.ZodTypeAny, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"jump">;
        repetitions: z.ZodNumber;
        /** Required hip rise relative to the player's own torso length. */
        minRiseRatio: z.ZodNumber;
        /** Both feet must be back down and stable for this long to count a landing. */
        landingStableMs: z.ZodNumber;
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"velocity_hit">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
        /** On-screen limb speed (normalized units/second) required at contact. */
        minSpeed: z.ZodNumber;
        direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
    }, "strict", z.ZodTypeAny, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"step">;
        pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
        /** Lateral foot travel required, relative to the player's own torso length. */
        stepRatio: z.ZodNumber;
        /** Settle time on the new stance before the step counts. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"sequence">;
        steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>]>, "many">;
        /** Pause allowed between completed steps before the next one arms. */
        interStepGraceMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }>]>>;
    learning: z.ZodNullable<z.ZodObject<{
        kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
        payload: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }>>;
    artAssetId: z.ZodNullable<z.ZodString>;
    energy: z.ZodEnum<["calm", "medium", "high"]>;
}, "strict", z.ZodTypeAny, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: false;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: false;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}>;
export type NonTerminalScene = z.infer<typeof NonTerminalSceneSchema>;
export declare const TerminalSceneSchema: z.ZodObject<{
    terminal: z.ZodLiteral<true>;
    transitions: z.ZodArray<z.ZodObject<{
        on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
        to: z.ZodString;
        adapt: z.ZodNullable<z.ZodObject<{
            targetScaleMul: z.ZodNumber;
            dwellMsMul: z.ZodNumber;
            countDelta: z.ZodNumber;
            timeBudgetMul: z.ZodNumber;
            /**
             * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
             * existing v1 pack valid byte-for-byte.
             */
            toleranceMul: z.ZodOptional<z.ZodNumber>;
            holdMsMul: z.ZodOptional<z.ZodNumber>;
            repetitionsDelta: z.ZodOptional<z.ZodNumber>;
            speedMul: z.ZodOptional<z.ZodNumber>;
            motionThresholdMul: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }>, "many">;
    id: z.ZodString;
    kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
    narration: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
            audioAssetId: z.ZodNullable<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }>, "many">;
        captionDefaultOn: z.ZodLiteral<true>;
    }, "strict", z.ZodTypeAny, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }>;
    demo: z.ZodNullable<z.ZodObject<{
        characterId: z.ZodString;
        animation: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        characterId: string;
        animation: string;
    }, {
        characterId: string;
        animation: string;
    }>>;
    challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"touch_targets">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        dwellMs: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
    }, "strict", z.ZodTypeAny, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"freeze">;
        /** How long the whole body must stay under motionThreshold. */
        holdMs: z.ZodNumber;
        /** Mean landmark motion (normalized units/second) treated as "still". */
        motionThreshold: z.ZodNumber;
        /** Motion spikes shorter than this do not reset the hold. */
        graceMs: z.ZodNumber;
        rounds: z.ZodNumber;
        /** Frames with fewer confident joints pause, never fail, the hold. */
        minVisibleJoints: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"body_zone">;
        part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
        mode: z.ZodEnum<["enter", "avoid"]>;
        zones: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            box: z.ZodEffects<z.ZodObject<{
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
        }, "strict", z.ZodTypeAny, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }>, "many">;
        /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"squat">;
        repetitions: z.ZodNumber;
        /** Required hip drop as a fraction of the player's own torso length. */
        depthRatio: z.ZodNumber;
        /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
        kneeAngleMaxDeg: z.ZodNumber;
        /** Hold at the bottom before the repetition counts. */
        holdMs: z.ZodNumber;
        /** Minimum time between counted repetitions; rejects bounce double counts. */
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"pose_match">;
        poses: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            joints: z.ZodArray<z.ZodObject<{
                joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                angleDeg: z.ZodNumber;
                toleranceDeg: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }>, "many">;
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }>, "many">;
        /** Fraction of listed joints that must be inside tolerance at once. */
        matchRatio: z.ZodNumber;
        /** "either" also accepts the left/right mirrored pose. */
        mirrorPolicy: z.ZodEnum<["strict", "either"]>;
    }, "strict", z.ZodTypeAny, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"jump">;
        repetitions: z.ZodNumber;
        /** Required hip rise relative to the player's own torso length. */
        minRiseRatio: z.ZodNumber;
        /** Both feet must be back down and stable for this long to count a landing. */
        landingStableMs: z.ZodNumber;
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"velocity_hit">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
        /** On-screen limb speed (normalized units/second) required at contact. */
        minSpeed: z.ZodNumber;
        direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
    }, "strict", z.ZodTypeAny, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"step">;
        pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
        /** Lateral foot travel required, relative to the player's own torso length. */
        stepRatio: z.ZodNumber;
        /** Settle time on the new stance before the step counts. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"sequence">;
        steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>]>, "many">;
        /** Pause allowed between completed steps before the next one arms. */
        interStepGraceMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }>]>>;
    learning: z.ZodNullable<z.ZodObject<{
        kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
        payload: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }>>;
    artAssetId: z.ZodNullable<z.ZodString>;
    energy: z.ZodEnum<["calm", "medium", "high"]>;
}, "strict", z.ZodTypeAny, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: true;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: true;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}>;
export type TerminalScene = z.infer<typeof TerminalSceneSchema>;
export declare const SceneSchema: z.ZodDiscriminatedUnion<"terminal", [z.ZodObject<{
    terminal: z.ZodLiteral<false>;
    transitions: z.ZodArray<z.ZodObject<{
        on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
        to: z.ZodString;
        adapt: z.ZodNullable<z.ZodObject<{
            targetScaleMul: z.ZodNumber;
            dwellMsMul: z.ZodNumber;
            countDelta: z.ZodNumber;
            timeBudgetMul: z.ZodNumber;
            /**
             * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
             * existing v1 pack valid byte-for-byte.
             */
            toleranceMul: z.ZodOptional<z.ZodNumber>;
            holdMsMul: z.ZodOptional<z.ZodNumber>;
            repetitionsDelta: z.ZodOptional<z.ZodNumber>;
            speedMul: z.ZodOptional<z.ZodNumber>;
            motionThresholdMul: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }>, "many">;
    id: z.ZodString;
    kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
    narration: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
            audioAssetId: z.ZodNullable<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }>, "many">;
        captionDefaultOn: z.ZodLiteral<true>;
    }, "strict", z.ZodTypeAny, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }>;
    demo: z.ZodNullable<z.ZodObject<{
        characterId: z.ZodString;
        animation: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        characterId: string;
        animation: string;
    }, {
        characterId: string;
        animation: string;
    }>>;
    challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"touch_targets">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        dwellMs: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
    }, "strict", z.ZodTypeAny, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"freeze">;
        /** How long the whole body must stay under motionThreshold. */
        holdMs: z.ZodNumber;
        /** Mean landmark motion (normalized units/second) treated as "still". */
        motionThreshold: z.ZodNumber;
        /** Motion spikes shorter than this do not reset the hold. */
        graceMs: z.ZodNumber;
        rounds: z.ZodNumber;
        /** Frames with fewer confident joints pause, never fail, the hold. */
        minVisibleJoints: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"body_zone">;
        part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
        mode: z.ZodEnum<["enter", "avoid"]>;
        zones: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            box: z.ZodEffects<z.ZodObject<{
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
        }, "strict", z.ZodTypeAny, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }>, "many">;
        /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"squat">;
        repetitions: z.ZodNumber;
        /** Required hip drop as a fraction of the player's own torso length. */
        depthRatio: z.ZodNumber;
        /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
        kneeAngleMaxDeg: z.ZodNumber;
        /** Hold at the bottom before the repetition counts. */
        holdMs: z.ZodNumber;
        /** Minimum time between counted repetitions; rejects bounce double counts. */
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"pose_match">;
        poses: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            joints: z.ZodArray<z.ZodObject<{
                joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                angleDeg: z.ZodNumber;
                toleranceDeg: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }>, "many">;
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }>, "many">;
        /** Fraction of listed joints that must be inside tolerance at once. */
        matchRatio: z.ZodNumber;
        /** "either" also accepts the left/right mirrored pose. */
        mirrorPolicy: z.ZodEnum<["strict", "either"]>;
    }, "strict", z.ZodTypeAny, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"jump">;
        repetitions: z.ZodNumber;
        /** Required hip rise relative to the player's own torso length. */
        minRiseRatio: z.ZodNumber;
        /** Both feet must be back down and stable for this long to count a landing. */
        landingStableMs: z.ZodNumber;
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"velocity_hit">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
        /** On-screen limb speed (normalized units/second) required at contact. */
        minSpeed: z.ZodNumber;
        direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
    }, "strict", z.ZodTypeAny, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"step">;
        pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
        /** Lateral foot travel required, relative to the player's own torso length. */
        stepRatio: z.ZodNumber;
        /** Settle time on the new stance before the step counts. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"sequence">;
        steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>]>, "many">;
        /** Pause allowed between completed steps before the next one arms. */
        interStepGraceMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }>]>>;
    learning: z.ZodNullable<z.ZodObject<{
        kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
        payload: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }>>;
    artAssetId: z.ZodNullable<z.ZodString>;
    energy: z.ZodEnum<["calm", "medium", "high"]>;
}, "strict", z.ZodTypeAny, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: false;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: false;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}>, z.ZodObject<{
    terminal: z.ZodLiteral<true>;
    transitions: z.ZodArray<z.ZodObject<{
        on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
        to: z.ZodString;
        adapt: z.ZodNullable<z.ZodObject<{
            targetScaleMul: z.ZodNumber;
            dwellMsMul: z.ZodNumber;
            countDelta: z.ZodNumber;
            timeBudgetMul: z.ZodNumber;
            /**
             * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
             * existing v1 pack valid byte-for-byte.
             */
            toleranceMul: z.ZodOptional<z.ZodNumber>;
            holdMsMul: z.ZodOptional<z.ZodNumber>;
            repetitionsDelta: z.ZodOptional<z.ZodNumber>;
            speedMul: z.ZodOptional<z.ZodNumber>;
            motionThresholdMul: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }, {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }, {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }>, "many">;
    id: z.ZodString;
    kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
    narration: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
            audioAssetId: z.ZodNullable<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }>, "many">;
        captionDefaultOn: z.ZodLiteral<true>;
    }, "strict", z.ZodTypeAny, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }, {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    }>;
    demo: z.ZodNullable<z.ZodObject<{
        characterId: z.ZodString;
        animation: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        characterId: string;
        animation: string;
    }, {
        characterId: string;
        animation: string;
    }>>;
    challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"touch_targets">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        dwellMs: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
    }, "strict", z.ZodTypeAny, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }, {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"freeze">;
        /** How long the whole body must stay under motionThreshold. */
        holdMs: z.ZodNumber;
        /** Mean landmark motion (normalized units/second) treated as "still". */
        motionThreshold: z.ZodNumber;
        /** Motion spikes shorter than this do not reset the hold. */
        graceMs: z.ZodNumber;
        rounds: z.ZodNumber;
        /** Frames with fewer confident joints pause, never fail, the hold. */
        minVisibleJoints: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }, {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"body_zone">;
        part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
        mode: z.ZodEnum<["enter", "avoid"]>;
        zones: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            box: z.ZodEffects<z.ZodObject<{
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
        }, "strict", z.ZodTypeAny, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }, {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }>, "many">;
        /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }, {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"squat">;
        repetitions: z.ZodNumber;
        /** Required hip drop as a fraction of the player's own torso length. */
        depthRatio: z.ZodNumber;
        /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
        kneeAngleMaxDeg: z.ZodNumber;
        /** Hold at the bottom before the repetition counts. */
        holdMs: z.ZodNumber;
        /** Minimum time between counted repetitions; rejects bounce double counts. */
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }, {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"pose_match">;
        poses: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            joints: z.ZodArray<z.ZodObject<{
                joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                angleDeg: z.ZodNumber;
                toleranceDeg: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }, {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }>, "many">;
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }, {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }>, "many">;
        /** Fraction of listed joints that must be inside tolerance at once. */
        matchRatio: z.ZodNumber;
        /** "either" also accepts the left/right mirrored pose. */
        mirrorPolicy: z.ZodEnum<["strict", "either"]>;
    }, "strict", z.ZodTypeAny, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }, {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"jump">;
        repetitions: z.ZodNumber;
        /** Required hip rise relative to the player's own torso length. */
        minRiseRatio: z.ZodNumber;
        /** Both feet must be back down and stable for this long to count a landing. */
        landingStableMs: z.ZodNumber;
        cooldownMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }, {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"velocity_hit">;
        count: z.ZodNumber;
        zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
        targetScale: z.ZodNumber;
        limb: z.ZodEnum<["hands", "feet", "any"]>;
        /** On-screen limb speed (normalized units/second) required at contact. */
        minSpeed: z.ZodNumber;
        direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
    }, "strict", z.ZodTypeAny, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }, {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"step">;
        pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
        /** Lateral foot travel required, relative to the player's own torso length. */
        stepRatio: z.ZodNumber;
        /** Settle time on the new stance before the step counts. */
        holdMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }, {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    }>, z.ZodObject<{
        timeBudgetMs: z.ZodNumber;
        successAudioId: z.ZodString;
        encourageAudioId: z.ZodString;
        type: z.ZodLiteral<"sequence">;
        steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>]>, "many">;
        /** Pause allowed between completed steps before the next one arms. */
        interStepGraceMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }, {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    }>]>>;
    learning: z.ZodNullable<z.ZodObject<{
        kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
        payload: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }, {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    }>>;
    artAssetId: z.ZodNullable<z.ZodString>;
    energy: z.ZodEnum<["calm", "medium", "high"]>;
}, "strict", z.ZodTypeAny, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: true;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}, {
    kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
    id: string;
    energy: "calm" | "medium" | "high";
    challenge: {
        type: "touch_targets";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        dwellMs: number;
        limb: "hands" | "feet" | "any";
    } | {
        type: "freeze";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        motionThreshold: number;
        graceMs: number;
        rounds: number;
        minVisibleJoints: number;
    } | {
        type: "body_zone";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        part: "hands" | "feet" | "any" | "head" | "torso";
        mode: "enter" | "avoid";
        zones: {
            id: string;
            box: {
                x0: number;
                y0: number;
                x1: number;
                y1: number;
            };
        }[];
    } | {
        type: "squat";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        depthRatio: number;
        kneeAngleMaxDeg: number;
        cooldownMs: number;
    } | {
        type: "pose_match";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        poses: {
            id: string;
            joints: {
                joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                angleDeg: number;
                toleranceDeg: number;
            }[];
            holdMs: number;
        }[];
        matchRatio: number;
        mirrorPolicy: "strict" | "either";
    } | {
        type: "jump";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        repetitions: number;
        cooldownMs: number;
        minRiseRatio: number;
        landingStableMs: number;
    } | {
        type: "velocity_hit";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        count: number;
        zone: "upper" | "lower" | "full" | "reachable";
        targetScale: number;
        limb: "hands" | "feet" | "any";
        minSpeed: number;
        direction: "any" | "up" | "down" | "left" | "right";
    } | {
        type: "step";
        holdMs: number;
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        pattern: ("left" | "right")[];
        stepRatio: number;
    } | {
        type: "sequence";
        timeBudgetMs: number;
        successAudioId: string;
        encourageAudioId: string;
        steps: ({
            type: "touch_targets";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            pattern: ("left" | "right")[];
            stepRatio: number;
        })[];
        interStepGraceMs: number;
    } | null;
    terminal: true;
    transitions: {
        on: "success" | "partial" | "struggle" | "always";
        to: string;
        adapt: {
            targetScaleMul: number;
            dwellMsMul: number;
            countDelta: number;
            timeBudgetMul: number;
            toleranceMul?: number | undefined;
            holdMsMul?: number | undefined;
            repetitionsDelta?: number | undefined;
            speedMul?: number | undefined;
            motionThresholdMul?: number | undefined;
        } | null;
    }[];
    narration: {
        items: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
            audioAssetId: string | null;
        }[];
        captionDefaultOn: true;
    };
    demo: {
        characterId: string;
        animation: string;
    } | null;
    learning: {
        kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
        payload: string[];
    } | null;
    artAssetId: string | null;
}>]>;
export type Scene = z.infer<typeof SceneSchema>;
export declare const AdaptPolicySchema: z.ZodObject<{
    targetSuccessBand: z.ZodEffects<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, [number, number], [number, number]>;
    maxStruggleStreak: z.ZodNumber;
    maxHighEnergyMs: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    targetSuccessBand: [number, number];
    maxStruggleStreak: number;
    maxHighEnergyMs: number;
}, {
    targetSuccessBand: [number, number];
    maxStruggleStreak: number;
    maxHighEnergyMs: number;
}>;
export type AdaptPolicy = z.infer<typeof AdaptPolicySchema>;
export declare const EngineCompatibilitySchema: z.ZodObject<{
    minimumVersion: z.ZodString;
    maximumVersion: z.ZodNullable<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    minimumVersion: string;
    maximumVersion: string | null;
}, {
    minimumVersion: string;
    maximumVersion: string | null;
}>;
export type EngineCompatibility = z.infer<typeof EngineCompatibilitySchema>;
export declare const CompilerMetadataSchema: z.ZodObject<{
    model: z.ZodString;
    reasoningEffort: z.ZodString;
    generatedAt: z.ZodString;
}, "strict", z.ZodTypeAny, {
    model: string;
    generatedAt: string;
    reasoningEffort: string;
}, {
    model: string;
    generatedAt: string;
    reasoningEffort: string;
}>;
export type CompilerMetadata = z.infer<typeof CompilerMetadataSchema>;
export declare const PlayersSchema: z.ZodEffects<z.ZodObject<{
    min: z.ZodNumber;
    max: z.ZodNumber;
    mode: z.ZodEnum<["solo", "coop", "versus"]>;
}, "strict", z.ZodTypeAny, {
    min: number;
    max: number;
    mode: "solo" | "coop" | "versus";
}, {
    min: number;
    max: number;
    mode: "solo" | "coop" | "versus";
}>, {
    min: number;
    max: number;
    mode: "solo" | "coop" | "versus";
}, {
    min: number;
    max: number;
    mode: "solo" | "coop" | "versus";
}>;
export type Players = z.infer<typeof PlayersSchema>;
export declare const EpisodePackBaseSchema: z.ZodObject<{
    schemaVersion: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>]>;
    meta: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }>, "many">;
        summary: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }>, "many">;
        theme: z.ZodString;
        locales: z.ZodArray<z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>, "many">;
        ageBands: z.ZodArray<z.ZodEnum<["2-3", "4-5", "6-7", "8+"]>, "many">;
        estMinutes: z.ZodNumber;
        engine: z.ZodObject<{
            minimumVersion: z.ZodString;
            maximumVersion: z.ZodNullable<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            minimumVersion: string;
            maximumVersion: string | null;
        }, {
            minimumVersion: string;
            maximumVersion: string | null;
        }>;
        compiler: z.ZodNullable<z.ZodObject<{
            model: z.ZodString;
            reasoningEffort: z.ZodString;
            generatedAt: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        }, {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        }>>;
        /** schemaVersion 2 only. Absent means one player. */
        players: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            mode: z.ZodEnum<["solo", "coop", "versus"]>;
        }, "strict", z.ZodTypeAny, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }>, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    }, {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    }>;
    permissions: z.ZodObject<{
        camera: z.ZodBoolean;
        deviceLocalStorage: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        camera: boolean;
        deviceLocalStorage: boolean;
    }, {
        camera: boolean;
        deviceLocalStorage: boolean;
    }>;
    cast: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }>, "many">;
        artAssetId: z.ZodNullable<z.ZodString>;
        description: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }, {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }>, "many">;
    entrySceneId: z.ZodString;
    scenes: z.ZodArray<z.ZodDiscriminatedUnion<"terminal", [z.ZodObject<{
        terminal: z.ZodLiteral<false>;
        transitions: z.ZodArray<z.ZodObject<{
            on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
            to: z.ZodString;
            adapt: z.ZodNullable<z.ZodObject<{
                targetScaleMul: z.ZodNumber;
                dwellMsMul: z.ZodNumber;
                countDelta: z.ZodNumber;
                timeBudgetMul: z.ZodNumber;
                /**
                 * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
                 * existing v1 pack valid byte-for-byte.
                 */
                toleranceMul: z.ZodOptional<z.ZodNumber>;
                holdMsMul: z.ZodOptional<z.ZodNumber>;
                repetitionsDelta: z.ZodOptional<z.ZodNumber>;
                speedMul: z.ZodOptional<z.ZodNumber>;
                motionThresholdMul: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }>, "many">;
        id: z.ZodString;
        kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
        narration: z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
                text: z.ZodString;
                audioAssetId: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }>, "many">;
            captionDefaultOn: z.ZodLiteral<true>;
        }, "strict", z.ZodTypeAny, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }>;
        demo: z.ZodNullable<z.ZodObject<{
            characterId: z.ZodString;
            animation: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            characterId: string;
            animation: string;
        }, {
            characterId: string;
            animation: string;
        }>>;
        challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"sequence">;
            steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"touch_targets">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                dwellMs: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
            }, "strict", z.ZodTypeAny, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"freeze">;
                /** How long the whole body must stay under motionThreshold. */
                holdMs: z.ZodNumber;
                /** Mean landmark motion (normalized units/second) treated as "still". */
                motionThreshold: z.ZodNumber;
                /** Motion spikes shorter than this do not reset the hold. */
                graceMs: z.ZodNumber;
                rounds: z.ZodNumber;
                /** Frames with fewer confident joints pause, never fail, the hold. */
                minVisibleJoints: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"body_zone">;
                part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
                mode: z.ZodEnum<["enter", "avoid"]>;
                zones: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    box: z.ZodEffects<z.ZodObject<{
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
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }>, "many">;
                /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }>, z.ZodObject<{
                type: z.ZodLiteral<"squat">;
                repetitions: z.ZodNumber;
                /** Required hip drop as a fraction of the player's own torso length. */
                depthRatio: z.ZodNumber;
                /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
                kneeAngleMaxDeg: z.ZodNumber;
                /** Hold at the bottom before the repetition counts. */
                holdMs: z.ZodNumber;
                /** Minimum time between counted repetitions; rejects bounce double counts. */
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"pose_match">;
                poses: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    joints: z.ZodArray<z.ZodObject<{
                        joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                        angleDeg: z.ZodNumber;
                        toleranceDeg: z.ZodNumber;
                    }, "strict", z.ZodTypeAny, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }>, "many">;
                    holdMs: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }>, "many">;
                /** Fraction of listed joints that must be inside tolerance at once. */
                matchRatio: z.ZodNumber;
                /** "either" also accepts the left/right mirrored pose. */
                mirrorPolicy: z.ZodEnum<["strict", "either"]>;
            }, "strict", z.ZodTypeAny, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"jump">;
                repetitions: z.ZodNumber;
                /** Required hip rise relative to the player's own torso length. */
                minRiseRatio: z.ZodNumber;
                /** Both feet must be back down and stable for this long to count a landing. */
                landingStableMs: z.ZodNumber;
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"velocity_hit">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
                /** On-screen limb speed (normalized units/second) required at contact. */
                minSpeed: z.ZodNumber;
                direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
            }, "strict", z.ZodTypeAny, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"step">;
                pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
                /** Lateral foot travel required, relative to the player's own torso length. */
                stepRatio: z.ZodNumber;
                /** Settle time on the new stance before the step counts. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }>]>, "many">;
            /** Pause allowed between completed steps before the next one arms. */
            interStepGraceMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }>]>>;
        learning: z.ZodNullable<z.ZodObject<{
            kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
            payload: z.ZodArray<z.ZodString, "many">;
        }, "strict", z.ZodTypeAny, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }>>;
        artAssetId: z.ZodNullable<z.ZodString>;
        energy: z.ZodEnum<["calm", "medium", "high"]>;
    }, "strict", z.ZodTypeAny, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }>, z.ZodObject<{
        terminal: z.ZodLiteral<true>;
        transitions: z.ZodArray<z.ZodObject<{
            on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
            to: z.ZodString;
            adapt: z.ZodNullable<z.ZodObject<{
                targetScaleMul: z.ZodNumber;
                dwellMsMul: z.ZodNumber;
                countDelta: z.ZodNumber;
                timeBudgetMul: z.ZodNumber;
                /**
                 * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
                 * existing v1 pack valid byte-for-byte.
                 */
                toleranceMul: z.ZodOptional<z.ZodNumber>;
                holdMsMul: z.ZodOptional<z.ZodNumber>;
                repetitionsDelta: z.ZodOptional<z.ZodNumber>;
                speedMul: z.ZodOptional<z.ZodNumber>;
                motionThresholdMul: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }>, "many">;
        id: z.ZodString;
        kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
        narration: z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
                text: z.ZodString;
                audioAssetId: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }>, "many">;
            captionDefaultOn: z.ZodLiteral<true>;
        }, "strict", z.ZodTypeAny, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }>;
        demo: z.ZodNullable<z.ZodObject<{
            characterId: z.ZodString;
            animation: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            characterId: string;
            animation: string;
        }, {
            characterId: string;
            animation: string;
        }>>;
        challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"sequence">;
            steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"touch_targets">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                dwellMs: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
            }, "strict", z.ZodTypeAny, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"freeze">;
                /** How long the whole body must stay under motionThreshold. */
                holdMs: z.ZodNumber;
                /** Mean landmark motion (normalized units/second) treated as "still". */
                motionThreshold: z.ZodNumber;
                /** Motion spikes shorter than this do not reset the hold. */
                graceMs: z.ZodNumber;
                rounds: z.ZodNumber;
                /** Frames with fewer confident joints pause, never fail, the hold. */
                minVisibleJoints: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"body_zone">;
                part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
                mode: z.ZodEnum<["enter", "avoid"]>;
                zones: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    box: z.ZodEffects<z.ZodObject<{
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
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }>, "many">;
                /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }>, z.ZodObject<{
                type: z.ZodLiteral<"squat">;
                repetitions: z.ZodNumber;
                /** Required hip drop as a fraction of the player's own torso length. */
                depthRatio: z.ZodNumber;
                /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
                kneeAngleMaxDeg: z.ZodNumber;
                /** Hold at the bottom before the repetition counts. */
                holdMs: z.ZodNumber;
                /** Minimum time between counted repetitions; rejects bounce double counts. */
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"pose_match">;
                poses: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    joints: z.ZodArray<z.ZodObject<{
                        joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                        angleDeg: z.ZodNumber;
                        toleranceDeg: z.ZodNumber;
                    }, "strict", z.ZodTypeAny, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }>, "many">;
                    holdMs: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }>, "many">;
                /** Fraction of listed joints that must be inside tolerance at once. */
                matchRatio: z.ZodNumber;
                /** "either" also accepts the left/right mirrored pose. */
                mirrorPolicy: z.ZodEnum<["strict", "either"]>;
            }, "strict", z.ZodTypeAny, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"jump">;
                repetitions: z.ZodNumber;
                /** Required hip rise relative to the player's own torso length. */
                minRiseRatio: z.ZodNumber;
                /** Both feet must be back down and stable for this long to count a landing. */
                landingStableMs: z.ZodNumber;
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"velocity_hit">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
                /** On-screen limb speed (normalized units/second) required at contact. */
                minSpeed: z.ZodNumber;
                direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
            }, "strict", z.ZodTypeAny, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"step">;
                pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
                /** Lateral foot travel required, relative to the player's own torso length. */
                stepRatio: z.ZodNumber;
                /** Settle time on the new stance before the step counts. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }>]>, "many">;
            /** Pause allowed between completed steps before the next one arms. */
            interStepGraceMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }>]>>;
        learning: z.ZodNullable<z.ZodObject<{
            kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
            payload: z.ZodArray<z.ZodString, "many">;
        }, "strict", z.ZodTypeAny, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }>>;
        artAssetId: z.ZodNullable<z.ZodString>;
        energy: z.ZodEnum<["calm", "medium", "high"]>;
    }, "strict", z.ZodTypeAny, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }>]>, "many">;
    adaptPolicy: z.ZodObject<{
        targetSuccessBand: z.ZodEffects<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, [number, number], [number, number]>;
        maxStruggleStreak: z.ZodNumber;
        maxHighEnergyMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    }, {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    }>;
    assets: z.ZodObject<{
        images: z.ZodArray<z.ZodObject<{
            license: z.ZodObject<{
                spdxId: z.ZodString;
                name: z.ZodString;
                url: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
                attribution: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }>;
            provenance: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"original">;
                creator: z.ZodString;
                createdAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "original";
                creator: string;
                createdAt: string;
            }, {
                kind: "original";
                creator: string;
                createdAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"generated">;
                tool: z.ZodString;
                model: z.ZodString;
                prompt: z.ZodString;
                generatedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"third-party">;
                creator: z.ZodString;
                sourceUrl: z.ZodEffects<z.ZodString, string, string>;
                retrievedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }>]>;
            id: z.ZodString;
            path: z.ZodEffects<z.ZodString, string, string>;
            mediaType: z.ZodEnum<["image/png", "image/jpeg", "image/webp", "image/avif"]>;
            alt: z.ZodArray<z.ZodObject<{
                locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
                text: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }, {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }>, "many">;
        audio: z.ZodArray<z.ZodObject<{
            license: z.ZodObject<{
                spdxId: z.ZodString;
                name: z.ZodString;
                url: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
                attribution: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }>;
            provenance: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"original">;
                creator: z.ZodString;
                createdAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "original";
                creator: string;
                createdAt: string;
            }, {
                kind: "original";
                creator: string;
                createdAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"generated">;
                tool: z.ZodString;
                model: z.ZodString;
                prompt: z.ZodString;
                generatedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"third-party">;
                creator: z.ZodString;
                sourceUrl: z.ZodEffects<z.ZodString, string, string>;
                retrievedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }>]>;
            id: z.ZodString;
            path: z.ZodEffects<z.ZodString, string, string>;
            mediaType: z.ZodEnum<["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp4"]>;
            locale: z.ZodNullable<z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>>;
            transcript: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }, {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }>, "many">;
        music: z.ZodArray<z.ZodObject<{
            license: z.ZodObject<{
                spdxId: z.ZodString;
                name: z.ZodString;
                url: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
                attribution: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }>;
            provenance: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"original">;
                creator: z.ZodString;
                createdAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "original";
                creator: string;
                createdAt: string;
            }, {
                kind: "original";
                creator: string;
                createdAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"generated">;
                tool: z.ZodString;
                model: z.ZodString;
                prompt: z.ZodString;
                generatedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"third-party">;
                creator: z.ZodString;
                sourceUrl: z.ZodEffects<z.ZodString, string, string>;
                retrievedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }>]>;
            id: z.ZodString;
            generator: z.ZodLiteral<"tone.js">;
            seed: z.ZodNumber;
            mood: z.ZodEnum<["adventure", "calm", "silly", "victory"]>;
        }, "strict", z.ZodTypeAny, {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }, {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    }, {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    }>;
}, "strict", z.ZodTypeAny, {
    schemaVersion: 1 | 2;
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
    meta: {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    };
    cast: {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }[];
    entrySceneId: string;
    scenes: ({
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    } | {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    })[];
    adaptPolicy: {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    };
    assets: {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    };
}, {
    schemaVersion: 1 | 2;
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
    meta: {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    };
    cast: {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }[];
    entrySceneId: string;
    scenes: ({
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    } | {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    })[];
    adaptPolicy: {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    };
    assets: {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    };
}>;
export type EpisodePack = z.infer<typeof EpisodePackBaseSchema>;
export type IntegrityIssueCode = "duplicate_id" | "missing_reference" | "wrong_asset_type" | "duplicate_outcome" | "invalid_transition" | "unreachable_scene" | "terminal_unreachable" | "locale_mismatch" | "invalid_scene" | "missing_outcome" | "provenance_mismatch" | "schema_version" | "engine_compatibility";
export interface IntegrityIssue {
    code: IntegrityIssueCode;
    path: Array<string | number>;
    message: string;
}
/** Pure semantic validation for a structurally parsed pack. */
export declare function validateEpisodePackIntegrity(pack: EpisodePack): IntegrityIssue[];
export declare const EpisodePackSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>]>;
    meta: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }>, "many">;
        summary: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }>, "many">;
        theme: z.ZodString;
        locales: z.ZodArray<z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>, "many">;
        ageBands: z.ZodArray<z.ZodEnum<["2-3", "4-5", "6-7", "8+"]>, "many">;
        estMinutes: z.ZodNumber;
        engine: z.ZodObject<{
            minimumVersion: z.ZodString;
            maximumVersion: z.ZodNullable<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            minimumVersion: string;
            maximumVersion: string | null;
        }, {
            minimumVersion: string;
            maximumVersion: string | null;
        }>;
        compiler: z.ZodNullable<z.ZodObject<{
            model: z.ZodString;
            reasoningEffort: z.ZodString;
            generatedAt: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        }, {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        }>>;
        /** schemaVersion 2 only. Absent means one player. */
        players: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            mode: z.ZodEnum<["solo", "coop", "versus"]>;
        }, "strict", z.ZodTypeAny, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }>, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }, {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        }>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    }, {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    }>;
    permissions: z.ZodObject<{
        camera: z.ZodBoolean;
        deviceLocalStorage: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        camera: boolean;
        deviceLocalStorage: boolean;
    }, {
        camera: boolean;
        deviceLocalStorage: boolean;
    }>;
    cast: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
            text: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }, {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }>, "many">;
        artAssetId: z.ZodNullable<z.ZodString>;
        description: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }, {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }>, "many">;
    entrySceneId: z.ZodString;
    scenes: z.ZodArray<z.ZodDiscriminatedUnion<"terminal", [z.ZodObject<{
        terminal: z.ZodLiteral<false>;
        transitions: z.ZodArray<z.ZodObject<{
            on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
            to: z.ZodString;
            adapt: z.ZodNullable<z.ZodObject<{
                targetScaleMul: z.ZodNumber;
                dwellMsMul: z.ZodNumber;
                countDelta: z.ZodNumber;
                timeBudgetMul: z.ZodNumber;
                /**
                 * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
                 * existing v1 pack valid byte-for-byte.
                 */
                toleranceMul: z.ZodOptional<z.ZodNumber>;
                holdMsMul: z.ZodOptional<z.ZodNumber>;
                repetitionsDelta: z.ZodOptional<z.ZodNumber>;
                speedMul: z.ZodOptional<z.ZodNumber>;
                motionThresholdMul: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }>, "many">;
        id: z.ZodString;
        kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
        narration: z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
                text: z.ZodString;
                audioAssetId: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }>, "many">;
            captionDefaultOn: z.ZodLiteral<true>;
        }, "strict", z.ZodTypeAny, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }>;
        demo: z.ZodNullable<z.ZodObject<{
            characterId: z.ZodString;
            animation: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            characterId: string;
            animation: string;
        }, {
            characterId: string;
            animation: string;
        }>>;
        challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"sequence">;
            steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"touch_targets">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                dwellMs: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
            }, "strict", z.ZodTypeAny, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"freeze">;
                /** How long the whole body must stay under motionThreshold. */
                holdMs: z.ZodNumber;
                /** Mean landmark motion (normalized units/second) treated as "still". */
                motionThreshold: z.ZodNumber;
                /** Motion spikes shorter than this do not reset the hold. */
                graceMs: z.ZodNumber;
                rounds: z.ZodNumber;
                /** Frames with fewer confident joints pause, never fail, the hold. */
                minVisibleJoints: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"body_zone">;
                part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
                mode: z.ZodEnum<["enter", "avoid"]>;
                zones: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    box: z.ZodEffects<z.ZodObject<{
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
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }>, "many">;
                /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }>, z.ZodObject<{
                type: z.ZodLiteral<"squat">;
                repetitions: z.ZodNumber;
                /** Required hip drop as a fraction of the player's own torso length. */
                depthRatio: z.ZodNumber;
                /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
                kneeAngleMaxDeg: z.ZodNumber;
                /** Hold at the bottom before the repetition counts. */
                holdMs: z.ZodNumber;
                /** Minimum time between counted repetitions; rejects bounce double counts. */
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"pose_match">;
                poses: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    joints: z.ZodArray<z.ZodObject<{
                        joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                        angleDeg: z.ZodNumber;
                        toleranceDeg: z.ZodNumber;
                    }, "strict", z.ZodTypeAny, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }>, "many">;
                    holdMs: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }>, "many">;
                /** Fraction of listed joints that must be inside tolerance at once. */
                matchRatio: z.ZodNumber;
                /** "either" also accepts the left/right mirrored pose. */
                mirrorPolicy: z.ZodEnum<["strict", "either"]>;
            }, "strict", z.ZodTypeAny, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"jump">;
                repetitions: z.ZodNumber;
                /** Required hip rise relative to the player's own torso length. */
                minRiseRatio: z.ZodNumber;
                /** Both feet must be back down and stable for this long to count a landing. */
                landingStableMs: z.ZodNumber;
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"velocity_hit">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
                /** On-screen limb speed (normalized units/second) required at contact. */
                minSpeed: z.ZodNumber;
                direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
            }, "strict", z.ZodTypeAny, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"step">;
                pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
                /** Lateral foot travel required, relative to the player's own torso length. */
                stepRatio: z.ZodNumber;
                /** Settle time on the new stance before the step counts. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }>]>, "many">;
            /** Pause allowed between completed steps before the next one arms. */
            interStepGraceMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }>]>>;
        learning: z.ZodNullable<z.ZodObject<{
            kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
            payload: z.ZodArray<z.ZodString, "many">;
        }, "strict", z.ZodTypeAny, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }>>;
        artAssetId: z.ZodNullable<z.ZodString>;
        energy: z.ZodEnum<["calm", "medium", "high"]>;
    }, "strict", z.ZodTypeAny, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }>, z.ZodObject<{
        terminal: z.ZodLiteral<true>;
        transitions: z.ZodArray<z.ZodObject<{
            on: z.ZodUnion<[z.ZodEnum<["success", "partial", "struggle"]>, z.ZodLiteral<"always">]>;
            to: z.ZodString;
            adapt: z.ZodNullable<z.ZodObject<{
                targetScaleMul: z.ZodNumber;
                dwellMsMul: z.ZodNumber;
                countDelta: z.ZodNumber;
                timeBudgetMul: z.ZodNumber;
                /**
                 * schemaVersion 2 adaptation for motion primitives. Optional keys keep every
                 * existing v1 pack valid byte-for-byte.
                 */
                toleranceMul: z.ZodOptional<z.ZodNumber>;
                holdMsMul: z.ZodOptional<z.ZodNumber>;
                repetitionsDelta: z.ZodOptional<z.ZodNumber>;
                speedMul: z.ZodOptional<z.ZodNumber>;
                motionThresholdMul: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }, {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }, {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }>, "many">;
        id: z.ZodString;
        kind: z.ZodEnum<["story", "calibration-check", "challenge", "rest", "celebration"]>;
        narration: z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
                text: z.ZodString;
                audioAssetId: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }>, "many">;
            captionDefaultOn: z.ZodLiteral<true>;
        }, "strict", z.ZodTypeAny, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }, {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        }>;
        demo: z.ZodNullable<z.ZodObject<{
            characterId: z.ZodString;
            animation: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            characterId: string;
            animation: string;
        }, {
            characterId: string;
            animation: string;
        }>>;
        challenge: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"touch_targets">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            dwellMs: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
        }, "strict", z.ZodTypeAny, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }, {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"freeze">;
            /** How long the whole body must stay under motionThreshold. */
            holdMs: z.ZodNumber;
            /** Mean landmark motion (normalized units/second) treated as "still". */
            motionThreshold: z.ZodNumber;
            /** Motion spikes shorter than this do not reset the hold. */
            graceMs: z.ZodNumber;
            rounds: z.ZodNumber;
            /** Frames with fewer confident joints pause, never fail, the hold. */
            minVisibleJoints: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }, {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"body_zone">;
            part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
            mode: z.ZodEnum<["enter", "avoid"]>;
            zones: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                box: z.ZodEffects<z.ZodObject<{
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
            }, "strict", z.ZodTypeAny, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }, {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }>, "many">;
            /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }, {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"squat">;
            repetitions: z.ZodNumber;
            /** Required hip drop as a fraction of the player's own torso length. */
            depthRatio: z.ZodNumber;
            /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
            kneeAngleMaxDeg: z.ZodNumber;
            /** Hold at the bottom before the repetition counts. */
            holdMs: z.ZodNumber;
            /** Minimum time between counted repetitions; rejects bounce double counts. */
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }, {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"pose_match">;
            poses: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                joints: z.ZodArray<z.ZodObject<{
                    joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                    angleDeg: z.ZodNumber;
                    toleranceDeg: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }, {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }>, "many">;
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }, {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }>, "many">;
            /** Fraction of listed joints that must be inside tolerance at once. */
            matchRatio: z.ZodNumber;
            /** "either" also accepts the left/right mirrored pose. */
            mirrorPolicy: z.ZodEnum<["strict", "either"]>;
        }, "strict", z.ZodTypeAny, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }, {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"jump">;
            repetitions: z.ZodNumber;
            /** Required hip rise relative to the player's own torso length. */
            minRiseRatio: z.ZodNumber;
            /** Both feet must be back down and stable for this long to count a landing. */
            landingStableMs: z.ZodNumber;
            cooldownMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }, {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"velocity_hit">;
            count: z.ZodNumber;
            zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
            targetScale: z.ZodNumber;
            limb: z.ZodEnum<["hands", "feet", "any"]>;
            /** On-screen limb speed (normalized units/second) required at contact. */
            minSpeed: z.ZodNumber;
            direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
        }, "strict", z.ZodTypeAny, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }, {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"step">;
            pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
            /** Lateral foot travel required, relative to the player's own torso length. */
            stepRatio: z.ZodNumber;
            /** Settle time on the new stance before the step counts. */
            holdMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }, {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        }>, z.ZodObject<{
            timeBudgetMs: z.ZodNumber;
            successAudioId: z.ZodString;
            encourageAudioId: z.ZodString;
            type: z.ZodLiteral<"sequence">;
            steps: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"touch_targets">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                dwellMs: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
            }, "strict", z.ZodTypeAny, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }, {
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"freeze">;
                /** How long the whole body must stay under motionThreshold. */
                holdMs: z.ZodNumber;
                /** Mean landmark motion (normalized units/second) treated as "still". */
                motionThreshold: z.ZodNumber;
                /** Motion spikes shorter than this do not reset the hold. */
                graceMs: z.ZodNumber;
                rounds: z.ZodNumber;
                /** Frames with fewer confident joints pause, never fail, the hold. */
                minVisibleJoints: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }, {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"body_zone">;
                part: z.ZodEnum<["head", "hands", "feet", "torso", "any"]>;
                mode: z.ZodEnum<["enter", "avoid"]>;
                zones: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    box: z.ZodEffects<z.ZodObject<{
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
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }, {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }>, "many">;
                /** Time the part must stay inside (enter) or outside (avoid) the active zone. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }, {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            }>, z.ZodObject<{
                type: z.ZodLiteral<"squat">;
                repetitions: z.ZodNumber;
                /** Required hip drop as a fraction of the player's own torso length. */
                depthRatio: z.ZodNumber;
                /** Knee angle (degrees, straight = 180) that must be reached at the bottom. */
                kneeAngleMaxDeg: z.ZodNumber;
                /** Hold at the bottom before the repetition counts. */
                holdMs: z.ZodNumber;
                /** Minimum time between counted repetitions; rejects bounce double counts. */
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }, {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"pose_match">;
                poses: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    joints: z.ZodArray<z.ZodObject<{
                        joint: z.ZodEnum<["left_elbow", "right_elbow", "left_knee", "right_knee", "left_shoulder", "right_shoulder", "left_hip", "right_hip"]>;
                        angleDeg: z.ZodNumber;
                        toleranceDeg: z.ZodNumber;
                    }, "strict", z.ZodTypeAny, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }, {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }>, "many">;
                    holdMs: z.ZodNumber;
                }, "strict", z.ZodTypeAny, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }, {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }>, "many">;
                /** Fraction of listed joints that must be inside tolerance at once. */
                matchRatio: z.ZodNumber;
                /** "either" also accepts the left/right mirrored pose. */
                mirrorPolicy: z.ZodEnum<["strict", "either"]>;
            }, "strict", z.ZodTypeAny, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }, {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"jump">;
                repetitions: z.ZodNumber;
                /** Required hip rise relative to the player's own torso length. */
                minRiseRatio: z.ZodNumber;
                /** Both feet must be back down and stable for this long to count a landing. */
                landingStableMs: z.ZodNumber;
                cooldownMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }, {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"velocity_hit">;
                count: z.ZodNumber;
                zone: z.ZodEnum<["upper", "lower", "full", "reachable"]>;
                targetScale: z.ZodNumber;
                limb: z.ZodEnum<["hands", "feet", "any"]>;
                /** On-screen limb speed (normalized units/second) required at contact. */
                minSpeed: z.ZodNumber;
                direction: z.ZodEnum<["any", "up", "down", "left", "right"]>;
            }, "strict", z.ZodTypeAny, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }, {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"step">;
                pattern: z.ZodArray<z.ZodEnum<["left", "right"]>, "many">;
                /** Lateral foot travel required, relative to the player's own torso length. */
                stepRatio: z.ZodNumber;
                /** Settle time on the new stance before the step counts. */
                holdMs: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }, {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            }>]>, "many">;
            /** Pause allowed between completed steps before the next one arms. */
            interStepGraceMs: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }, {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        }>]>>;
        learning: z.ZodNullable<z.ZodObject<{
            kind: z.ZodEnum<["counting", "colors", "letters", "body-parts", "directions", "animals", "none"]>;
            payload: z.ZodArray<z.ZodString, "many">;
        }, "strict", z.ZodTypeAny, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }, {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        }>>;
        artAssetId: z.ZodNullable<z.ZodString>;
        energy: z.ZodEnum<["calm", "medium", "high"]>;
    }, "strict", z.ZodTypeAny, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }, {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    }>]>, "many">;
    adaptPolicy: z.ZodObject<{
        targetSuccessBand: z.ZodEffects<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, [number, number], [number, number]>;
        maxStruggleStreak: z.ZodNumber;
        maxHighEnergyMs: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    }, {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    }>;
    assets: z.ZodObject<{
        images: z.ZodArray<z.ZodObject<{
            license: z.ZodObject<{
                spdxId: z.ZodString;
                name: z.ZodString;
                url: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
                attribution: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }>;
            provenance: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"original">;
                creator: z.ZodString;
                createdAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "original";
                creator: string;
                createdAt: string;
            }, {
                kind: "original";
                creator: string;
                createdAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"generated">;
                tool: z.ZodString;
                model: z.ZodString;
                prompt: z.ZodString;
                generatedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"third-party">;
                creator: z.ZodString;
                sourceUrl: z.ZodEffects<z.ZodString, string, string>;
                retrievedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }>]>;
            id: z.ZodString;
            path: z.ZodEffects<z.ZodString, string, string>;
            mediaType: z.ZodEnum<["image/png", "image/jpeg", "image/webp", "image/avif"]>;
            alt: z.ZodArray<z.ZodObject<{
                locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
                text: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }, {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }, {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }>, "many">;
        audio: z.ZodArray<z.ZodObject<{
            license: z.ZodObject<{
                spdxId: z.ZodString;
                name: z.ZodString;
                url: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
                attribution: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }>;
            provenance: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"original">;
                creator: z.ZodString;
                createdAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "original";
                creator: string;
                createdAt: string;
            }, {
                kind: "original";
                creator: string;
                createdAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"generated">;
                tool: z.ZodString;
                model: z.ZodString;
                prompt: z.ZodString;
                generatedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"third-party">;
                creator: z.ZodString;
                sourceUrl: z.ZodEffects<z.ZodString, string, string>;
                retrievedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }>]>;
            id: z.ZodString;
            path: z.ZodEffects<z.ZodString, string, string>;
            mediaType: z.ZodEnum<["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp4"]>;
            locale: z.ZodNullable<z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>>;
            transcript: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }, {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }>, "many">;
        music: z.ZodArray<z.ZodObject<{
            license: z.ZodObject<{
                spdxId: z.ZodString;
                name: z.ZodString;
                url: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
                attribution: z.ZodNullable<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }, {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            }>;
            provenance: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
                kind: z.ZodLiteral<"original">;
                creator: z.ZodString;
                createdAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "original";
                creator: string;
                createdAt: string;
            }, {
                kind: "original";
                creator: string;
                createdAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"generated">;
                tool: z.ZodString;
                model: z.ZodString;
                prompt: z.ZodString;
                generatedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }, {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"third-party">;
                creator: z.ZodString;
                sourceUrl: z.ZodEffects<z.ZodString, string, string>;
                retrievedAt: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }, {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            }>]>;
            id: z.ZodString;
            generator: z.ZodLiteral<"tone.js">;
            seed: z.ZodNumber;
            mood: z.ZodEnum<["adventure", "calm", "silly", "victory"]>;
        }, "strict", z.ZodTypeAny, {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }, {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    }, {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    }>;
}, "strict", z.ZodTypeAny, {
    schemaVersion: 1 | 2;
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
    meta: {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    };
    cast: {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }[];
    entrySceneId: string;
    scenes: ({
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    } | {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    })[];
    adaptPolicy: {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    };
    assets: {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    };
}, {
    schemaVersion: 1 | 2;
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
    meta: {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    };
    cast: {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }[];
    entrySceneId: string;
    scenes: ({
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    } | {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    })[];
    adaptPolicy: {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    };
    assets: {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    };
}>, {
    schemaVersion: 1 | 2;
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
    meta: {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    };
    cast: {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }[];
    entrySceneId: string;
    scenes: ({
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    } | {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    })[];
    adaptPolicy: {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    };
    assets: {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    };
}, {
    schemaVersion: 1 | 2;
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
    meta: {
        id: string;
        title: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        summary: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
        theme: string;
        ageBands: ("2-3" | "4-5" | "6-7" | "8+")[];
        estMinutes: number;
        engine: {
            minimumVersion: string;
            maximumVersion: string | null;
        };
        compiler: {
            model: string;
            generatedAt: string;
            reasoningEffort: string;
        } | null;
        players?: {
            min: number;
            max: number;
            mode: "solo" | "coop" | "versus";
        } | undefined;
    };
    cast: {
        name: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
        id: string;
        artAssetId: string | null;
        description: string;
    }[];
    entrySceneId: string;
    scenes: ({
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: false;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    } | {
        kind: "story" | "calibration-check" | "challenge" | "rest" | "celebration";
        id: string;
        energy: "calm" | "medium" | "high";
        challenge: {
            type: "touch_targets";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            dwellMs: number;
            limb: "hands" | "feet" | "any";
        } | {
            type: "freeze";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            motionThreshold: number;
            graceMs: number;
            rounds: number;
            minVisibleJoints: number;
        } | {
            type: "body_zone";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            part: "hands" | "feet" | "any" | "head" | "torso";
            mode: "enter" | "avoid";
            zones: {
                id: string;
                box: {
                    x0: number;
                    y0: number;
                    x1: number;
                    y1: number;
                };
            }[];
        } | {
            type: "squat";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            depthRatio: number;
            kneeAngleMaxDeg: number;
            cooldownMs: number;
        } | {
            type: "pose_match";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            poses: {
                id: string;
                joints: {
                    joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                    angleDeg: number;
                    toleranceDeg: number;
                }[];
                holdMs: number;
            }[];
            matchRatio: number;
            mirrorPolicy: "strict" | "either";
        } | {
            type: "jump";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            repetitions: number;
            cooldownMs: number;
            minRiseRatio: number;
            landingStableMs: number;
        } | {
            type: "velocity_hit";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            count: number;
            zone: "upper" | "lower" | "full" | "reachable";
            targetScale: number;
            limb: "hands" | "feet" | "any";
            minSpeed: number;
            direction: "any" | "up" | "down" | "left" | "right";
        } | {
            type: "step";
            holdMs: number;
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            pattern: ("left" | "right")[];
            stepRatio: number;
        } | {
            type: "sequence";
            timeBudgetMs: number;
            successAudioId: string;
            encourageAudioId: string;
            steps: ({
                type: "touch_targets";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                dwellMs: number;
                limb: "hands" | "feet" | "any";
            } | {
                type: "freeze";
                holdMs: number;
                motionThreshold: number;
                graceMs: number;
                rounds: number;
                minVisibleJoints: number;
            } | {
                type: "body_zone";
                holdMs: number;
                part: "hands" | "feet" | "any" | "head" | "torso";
                mode: "enter" | "avoid";
                zones: {
                    id: string;
                    box: {
                        x0: number;
                        y0: number;
                        x1: number;
                        y1: number;
                    };
                }[];
            } | {
                type: "squat";
                holdMs: number;
                repetitions: number;
                depthRatio: number;
                kneeAngleMaxDeg: number;
                cooldownMs: number;
            } | {
                type: "pose_match";
                poses: {
                    id: string;
                    joints: {
                        joint: "left_elbow" | "right_elbow" | "left_knee" | "right_knee" | "left_shoulder" | "right_shoulder" | "left_hip" | "right_hip";
                        angleDeg: number;
                        toleranceDeg: number;
                    }[];
                    holdMs: number;
                }[];
                matchRatio: number;
                mirrorPolicy: "strict" | "either";
            } | {
                type: "jump";
                repetitions: number;
                cooldownMs: number;
                minRiseRatio: number;
                landingStableMs: number;
            } | {
                type: "velocity_hit";
                count: number;
                zone: "upper" | "lower" | "full" | "reachable";
                targetScale: number;
                limb: "hands" | "feet" | "any";
                minSpeed: number;
                direction: "any" | "up" | "down" | "left" | "right";
            } | {
                type: "step";
                holdMs: number;
                pattern: ("left" | "right")[];
                stepRatio: number;
            })[];
            interStepGraceMs: number;
        } | null;
        terminal: true;
        transitions: {
            on: "success" | "partial" | "struggle" | "always";
            to: string;
            adapt: {
                targetScaleMul: number;
                dwellMsMul: number;
                countDelta: number;
                timeBudgetMul: number;
                toleranceMul?: number | undefined;
                holdMsMul?: number | undefined;
                repetitionsDelta?: number | undefined;
                speedMul?: number | undefined;
                motionThresholdMul?: number | undefined;
            } | null;
        }[];
        narration: {
            items: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
                audioAssetId: string | null;
            }[];
            captionDefaultOn: true;
        };
        demo: {
            characterId: string;
            animation: string;
        } | null;
        learning: {
            kind: "counting" | "colors" | "letters" | "body-parts" | "directions" | "animals" | "none";
            payload: string[];
        } | null;
        artAssetId: string | null;
    })[];
    adaptPolicy: {
        targetSuccessBand: [number, number];
        maxStruggleStreak: number;
        maxHighEnergyMs: number;
    };
    assets: {
        images: {
            path: string;
            id: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
        }[];
        audio: {
            path: string;
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar" | null;
            id: string;
            mediaType: "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/mp4";
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            transcript: string;
        }[];
        music: {
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            provenance: {
                kind: "original";
                creator: string;
                createdAt: string;
            } | {
                kind: "generated";
                tool: string;
                model: string;
                prompt: string;
                generatedAt: string;
            } | {
                kind: "third-party";
                creator: string;
                sourceUrl: string;
                retrievedAt: string;
            };
            generator: "tone.js";
            seed: number;
            mood: "adventure" | "calm" | "silly" | "victory";
        }[];
    };
}>;
//# sourceMappingURL=episode.d.ts.map