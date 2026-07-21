import { z } from "zod";
export declare const OriginalAssetProvenanceSchema: z.ZodObject<{
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
}>;
export declare const GeneratedAssetProvenanceSchema: z.ZodObject<{
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
}>;
export declare const ThirdPartyAssetProvenanceSchema: z.ZodObject<{
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
}>;
export declare const AssetProvenanceSchema: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
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
export type AssetProvenance = z.infer<typeof AssetProvenanceSchema>;
export declare const AssetImageSchema: z.ZodObject<{
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
}>;
export type AssetImage = z.infer<typeof AssetImageSchema>;
export declare const AssetAudioSchema: z.ZodObject<{
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
}>;
export type AssetAudio = z.infer<typeof AssetAudioSchema>;
export declare const AssetMusicSchema: z.ZodObject<{
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
}>;
export type AssetMusic = z.infer<typeof AssetMusicSchema>;
export declare const AssetCollectionsSchema: z.ZodObject<{
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
export type AssetCollections = z.infer<typeof AssetCollectionsSchema>;
//# sourceMappingURL=assets.d.ts.map