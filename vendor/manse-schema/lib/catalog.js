import { z } from "zod";
import { HttpsUrlSchema, duplicateValues } from "./common.js";
import { MANSE_GAME_MANIFEST_PATH } from "./constants.js";
import { ManseGameManifestSchema } from "./manifest.js";
export const ManifestUrlSchema = HttpsUrlSchema.refine((value) => {
    const url = new URL(value);
    return url.pathname === MANSE_GAME_MANIFEST_PATH && url.search === "" && url.hash === "";
}, `Manifest URLs must point exactly to '${MANSE_GAME_MANIFEST_PATH}'`);
export const CatalogEntrySchema = z.object({ manifestUrl: ManifestUrlSchema }).strict();
export const CatalogBaseSchema = z
    .object({ schemaVersion: z.literal(1), games: z.array(CatalogEntrySchema) })
    .strict();
export const CatalogSchema = CatalogBaseSchema.superRefine((catalog, context) => {
    for (const duplicate of duplicateValues(catalog.games.map((game) => game.manifestUrl))) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["games"],
            message: `Manifest URL '${duplicate}' is listed more than once`,
        });
    }
});
export const ResolvedCatalogEntrySchema = z
    .object({ manifestUrl: ManifestUrlSchema, manifest: ManseGameManifestSchema })
    .strict();
export const CatalogSnapshotBaseSchema = z
    .object({ schemaVersion: z.literal(1), games: z.array(ResolvedCatalogEntrySchema) })
    .strict();
export const CatalogSnapshotSchema = CatalogSnapshotBaseSchema.superRefine((snapshot, context) => {
    const uniquenessChecks = [
        ["manifest URL", snapshot.games.map((game) => game.manifestUrl)],
        ["manifest id", snapshot.games.map((game) => game.manifest.id)],
        ["manifest slug", snapshot.games.map((game) => game.manifest.slug)],
        ["game URL", snapshot.games.map((game) => game.manifest.gameUrl)],
    ];
    for (const [label, values] of uniquenessChecks) {
        for (const duplicate of duplicateValues(values)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["games"],
                message: `Duplicate ${label} '${duplicate}' in resolved catalog`,
            });
        }
    }
    snapshot.games.forEach((entry, index) => {
        if (new URL(entry.manifestUrl).origin !== new URL(entry.manifest.gameUrl).origin) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["games", index, "manifestUrl"],
                message: "The public manifest must be served by the same origin as its game URL",
            });
        }
    });
});
//# sourceMappingURL=catalog.js.map