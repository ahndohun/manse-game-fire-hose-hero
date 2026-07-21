import { z } from "zod";
import { SUPPORTED_LOCALES } from "./constants.js";
export const LocaleSchema = z.enum(SUPPORTED_LOCALES);
export const AgeBandSchema = z.enum(["2-3", "4-5", "6-7", "8+"]);
export const IdentifierSchema = z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/, "Use a stable lowercase identifier containing letters, digits, dots, underscores, or hyphens");
export const SlugSchema = z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case slug");
export const SemverSchema = z
    .string()
    .regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/, "Use a complete semantic version such as 1.2.3");
export const IsoDateTimeSchema = z.string().datetime({ offset: true });
function isHttpsUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" && url.username === "" && url.password === "";
    }
    catch {
        return false;
    }
}
export const HttpsUrlSchema = z
    .string()
    .url()
    .refine(isHttpsUrl, "Use an absolute HTTPS URL without embedded credentials");
function isSafeRelativePath(value) {
    if (value.length === 0 ||
        value.startsWith("/") ||
        value.startsWith("\\") ||
        value.includes("\\") ||
        value.includes("?") ||
        value.includes("#") ||
        /^[A-Za-z]:/.test(value) ||
        /%2e|%2f|%5c/i.test(value)) {
        return false;
    }
    return value
        .split("/")
        .every((segment) => segment !== "" && segment !== "." && segment !== "..");
}
export const SafeRelativeAssetPathSchema = z
    .string()
    .min(1)
    .max(300)
    .refine(isSafeRelativePath, "Use a relative in-pack path without traversal, encoded traversal, queries, or fragments");
export const LocalizedTextSchema = z
    .object({
    locale: LocaleSchema,
    text: z.string().trim().min(1).max(5_000),
})
    .strict();
export const NormBoxSchema = z
    .object({
    x0: z.number().min(0).max(1),
    y0: z.number().min(0).max(1),
    x1: z.number().min(0).max(1),
    y1: z.number().min(0).max(1),
})
    .strict()
    .refine((box) => box.x0 < box.x1 && box.y0 < box.y1, {
    message: "The lower bounds of a normalized box must be less than its upper bounds",
});
export const LicenseSchema = z
    .object({
    spdxId: z
        .string()
        .min(1)
        .max(100)
        .regex(/^[A-Za-z0-9][A-Za-z0-9.+-]*$/, "Use an SPDX license identifier"),
    name: z.string().trim().min(1).max(200),
    url: HttpsUrlSchema.nullable(),
    attribution: z.string().trim().min(1).max(2_000).nullable(),
})
    .strict();
export const PermissionsSchema = z
    .object({
    camera: z.boolean(),
    deviceLocalStorage: z.boolean(),
})
    .strict();
/**
 * Compare two release versions numerically (prerelease/build metadata ignored:
 * contract gates compare released engine lines only). Returns -1, 0, or 1.
 */
export function compareSemver(left, right) {
    const parse = (value) => (value.split(/[+-]/, 1)[0] ?? "").split(".").map((part) => Number.parseInt(part, 10) || 0);
    const a = parse(left);
    const b = parse(right);
    for (let index = 0; index < 3; index += 1) {
        const delta = (a[index] ?? 0) - (b[index] ?? 0);
        if (delta !== 0)
            return delta < 0 ? -1 : 1;
    }
    return 0;
}
export function duplicateValues(values) {
    const seen = new Set();
    const duplicates = new Set();
    for (const value of values) {
        if (seen.has(value)) {
            duplicates.add(value);
        }
        seen.add(value);
    }
    return duplicates;
}
//# sourceMappingURL=common.js.map