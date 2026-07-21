import { z } from "zod";
export declare const ManifestUrlSchema: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
export declare const CatalogEntrySchema: z.ZodObject<{
    manifestUrl: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
}, "strict", z.ZodTypeAny, {
    manifestUrl: string;
}, {
    manifestUrl: string;
}>;
export type CatalogEntry = z.infer<typeof CatalogEntrySchema>;
export declare const CatalogBaseSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    games: z.ZodArray<z.ZodObject<{
        manifestUrl: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    }, "strict", z.ZodTypeAny, {
        manifestUrl: string;
    }, {
        manifestUrl: string;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
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
export type Catalog = z.infer<typeof CatalogBaseSchema>;
export declare const CatalogSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    games: z.ZodArray<z.ZodObject<{
        manifestUrl: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    }, "strict", z.ZodTypeAny, {
        manifestUrl: string;
    }, {
        manifestUrl: string;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    schemaVersion: 1;
    games: {
        manifestUrl: string;
    }[];
}, {
    schemaVersion: 1;
    games: {
        manifestUrl: string;
    }[];
}>, {
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
export declare const ResolvedCatalogEntrySchema: z.ZodObject<{
    manifestUrl: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    manifest: z.ZodEffects<z.ZodObject<{
        schemaVersion: z.ZodLiteral<1>;
        id: z.ZodString;
        slug: z.ZodString;
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
        creator: z.ZodString;
        energy: z.ZodEnum<["gentle", "moderate", "active"]>;
        gameUrl: z.ZodEffects<z.ZodString, string, string>;
        sourceUrl: z.ZodEffects<z.ZodString, string, string>;
        engineVersion: z.ZodString;
        locales: z.ZodArray<z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>, "many">;
        ageRange: z.ZodEffects<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>;
        movementTags: z.ZodArray<z.ZodEnum<["touch", "freeze", "dodge", "squat", "pose", "jump", "strike", "step", "combo"]>, "many">;
        accessibility: z.ZodObject<{
            captions: z.ZodBoolean;
            seatedMode: z.ZodBoolean;
            highContrast: z.ZodBoolean;
            reducedStimulation: z.ZodBoolean;
            audioCues: z.ZodBoolean;
        }, "strict", z.ZodTypeAny, {
            captions: boolean;
            seatedMode: boolean;
            highContrast: boolean;
            reducedStimulation: boolean;
            audioCues: boolean;
        }, {
            captions: boolean;
            seatedMode: boolean;
            highContrast: boolean;
            reducedStimulation: boolean;
            audioCues: boolean;
        }>;
        thumbnail: z.ZodObject<{
            url: z.ZodEffects<z.ZodString, string, string>;
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
            url: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
        }, {
            url: string;
            mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
            alt: {
                locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                text: string;
            }[];
        }>;
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
        contentProvenance: z.ZodObject<{
            hasGeneratedAssets: z.ZodBoolean;
            hasThirdPartyAssets: z.ZodBoolean;
            provenanceUrl: z.ZodEffects<z.ZodString, string, string>;
        }, "strict", z.ZodTypeAny, {
            hasGeneratedAssets: boolean;
            hasThirdPartyAssets: boolean;
            provenanceUrl: string;
        }, {
            hasGeneratedAssets: boolean;
            hasThirdPartyAssets: boolean;
            provenanceUrl: string;
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
    }, "strict", z.ZodTypeAny, {
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
    }>, {
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
}, "strict", z.ZodTypeAny, {
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
}, {
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
}>;
export type ResolvedCatalogEntry = z.infer<typeof ResolvedCatalogEntrySchema>;
export declare const CatalogSnapshotBaseSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    games: z.ZodArray<z.ZodObject<{
        manifestUrl: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
        manifest: z.ZodEffects<z.ZodObject<{
            schemaVersion: z.ZodLiteral<1>;
            id: z.ZodString;
            slug: z.ZodString;
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
            creator: z.ZodString;
            energy: z.ZodEnum<["gentle", "moderate", "active"]>;
            gameUrl: z.ZodEffects<z.ZodString, string, string>;
            sourceUrl: z.ZodEffects<z.ZodString, string, string>;
            engineVersion: z.ZodString;
            locales: z.ZodArray<z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>, "many">;
            ageRange: z.ZodEffects<z.ZodObject<{
                min: z.ZodNumber;
                max: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                min: number;
                max: number;
            }, {
                min: number;
                max: number;
            }>, {
                min: number;
                max: number;
            }, {
                min: number;
                max: number;
            }>;
            movementTags: z.ZodArray<z.ZodEnum<["touch", "freeze", "dodge", "squat", "pose", "jump", "strike", "step", "combo"]>, "many">;
            accessibility: z.ZodObject<{
                captions: z.ZodBoolean;
                seatedMode: z.ZodBoolean;
                highContrast: z.ZodBoolean;
                reducedStimulation: z.ZodBoolean;
                audioCues: z.ZodBoolean;
            }, "strict", z.ZodTypeAny, {
                captions: boolean;
                seatedMode: boolean;
                highContrast: boolean;
                reducedStimulation: boolean;
                audioCues: boolean;
            }, {
                captions: boolean;
                seatedMode: boolean;
                highContrast: boolean;
                reducedStimulation: boolean;
                audioCues: boolean;
            }>;
            thumbnail: z.ZodObject<{
                url: z.ZodEffects<z.ZodString, string, string>;
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
                url: string;
                mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
                alt: {
                    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                    text: string;
                }[];
            }, {
                url: string;
                mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
                alt: {
                    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                    text: string;
                }[];
            }>;
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
            contentProvenance: z.ZodObject<{
                hasGeneratedAssets: z.ZodBoolean;
                hasThirdPartyAssets: z.ZodBoolean;
                provenanceUrl: z.ZodEffects<z.ZodString, string, string>;
            }, "strict", z.ZodTypeAny, {
                hasGeneratedAssets: boolean;
                hasThirdPartyAssets: boolean;
                provenanceUrl: string;
            }, {
                hasGeneratedAssets: boolean;
                hasThirdPartyAssets: boolean;
                provenanceUrl: string;
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
        }, "strict", z.ZodTypeAny, {
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
        }>, {
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
    }, "strict", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
}, "strict", z.ZodTypeAny, {
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
export type CatalogSnapshot = z.infer<typeof CatalogSnapshotBaseSchema>;
export declare const CatalogSnapshotSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    games: z.ZodArray<z.ZodObject<{
        manifestUrl: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
        manifest: z.ZodEffects<z.ZodObject<{
            schemaVersion: z.ZodLiteral<1>;
            id: z.ZodString;
            slug: z.ZodString;
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
            creator: z.ZodString;
            energy: z.ZodEnum<["gentle", "moderate", "active"]>;
            gameUrl: z.ZodEffects<z.ZodString, string, string>;
            sourceUrl: z.ZodEffects<z.ZodString, string, string>;
            engineVersion: z.ZodString;
            locales: z.ZodArray<z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>, "many">;
            ageRange: z.ZodEffects<z.ZodObject<{
                min: z.ZodNumber;
                max: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                min: number;
                max: number;
            }, {
                min: number;
                max: number;
            }>, {
                min: number;
                max: number;
            }, {
                min: number;
                max: number;
            }>;
            movementTags: z.ZodArray<z.ZodEnum<["touch", "freeze", "dodge", "squat", "pose", "jump", "strike", "step", "combo"]>, "many">;
            accessibility: z.ZodObject<{
                captions: z.ZodBoolean;
                seatedMode: z.ZodBoolean;
                highContrast: z.ZodBoolean;
                reducedStimulation: z.ZodBoolean;
                audioCues: z.ZodBoolean;
            }, "strict", z.ZodTypeAny, {
                captions: boolean;
                seatedMode: boolean;
                highContrast: boolean;
                reducedStimulation: boolean;
                audioCues: boolean;
            }, {
                captions: boolean;
                seatedMode: boolean;
                highContrast: boolean;
                reducedStimulation: boolean;
                audioCues: boolean;
            }>;
            thumbnail: z.ZodObject<{
                url: z.ZodEffects<z.ZodString, string, string>;
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
                url: string;
                mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
                alt: {
                    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                    text: string;
                }[];
            }, {
                url: string;
                mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/avif";
                alt: {
                    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
                    text: string;
                }[];
            }>;
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
            contentProvenance: z.ZodObject<{
                hasGeneratedAssets: z.ZodBoolean;
                hasThirdPartyAssets: z.ZodBoolean;
                provenanceUrl: z.ZodEffects<z.ZodString, string, string>;
            }, "strict", z.ZodTypeAny, {
                hasGeneratedAssets: boolean;
                hasThirdPartyAssets: boolean;
                provenanceUrl: string;
            }, {
                hasGeneratedAssets: boolean;
                hasThirdPartyAssets: boolean;
                provenanceUrl: string;
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
        }, "strict", z.ZodTypeAny, {
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
        }>, {
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
    }, "strict", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
}, "strict", z.ZodTypeAny, {
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
}>, {
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
//# sourceMappingURL=catalog.d.ts.map