import { relative } from "node:path";
import { canonicalJson } from "./json.js";
import { OUTPUT_FORMAT_VERSION } from "./types.js";
function normalizedPath(value, cwd) {
    if (value === undefined)
        return undefined;
    if (!value.startsWith("/"))
        return value.replaceAll("\\", "/");
    const local = relative(cwd, value).replaceAll("\\", "/");
    return local || ".";
}
export function normalizeDiagnostics(diagnostics, cwd) {
    return diagnostics
        .map((diagnostic) => ({
        ...diagnostic,
        path: normalizedPath(diagnostic.path, cwd),
    }))
        .sort((left, right) => {
        const a = `${left.path ?? ""}\u0000${left.pointer ?? ""}\u0000${left.code}`;
        const b = `${right.path ?? ""}\u0000${right.pointer ?? ""}\u0000${right.code}`;
        return a < b ? -1 : a > b ? 1 : 0;
    });
}
export function writeJsonResult(stdout, command, ok, result, cwd) {
    const output = {
        formatVersion: OUTPUT_FORMAT_VERSION,
        command,
        ok,
        diagnostics: normalizeDiagnostics(result.diagnostics ?? [], cwd),
        ...(result.artifacts === undefined
            ? {}
            : { artifacts: [...result.artifacts].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0) }),
        ...(result.changed === undefined ? {} : { changed: result.changed }),
        ...(result.data === undefined ? {} : { data: result.data }),
    };
    stdout.write(canonicalJson(output));
}
export function formatDiagnostic(diagnostic, cwd) {
    const path = normalizedPath(diagnostic.path, cwd);
    const location = path === undefined
        ? ""
        : ` (${path}${diagnostic.pointer === undefined ? "" : `#${diagnostic.pointer}`})`;
    return `${diagnostic.severity.toUpperCase()} ${diagnostic.code}${location}: ${diagnostic.message}`;
}
//# sourceMappingURL=output.js.map