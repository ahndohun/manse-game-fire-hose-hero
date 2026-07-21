import { createHash, randomBytes } from "node:crypto";
import { mkdir, open, rename, rm } from "node:fs/promises";
import { dirname } from "node:path";
import { CliError, ExitCode } from "./errors.js";
export const MAX_JSON_BYTES = 5 * 1024 * 1024;
function sortJson(value, seen = new Set(), pointer = "") {
    if (typeof value === "number" && !Number.isFinite(value)) {
        throw new CliError("NOT_JSON_VALUE", `Non-finite number at ${pointer || "/"}.`, { exitCode: ExitCode.Internal });
    }
    if (value === undefined || typeof value === "bigint" || typeof value === "function" || typeof value === "symbol") {
        throw new CliError("NOT_JSON_VALUE", `Unsupported JSON value at ${pointer || "/"}.`, { exitCode: ExitCode.Internal });
    }
    if (Array.isArray(value)) {
        if (seen.has(value))
            throw new CliError("CYCLIC_JSON", "Cannot serialize a cyclic value.", { exitCode: ExitCode.Internal });
        seen.add(value);
        const result = value.map((item, index) => sortJson(item, seen, `${pointer}/${index}`));
        seen.delete(value);
        return result;
    }
    if (value !== null && typeof value === "object") {
        if (seen.has(value))
            throw new CliError("CYCLIC_JSON", "Cannot serialize a cyclic value.", { exitCode: ExitCode.Internal });
        seen.add(value);
        const record = value;
        const result = Object.fromEntries(Object.keys(record)
            .sort(compareCodeUnits)
            .map((key) => [key, sortJson(record[key], seen, `${pointer}/${key.replaceAll("~", "~0").replaceAll("/", "~1")}`)]));
        seen.delete(value);
        return result;
    }
    return value;
}
export function canonicalJson(value) {
    const normalized = sortJson(value);
    const serialized = JSON.stringify(normalized, null, 2);
    if (serialized === undefined) {
        throw new CliError("NOT_JSON_VALUE", "The requested output is not a JSON value.", {
            exitCode: ExitCode.Internal,
        });
    }
    return `${serialized}\n`;
}
function compareCodeUnits(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
}
export function sha256(value) {
    return createHash("sha256").update(value).digest("hex");
}
export async function readJsonFile(filePath) {
    let handle;
    try {
        handle = await open(filePath, "r");
        const stat = await handle.stat();
        if (!stat.isFile()) {
            throw new CliError("NOT_A_FILE", `Expected a JSON file: ${filePath}`, {
                exitCode: ExitCode.LocalIo,
            });
        }
        if (stat.size > MAX_JSON_BYTES) {
            throw new CliError("JSON_TOO_LARGE", `JSON files may not exceed ${MAX_JSON_BYTES} bytes: ${filePath}`, { exitCode: ExitCode.LocalIo });
        }
        const text = await handle.readFile("utf8");
        try {
            return JSON.parse(text);
        }
        catch (error) {
            throw new CliError("INVALID_JSON", `Could not parse JSON in ${filePath}.`, {
                cause: error,
                exitCode: ExitCode.Validation,
                diagnostics: [
                    {
                        code: "INVALID_JSON",
                        message: error instanceof Error ? error.message : "Invalid JSON.",
                        path: filePath,
                        severity: "error",
                    },
                ],
            });
        }
    }
    catch (error) {
        if (error instanceof CliError)
            throw error;
        throw new CliError("READ_FAILED", `Could not read ${filePath}.`, {
            cause: error,
            exitCode: ExitCode.LocalIo,
        });
    }
    finally {
        await handle?.close();
    }
}
export async function atomicWriteFile(filePath, contents) {
    const parent = dirname(filePath);
    await mkdir(parent, { recursive: true });
    const temporary = `${filePath}.manse-${process.pid}-${randomBytes(6).toString("hex")}.tmp`;
    try {
        const handle = await open(temporary, "wx", 0o600);
        try {
            await handle.writeFile(contents);
            await handle.sync();
        }
        finally {
            await handle.close();
        }
        await rename(temporary, filePath);
    }
    catch (error) {
        await rm(temporary, { force: true }).catch(() => undefined);
        throw new CliError("WRITE_FAILED", `Could not write ${filePath}.`, {
            cause: error,
            exitCode: ExitCode.LocalIo,
        });
    }
}
//# sourceMappingURL=json.js.map