import { z } from "zod";
import { HttpsUrlSchema, IdentifierSchema, LicenseSchema, LocaleSchema, LocalizedTextSchema, PermissionsSchema, SemverSchema, SlugSchema, duplicateValues, } from "./common.js";
export const MovementTagSchema = z.enum([
    "touch",
    "freeze",
    "dodge",
    "squat",
    "pose",
    "jump",
    "strike",
    "step",
    "combo",
]);
export const AccessibilitySchema = z
    .object({
    captions: z.boolean(),
    seatedMode: z.boolean(),
    highContrast: z.boolean(),
    reducedStimulation: z.boolean(),
    audioCues: z.boolean(),
})
    .strict();
export const AgeRangeSchema = z
    .object({ min: z.number().int().min(2).max(120), max: z.number().int().min(2).max(120) })
    .strict()
    .refine(({ min, max }) => min <= max, "Minimum age must not exceed maximum age");
export const ThumbnailSchema = z
    .object({
    url: HttpsUrlSchema,
    mediaType: z.enum(["image/png", "image/jpeg", "image/webp", "image/avif"]),
    alt: z.array(LocalizedTextSchema).min(1),
})
    .strict();
export const ContentProvenanceSummarySchema = z
    .object({
    hasGeneratedAssets: z.boolean(),
    hasThirdPartyAssets: z.boolean(),
    provenanceUrl: HttpsUrlSchema,
})
    .strict();
export const ManseGameManifestBaseSchema = z
    .object({
    schemaVersion: z.literal(1),
    id: IdentifierSchema,
    slug: SlugSchema,
    title: z.array(LocalizedTextSchema).min(1),
    summary: z.array(LocalizedTextSchema).min(1),
    creator: z.string().trim().min(1).max(200),
    energy: z.enum(["gentle", "moderate", "active"]),
    gameUrl: HttpsUrlSchema,
    sourceUrl: HttpsUrlSchema,
    engineVersion: SemverSchema,
    locales: z.array(LocaleSchema).min(1),
    ageRange: AgeRangeSchema,
    movementTags: z.array(MovementTagSchema).min(1),
    accessibility: AccessibilitySchema,
    thumbnail: ThumbnailSchema,
    license: LicenseSchema,
    contentProvenance: ContentProvenanceSummarySchema,
    permissions: PermissionsSchema,
})
    .strict();
function checkLocalizedManifestSet(values, locales, context, path) {
    for (const duplicate of duplicateValues(values.map((value) => value.locale))) {
        context.addIssue({ code: z.ZodIssueCode.custom, path, message: `Locale '${duplicate}' is declared more than once` });
    }
    const present = new Set(values.map((value) => value.locale));
    const declared = new Set(locales);
    for (const locale of declared) {
        if (!present.has(locale)) {
            context.addIssue({ code: z.ZodIssueCode.custom, path, message: `Missing declared locale '${locale}'` });
        }
    }
    for (const locale of present) {
        if (!declared.has(locale)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                path,
                message: `Locale '${locale}' is not declared by the manifest`,
            });
        }
    }
}
export const ManseGameManifestSchema = ManseGameManifestBaseSchema.superRefine((manifest, context) => {
    for (const duplicate of duplicateValues(manifest.locales)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["locales"],
            message: `Locale '${duplicate}' is declared more than once`,
        });
    }
    for (const duplicate of duplicateValues(manifest.movementTags)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["movementTags"],
            message: `Movement tag '${duplicate}' is declared more than once`,
        });
    }
    checkLocalizedManifestSet(manifest.title, manifest.locales, context, ["title"]);
    checkLocalizedManifestSet(manifest.summary, manifest.locales, context, ["summary"]);
    checkLocalizedManifestSet(manifest.thumbnail.alt, manifest.locales, context, ["thumbnail", "alt"]);
});
//# sourceMappingURL=manifest.js.map