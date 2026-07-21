export declare const OUTPUT_FORMAT_VERSION: 1;
export type DiagnosticSeverity = "error" | "warning" | "info";
export interface Diagnostic {
    readonly code: string;
    readonly message: string;
    readonly path?: string;
    readonly pointer?: string;
    readonly severity: DiagnosticSeverity;
}
export interface Artifact {
    readonly kind: "catalog" | "catalog-snapshot" | "directory" | "manifest" | "zip";
    readonly path: string;
    readonly sha256?: string;
}
export interface CommandResult {
    readonly artifacts?: readonly Artifact[];
    readonly changed?: boolean;
    readonly data?: unknown;
    readonly diagnostics?: readonly Diagnostic[];
    readonly message: string;
}
export interface JsonCommandOutput {
    readonly artifacts?: readonly Artifact[];
    readonly changed?: boolean;
    readonly command: string;
    readonly data?: unknown;
    readonly diagnostics: readonly Diagnostic[];
    readonly formatVersion: typeof OUTPUT_FORMAT_VERSION;
    readonly ok: boolean;
}
export interface WritableOutput {
    write(chunk: string): unknown;
}
//# sourceMappingURL=types.d.ts.map