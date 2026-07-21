export type ValidatedKind = "catalog" | "catalog-snapshot" | "manifest" | "pack";
export interface ValidatedDocument {
    readonly document: Record<string, unknown>;
    readonly kind: ValidatedKind;
    readonly path: string;
}
export declare function validateJsonDocument(filePath: string, forcedKind?: ValidatedKind): Promise<ValidatedDocument>;
export declare function sourceManifestPath(projectRoot: string): string;
export declare function deployedManifestPath(deployRoot: string): string;
export declare function validateProjectRoot(projectRoot: string): Promise<ValidatedDocument[]>;
export declare function validateTarget(rawTarget: string, cwd: string): Promise<ValidatedDocument[]>;
export declare function readProjectManifest(rawProject: string, cwd: string): Promise<ValidatedDocument>;
//# sourceMappingURL=documents.d.ts.map