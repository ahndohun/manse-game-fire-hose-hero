import { z } from "zod";
import { HttpsUrlSchema, IdentifierSchema, IsoDateTimeSchema, LicenseSchema, LocaleSchema, LocalizedTextSchema, SafeRelativeAssetPathSchema, } from "./common.js";
export const OriginalAssetProvenanceSchema = z
    .object({
    kind: z.literal("original"),
    creator: z.string().trim().min(1).max(200),
    createdAt: IsoDateTimeSchema,
})
    .strict();
export const GeneratedAssetProvenanceSchema = z
    .object({
    kind: z.literal("generated"),
    tool: z.string().trim().min(1).max(200),
    model: z.string().trim().min(1).max(200),
    prompt: z.string().trim().min(1).max(20_000),
    generatedAt: IsoDateTimeSchema,
})
    .strict();
export const ThirdPartyAssetProvenanceSchema = z
    .object({
    kind: z.literal("third-party"),
    creator: z.string().trim().min(1).max(200),
    sourceUrl: HttpsUrlSchema,
    retrievedAt: IsoDateTimeSchema,
})
    .strict();
export const AssetProvenanceSchema = z.discriminatedUnion("kind", [
    OriginalAssetProvenanceSchema,
    GeneratedAssetProvenanceSchema,
    ThirdPartyAssetProvenanceSchema,
]);
const AssetOwnershipShape = {
    license: LicenseSchema,
    provenance: AssetProvenanceSchema,
};
export const AssetImageSchema = z
    .object({
    id: IdentifierSchema,
    path: SafeRelativeAssetPathSchema,
    mediaType: z.enum(["image/png", "image/jpeg", "image/webp", "image/avif"]),
    alt: z.array(LocalizedTextSchema).min(1),
    ...AssetOwnershipShape,
})
    .strict();
export const AssetAudioSchema = z
    .object({
    id: IdentifierSchema,
    path: SafeRelativeAssetPathSchema,
    mediaType: z.enum(["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp4"]),
    locale: LocaleSchema.nullable(),
    transcript: z.string().max(5_000),
    ...AssetOwnershipShape,
})
    .strict();
export const AssetMusicSchema = z
    .object({
    id: IdentifierSchema,
    generator: z.literal("tone.js"),
    seed: z.number().int().nonnegative(),
    mood: z.enum(["adventure", "calm", "silly", "victory"]),
    ...AssetOwnershipShape,
})
    .strict();
export const AssetCollectionsSchema = z
    .object({
    images: z.array(AssetImageSchema),
    audio: z.array(AssetAudioSchema),
    music: z.array(AssetMusicSchema),
})
    .strict();
//# sourceMappingURL=assets.js.map