export var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["Success"] = 0] = "Success";
    ExitCode[ExitCode["Validation"] = 1] = "Validation";
    ExitCode[ExitCode["Usage"] = 2] = "Usage";
    ExitCode[ExitCode["LocalIo"] = 3] = "LocalIo";
    ExitCode[ExitCode["Network"] = 4] = "Network";
    ExitCode[ExitCode["Conflict"] = 5] = "Conflict";
    ExitCode[ExitCode["Unsupported"] = 6] = "Unsupported";
    ExitCode[ExitCode["Internal"] = 70] = "Internal";
    ExitCode[ExitCode["Interrupted"] = 130] = "Interrupted";
})(ExitCode || (ExitCode = {}));
export class CliError extends Error {
    code;
    diagnostics;
    exitCode;
    constructor(code, message, options = {}) {
        super(message, { cause: options.cause });
        this.name = "CliError";
        this.code = code;
        this.exitCode = options.exitCode ?? ExitCode.Validation;
        this.diagnostics = options.diagnostics ?? [
            { code, message, severity: "error" },
        ];
    }
}
export function toCliError(error) {
    if (error instanceof CliError)
        return error;
    if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
        return new CliError("INTERRUPTED", "The operation was interrupted.", {
            cause: error,
            exitCode: ExitCode.Interrupted,
        });
    }
    return new CliError("INTERNAL_ERROR", "An unexpected internal error occurred.", {
        cause: error,
        exitCode: ExitCode.Internal,
    });
}
//# sourceMappingURL=errors.js.map