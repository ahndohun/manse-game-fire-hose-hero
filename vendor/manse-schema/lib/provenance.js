import { z } from "zod";
import { AssetProvenanceSchema } from "./assets.js";
import { IdentifierSchema, LicenseSchema, SafeRelativeAssetPathSchema, duplicateValues } from "./common.js";
export const AssetProvenanceRecordSchema = z
    .object({
    assetId: IdentifierSchema,
    path: SafeRelativeAssetPathSchema.nullable(),
    license: LicenseSchema,
    provenance: AssetProvenanceSchema,
})
    .strict();
export const PackProvenanceBaseSchema = z
    .object({ schemaVersion: z.literal(1), assets: z.array(AssetProvenanceRecordSchema) })
    .strict();
export const PackProvenanceSchema = PackProvenanceBaseSchema.superRefine((document, context) => {
    for (const duplicate of duplicateValues(document.assets.map((asset) => asset.assetId))) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["assets"],
            message: `Asset '${duplicate}' appears more than once in provenance.json`,
        });
    }
});
/** Ensures provenance.json is an exact audit projection of assets embedded in a pack. */
export function validatePackProvenance(pack, document) {
    const issues = [];
    const expected = new Map();
    for (const asset of pack.assets.images) {
        expected.set(asset.id, {
            assetId: asset.id,
            path: asset.path,
            license: asset.license,
            provenance: asset.provenance,
        });
    }
    for (const asset of pack.assets.audio) {
        expected.set(asset.id, {
            assetId: asset.id,
            path: asset.path,
            license: asset.license,
            provenance: asset.provenance,
        });
    }
    for (const asset of pack.assets.music) {
        expected.set(asset.id, {
            assetId: asset.id,
            path: null,
            license: asset.license,
            provenance: asset.provenance,
        });
    }
    const actual = new Map(document.assets.map((asset) => [asset.assetId, asset]));
    for (const [assetId, record] of expected) {
        const actualRecord = actual.get(assetId);
        if (!actualRecord) {
            issues.push({
                code: "provenance_mismatch",
                path: ["assets"],
                message: `Missing provenance record for asset '${assetId}'`,
            });
            continue;
        }
        if (JSON.stringify(record) !== JSON.stringify(actualRecord)) {
            issues.push({
                code: "provenance_mismatch",
                path: ["assets", document.assets.indexOf(actualRecord)],
                message: `Provenance record for asset '${assetId}' does not match the pack`,
            });
        }
    }
    document.assets.forEach((record, index) => {
        if (!expected.has(record.assetId)) {
            issues.push({
                code: "provenance_mismatch",
                path: ["assets", index, "assetId"],
                message: `Provenance record references unknown asset '${record.assetId}'`,
            });
        }
    });
    return issues;
}
//# sourceMappingURL=provenance.js.map