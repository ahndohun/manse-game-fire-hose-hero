import { access, constants } from "node:fs/promises";
import { CliError, ExitCode } from "./errors.js";
import { MANIFEST_URL_PATH, PACK_FILENAME } from "./schema-adapter.js";
const MINIMUM_NODE = [22, 13, 0];
function parseNodeVersion(version) {
    return version.replace(/^v/u, "").split(".").map((part) => Number.parseInt(part, 10));
}
function supportsMinimumNode(version) {
    const actual = parseNodeVersion(version);
    for (let index = 0; index < MINIMUM_NODE.length; index += 1) {
        const actualPart = actual[index] ?? 0;
        const minimumPart = MINIMUM_NODE[index] ?? 0;
        if (actualPart > minimumPart)
            return true;
        if (actualPart < minimumPart)
            return false;
    }
    return true;
}
export async function runDoctor(cwd) {
    const checks = [
        {
            id: "node-version",
            message: `Node.js ${process.version} (requires >=22.13.0)`,
            ok: supportsMinimumNode(process.version),
        },
        {
            id: "schema-contract",
            message: `Schema contract loaded (${MANIFEST_URL_PATH}, ${PACK_FILENAME})`,
            ok: MANIFEST_URL_PATH.startsWith("/") && PACK_FILENAME.endsWith(".json"),
        },
        {
            id: "fetch-runtime",
            message: "Secure public-manifest fetch is available",
            ok: typeof globalThis.fetch === "function",
        },
    ];
    try {
        await access(cwd, constants.R_OK | constants.W_OK);
        checks.push({ id: "workspace-access", message: "The current directory is readable and writable", ok: true });
    }
    catch {
        checks.push({ id: "workspace-access", message: "The current directory is not readable and writable", ok: false });
    }
    checks.sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);
    if (checks.some((check) => !check.ok)) {
        throw new CliError("DOCTOR_FAILED", "Manse CLI is not ready in this environment.", {
            exitCode: ExitCode.Unsupported,
            diagnostics: checks.filter((check) => !check.ok).map((check) => ({
                code: `DOCTOR_${check.id.replaceAll("-", "_").toUpperCase()}`,
                message: check.message,
                severity: "error",
            })),
        });
    }
    return checks;
}
//# sourceMappingURL=doctor.js.map