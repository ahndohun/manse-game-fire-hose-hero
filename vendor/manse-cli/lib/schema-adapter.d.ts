export declare const MANIFEST_URL_PATH: "/.well-known/manse-game.json";
export declare const MANIFEST_RELATIVE_PATH: string;
export declare const PACK_FILENAME: "manse.pack.json";
export declare function validateManifest(input: unknown, filePath: string): Record<string, unknown>;
export declare function validatePack(input: unknown, filePath: string): Record<string, unknown>;
export declare function validateCatalog(input: unknown, filePath: string): Record<string, unknown>;
export declare function validateCatalogSnapshot(input: unknown, filePath: string): Record<string, unknown>;
export declare function validateProvenance(input: unknown, filePath: string, pack: Record<string, unknown>): Record<string, unknown>;
//# sourceMappingURL=schema-adapter.d.ts.map