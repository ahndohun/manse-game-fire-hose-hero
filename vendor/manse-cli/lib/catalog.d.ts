import type { NetworkDependencies } from "./network.js";
export interface CatalogEntry {
    readonly manifestUrl: string;
}
export interface ResolvedCatalogEntry extends CatalogEntry {
    readonly manifest: Record<string, unknown>;
}
export interface CatalogAddResult {
    readonly catalog: Record<string, unknown>;
    readonly catalogPath: string;
    readonly changed: boolean;
    readonly manifest: Record<string, unknown>;
    readonly manifestUrl: string;
}
export declare function addCatalogEntry(rawManifestUrl: string, rawCatalogPath: string, cwd: string, network: NetworkDependencies): Promise<CatalogAddResult>;
export interface CatalogBuildResult {
    readonly catalogPath: string;
    readonly outputPath: string;
    readonly snapshot: Record<string, unknown>;
}
export declare function buildCatalogSnapshot(rawCatalogPath: string, rawOutputPath: string, cwd: string, network: NetworkDependencies): Promise<CatalogBuildResult>;
//# sourceMappingURL=catalog.d.ts.map