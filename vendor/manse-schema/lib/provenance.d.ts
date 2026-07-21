import { z } from "zod";
import type { EpisodePack, IntegrityIssue } from "./episode.js";
export declare const AssetProvenanceRecordSchema: z.ZodObject<{
    assetId: z.ZodString;
    path: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
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
}, "strict", z.ZodTypeAny, {
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
}, {
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
}>;
export type AssetProvenanceRecord = z.infer<typeof AssetProvenanceRecordSchema>;
export declare const PackProvenanceBaseSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    assets: z.ZodArray<z.ZodObject<{
        assetId: z.ZodString;
        path: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
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
    }, "strict", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
}, "strict", z.ZodTypeAny, {
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
export type PackProvenance = z.infer<typeof PackProvenanceBaseSchema>;
export declare const PackProvenanceSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    assets: z.ZodArray<z.ZodObject<{
        assetId: z.ZodString;
        path: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
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
    }, "strict", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
}, "strict", z.ZodTypeAny, {
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
}>, {
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
/** Ensures provenance.json is an exact audit projection of assets embedded in a pack. */
export declare function validatePackProvenance(pack: EpisodePack, document: PackProvenance): IntegrityIssue[];
//# sourceMappingURL=provenance.d.ts.map