import type { Diagnostic } from "./types.js";
export declare enum ExitCode {
    Success = 0,
    Validation = 1,
    Usage = 2,
    LocalIo = 3,
    Network = 4,
    Conflict = 5,
    Unsupported = 6,
    Internal = 70,
    Interrupted = 130
}
export interface CliErrorOptions {
    readonly cause?: unknown;
    readonly diagnostics?: readonly Diagnostic[];
    readonly exitCode?: ExitCode;
}
export declare class CliError extends Error {
    readonly code: string;
    readonly diagnostics: readonly Diagnostic[];
    readonly exitCode: ExitCode;
    constructor(code: string, message: string, options?: CliErrorOptions);
}
export declare function toCliError(error: unknown): CliError;
//# sourceMappingURL=errors.d.ts.map