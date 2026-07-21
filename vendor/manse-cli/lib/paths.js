import { lstat, readdir, realpath, stat } from "node:fs/promises";
import { basename, dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { CliError, ExitCode } from "./errors.js";
export function resolveUserPath(value, cwd) {
    if (value.length === 0 || value.includes("\0")) {
        throw new CliError("INVALID_PATH", "Paths may not be empty or contain null bytes.", {
            exitCode: ExitCode.Usage,
        });
    }
    return isAbsolute(value) ? resolve(value) : resolve(cwd, value);
}
export function toPosixPath(value) {
    return value.split(sep).join("/");
}
export function relativePosix(from, to) {
    return toPosixPath(relative(from, to));
}
export function isPathWithin(parent, candidate) {
    const local = relative(resolve(parent), resolve(candidate));
    return local === "" || (!local.startsWith(`..${sep}`) && local !== ".." && !isAbsolute(local));
}
export async function assertExistingDirectory(path) {
    try {
        const entry = await stat(path);
        if (!entry.isDirectory())
            throw new Error("not a directory");
    }
    catch (error) {
        throw new CliError("DIRECTORY_NOT_FOUND", `Directory not found: ${path}`, {
            cause: error,
            exitCode: ExitCode.LocalIo,
        });
    }
}
export async function assertOutputOutsideInput(input, output) {
    const inputReal = await realpath(input).catch(() => resolve(input));
    let outputParent = dirname(output);
    while (outputParent !== dirname(outputParent)) {
        try {
            outputParent = await realpath(outputParent);
            break;
        }
        catch {
            outputParent = dirname(outputParent);
        }
    }
    const projectedOutput = resolve(outputParent, basename(output));
    if (isPathWithin(inputReal, projectedOutput)) {
        throw new CliError("OUTPUT_INSIDE_INPUT", "The output must be outside the project and deploy directory to avoid recursive or stale artifacts.", { exitCode: ExitCode.Conflict });
    }
}
export async function pathExists(path) {
    try {
        await lstat(path);
        return true;
    }
    catch (error) {
        if (isRecordWithCode(error) && error.code === "ENOENT")
            return false;
        throw error;
    }
}
function isRecordWithCode(error) {
    return error !== null && typeof error === "object" && "code" in error && typeof error.code === "string";
}
function collisionKey(path) {
    return path.normalize("NFC").toLowerCase();
}
export async function walkRegularFiles(root) {
    const files = [];
    const seen = new Map();
    async function visit(directory) {
        const entries = await readdir(directory, { withFileTypes: true });
        entries.sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
        for (const entry of entries) {
            const absolutePath = resolve(directory, entry.name);
            const relativePath = relativePosix(root, absolutePath);
            if (relativePath.includes("\\") || relativePath.split("/").some((part) => part === ".." || part === "")) {
                throw new CliError("UNSAFE_PATH", `Unsafe publication path: ${relativePath}`, {
                    exitCode: ExitCode.LocalIo,
                });
            }
            const key = collisionKey(relativePath);
            const previous = seen.get(key);
            if (previous !== undefined && previous !== relativePath) {
                throw new CliError("CASE_COLLISION", `Publication paths collide on common filesystems: ${previous} and ${relativePath}`, { exitCode: ExitCode.Conflict });
            }
            seen.set(key, relativePath);
            if (entry.isSymbolicLink()) {
                throw new CliError("SYMLINK_NOT_ALLOWED", `Publication artifacts may not contain symlinks: ${relativePath}`, {
                    exitCode: ExitCode.LocalIo,
                });
            }
            if (entry.isDirectory()) {
                await visit(absolutePath);
            }
            else if (entry.isFile()) {
                const metadata = await stat(absolutePath);
                files.push({ absolutePath, relativePath, size: metadata.size });
            }
            else {
                throw new CliError("SPECIAL_FILE_NOT_ALLOWED", `Unsupported file in publication artifact: ${relativePath}`, {
                    exitCode: ExitCode.LocalIo,
                });
            }
        }
    }
    await visit(root);
    return files.sort((left, right) => Buffer.from(left.relativePath).compare(Buffer.from(right.relativePath)));
}
//# sourceMappingURL=paths.js.map