import type { CommandResult, Diagnostic, WritableOutput } from "./types.js";
export declare function normalizeDiagnostics(diagnostics: readonly Diagnostic[], cwd: string): Diagnostic[];
export declare function writeJsonResult(stdout: WritableOutput, command: string, ok: boolean, result: Omit<CommandResult, "message">, cwd: string): void;
export declare function formatDiagnostic(diagnostic: Diagnostic, cwd: string): string;
//# sourceMappingURL=output.d.ts.map