import { z } from "zod";
export declare const LocaleSchema: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
export type Locale = z.infer<typeof LocaleSchema>;
export declare const AgeBandSchema: z.ZodEnum<["2-3", "4-5", "6-7", "8+"]>;
export type AgeBand = z.infer<typeof AgeBandSchema>;
export declare const IdentifierSchema: z.ZodString;
export declare const SlugSchema: z.ZodString;
export declare const SemverSchema: z.ZodString;
export declare const IsoDateTimeSchema: z.ZodString;
export declare const HttpsUrlSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const SafeRelativeAssetPathSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const LocalizedTextSchema: z.ZodObject<{
    locale: z.ZodEnum<["en", "ko", "es", "ja", "zh", "fr", "de", "ar"]>;
    text: z.ZodString;
}, "strict", z.ZodTypeAny, {
    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
    text: string;
}, {
    locale: "en" | "ko" | "es" | "ja" | "zh" | "fr" | "de" | "ar";
    text: string;
}>;
export type LocalizedText = z.infer<typeof LocalizedTextSchema>;
export declare const NormBoxSchema: z.ZodEffects<z.ZodObject<{
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
export type NormBox = z.infer<typeof NormBoxSchema>;
export declare const LicenseSchema: z.ZodObject<{
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
export type License = z.infer<typeof LicenseSchema>;
export declare const PermissionsSchema: z.ZodObject<{
    camera: z.ZodBoolean;
    deviceLocalStorage: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    camera: boolean;
    deviceLocalStorage: boolean;
}, {
    camera: boolean;
    deviceLocalStorage: boolean;
}>;
export type Permissions = z.infer<typeof PermissionsSchema>;
/**
 * Compare two release versions numerically (prerelease/build metadata ignored:
 * contract gates compare released engine lines only). Returns -1, 0, or 1.
 */
export declare function compareSemver(left: string, right: string): number;
export declare function duplicateValues(values: readonly string[]): Set<string>;
//# sourceMappingURL=common.d.ts.map