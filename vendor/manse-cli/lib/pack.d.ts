export interface PublicationFile {
    readonly absolutePath: string;
    readonly relativePath: string;
    readonly sha256: string;
    readonly size: number;
}
export interface PackPublicationResult {
    readonly deployRoot: string;
    readonly files: readonly PublicationFile[];
    readonly kind: "directory" | "zip";
    readonly outputPath: string;
    readonly sha256?: string;
}
export declare function packPublication(rawProject: string, rawOutput: string, cwd: string): Promise<PackPublicationResult>;
//# sourceMappingURL=pack.d.ts.map