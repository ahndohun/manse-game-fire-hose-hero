import { type Catalog, type CatalogSnapshot } from "./catalog.js";
import { type EpisodePack } from "./episode.js";
import { type ManseGameManifest } from "./manifest.js";
import { type PlayerProfile, type SessionStats } from "./profile.js";
import { type PackProvenance } from "./provenance.js";
export declare function parseGameManifest(input: unknown): ManseGameManifest;
export declare function safeParseGameManifest(input: unknown): import("zod").SafeParseReturnType<{
    creator: string;
    sourceUrl: string;
    id: string;
    license: {
        spdxId: string;
        name: string;
        url: string | null;
        attribution: string | null;
    };
    schemaVersion: 1;
    slug: string;
    title: {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
    }[];
    summary: {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
    }[];
    energy: "gentle" | "moderate" | "active";
    gameUrl: string;
    engineVersion: string;
    locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
    ageRange: {
        min: number;
        max: number;
    };
    movementTags: ("freeze" | "squat" | "jump" | "step" | "touch" | "dodge" | "pose" | "strike" | "combo")[];
    accessibility: {
        captions: boolean;
        seatedMode: boolean;
        highContrast: boolean;
        reducedStimulation: boolean;
        audioCues: boolean;
    };
    thumbnail: {
        url: string;
        mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
        alt: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
    };
    contentProvenance: {
        hasGeneratedAssets: boolean;
        hasThirdPartyAssets: boolean;
        provenanceUrl: string;
    };
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
}, {
    creator: string;
    sourceUrl: string;
    id: string;
    license: {
        spdxId: string;
        name: string;
        url: string | null;
        attribution: string | null;
    };
    schemaVersion: 1;
    slug: string;
    title: {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
    }[];
    summary: {
        locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
        text: string;
    }[];
    energy: "gentle" | "moderate" | "active";
    gameUrl: string;
    engineVersion: string;
    locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
    ageRange: {
        min: number;
        max: number;
    };
    movementTags: ("freeze" | "squat" | "jump" | "step" | "touch" | "dodge" | "pose" | "strike" | "combo")[];
    accessibility: {
        captions: boolean;
        seatedMode: boolean;
        highContrast: boolean;
        reducedStimulation: boolean;
        audioCues: boolean;
    };
    thumbnail: {
        url: string;
        mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
        alt: {
            locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
            text: string;
        }[];
    };
    contentProvenance: {
        hasGeneratedAssets: boolean;
        hasThirdPartyAssets: boolean;
        provenanceUrl: string;
    };
    permissions: {
        camera: boolean;
        deviceLocalStorage: boolean;
    };
}>;
export declare function parseCatalog(input: unknown): Catalog;
export declare function safeParseCatalog(input: unknown): import("zod").SafeParseReturnType<{
    schemaVersion: 1;
    games: {
        manifestUrl: string;
    }[];
}, {
    schemaVersion: 1;
    games: {
        manifestUrl: string;
    }[];
}>;
export declare function parseCatalogSnapshot(input: unknown): CatalogSnapshot;
export declare function safeParseCatalogSnapshot(input: unknown): import("zod").SafeParseReturnType<{
    schemaVersion: 1;
    games: {
        manifestUrl: string;
        manifest: {
            creator: string;
            sourceUrl: string;
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            schemaVersion: 1;
            slug: string;
            title: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            summary: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            energy: "gentle" | "moderate" | "active";
            gameUrl: string;
            engineVersion: string;
            locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
            ageRange: {
                min: number;
                max: number;
            };
            movementTags: ("freeze" | "squat" | "jump" | "step" | "touch" | "dodge" | "pose" | "strike" | "combo")[];
            accessibility: {
                captions: boolean;
                seatedMode: boolean;
                highContrast: boolean;
                reducedStimulation: boolean;
                audioCues: boolean;
            };
            thumbnail: {
                url: string;
                mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
                alt: {
                    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                    text: string;
                }[];
            };
            contentProvenance: {
                hasGeneratedAssets: boolean;
                hasThirdPartyAssets: boolean;
                provenanceUrl: string;
            };
            permissions: {
                camera: boolean;
                deviceLocalStorage: boolean;
            };
        };
    }[];
}, {
    schemaVersion: 1;
    games: {
        manifestUrl: string;
        manifest: {
            creator: string;
            sourceUrl: string;
            id: string;
            license: {
                spdxId: string;
                name: string;
                url: string | null;
                attribution: string | null;
            };
            schemaVersion: 1;
            slug: string;
            title: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            summary: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
            energy: "gentle" | "moderate" | "active";
            gameUrl: string;
            engineVersion: string;
            locales: ("en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar")[];
            ageRange: {
                min: number;
                max: number;
            };
            movementTags: ("freeze" | "squat" | "jump" | "step" | "touch" | "dodge" | "pose" | "strike" | "combo")[];
            accessibility: {
                captions: boolean;
                seatedMode: boolean;
                highContrast: boolean;
                reducedStimulation: boolean;
                audioCues: boolean;
            };
            thumbnail: {
                url: string;
                mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
                alt: {
                    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                    text: string;
                }[];
            };
            contentProvenance: {
                hasGeneratedAssets: boolean;
                hasThirdPartyAssets: boolean;
                provenanceUrl: string;
            };
            permissions: {
                camera: boolean;
                deviceLocalStorage: boolean;
            };
        };
    }[];
}>;
export declare function parseEpisodePack(input: unknown): EpisodePack;
export declare function safeParseEpisodePack(input: unknown): import("zod").SafeParseReturnType<{
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
export declare function parsePackProvenance(input: unknown): PackProvenance;
export declare function safeParsePackProvenance(input: unknown): import("zod").SafeParseReturnType<{
    schemaVersion: 1;
    assets: {
        path: string | null;
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
        assetId: string;
    }[];
}, {
    schemaVersion: 1;
    assets: {
        path: string | null;
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
        assetId: string;
    }[];
}>;
export declare function parsePlayerProfile(input: unknown): PlayerProfile;
export declare function safeParsePlayerProfile(input: unknown): import("zod").SafeParseReturnType<{
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
export declare function parseSessionStats(input: unknown): SessionStats;
export declare function safeParseSessionStats(input: unknown): import("zod").SafeParseReturnType<{
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
//# sourceMappingURL=parsers.d.ts.map