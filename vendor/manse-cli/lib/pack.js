import { randomBytes } from "node:crypto";
import { chmod, copyFile, mkdir, readFile, rename, rm, utimes, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { CliError, ExitCode } from "./errors.js";
import { sha256 } from "./json.js";
import { assertExistingDirectory, assertOutputOutsideInput, pathExists, resolveUserPath, walkRegularFiles, } from "./paths.js";
import { deployedManifestPath, validateProjectRoot } from "./documents.js";
const FIXED_TIMESTAMP = new Date("1980-01-01T00:00:00.000Z");
const MAX_ARTIFACT_BYTES = 256 * 1024 * 1024;
const MAX_ARTIFACT_FILES = 20_000;
const SECRET_FILENAME = /^(?:\.env(?:\..*)?|\.npmrc|\.netrc|credentials\.json|id_(?:ed25519|rsa)|service-account(?:\..*)?\.json)$|\.(?:key|p12|pem|pfx)$/iu;
function compareStrings(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
}
function assertPublishablePath(relativePath) {
    const segments = relativePath.split("/");
    for (const [index, segment] of segments.entries()) {
        const isAllowedPlatformDirectory = index === 0 && (segment === ".well-known" || segment === ".openai");
        if ((segment.startsWith(".") && !isAllowedPlatformDirectory) || segment.toLowerCase() === "node_modules") {
            throw new CliError("PRIVATE_FILE_BLOCKED", `A private or development path cannot be published: ${relativePath}`, {
                exitCode: ExitCode.LocalIo,
            });
        }
    }
    const filename = segments.at(-1) ?? "";
    if (SECRET_FILENAME.test(filename)) {
        throw new CliError("SECRET_FILE_BLOCKED", `A secret-bearing file cannot be published: ${relativePath}`, {
            exitCode: ExitCode.LocalIo,
        });
    }
}
async function assertNoRuntimeCdn(deployRoot) {
    const html = await readFile(join(deployRoot, "index.html"), "utf8");
    const resourceTag = /<(?:base|embed|img|link|object|script|source|track|video)\b[^>]*?\b(?:data|href|src)\s*=\s*["']([^"']+)["']/giu;
    for (const match of html.matchAll(resourceTag)) {
        const resource = match[1] ?? "";
        if (/^(?:https?:)?\/\//iu.test(resource)) {
            throw new CliError("RUNTIME_CDN_BLOCKED", `The built Site references a runtime CDN resource (${resource}). Bundle runtime assets into the Site before packing.`, { exitCode: ExitCode.Validation });
        }
    }
    if (/\b(?:@import|url\()\s*["']?(?:https?:)?\/\//iu.test(html)) {
        throw new CliError("RUNTIME_CDN_BLOCKED", "The built Site contains a remote CSS runtime resource. Bundle it into the Site before packing.", { exitCode: ExitCode.Validation });
    }
}
async function findDeployRoot(projectRoot) {
    await assertExistingDirectory(projectRoot);
    const candidates = [];
    if (await pathExists(join(projectRoot, "index.html")) && await pathExists(deployedManifestPath(projectRoot))) {
        candidates.push(projectRoot);
    }
    for (const relativePath of ["dist", "out", "build", join(".output", "public")]) {
        const candidate = join(projectRoot, relativePath);
        if (await pathExists(join(candidate, "index.html")) && await pathExists(deployedManifestPath(candidate))) {
            candidates.push(candidate);
        }
    }
    if (candidates.length === 0) {
        throw new CliError("DEPLOY_ROOT_NOT_FOUND", "No built static Site was found. Build the project first; the output must contain index.html and .well-known/manse-game.json.", { exitCode: ExitCode.LocalIo });
    }
    if (candidates.length > 1) {
        throw new CliError("AMBIGUOUS_DEPLOY_ROOT", `More than one built Site was found (${candidates.join(", ")}). Remove stale outputs and try again.`, { exitCode: ExitCode.Conflict });
    }
    const deployRoot = candidates[0];
    if (deployRoot === undefined)
        throw new CliError("DEPLOY_ROOT_NOT_FOUND", "No built static Site was found.");
    return deployRoot;
}
function crc32(data) {
    let crc = 0xffff_ffff;
    for (const byte of data) {
        crc ^= byte;
        for (let bit = 0; bit < 8; bit += 1) {
            crc = (crc >>> 1) ^ (crc & 1 ? 0xedb8_8320 : 0);
        }
    }
    return (crc ^ 0xffff_ffff) >>> 0;
}
async function createDeterministicZip(files) {
    const localParts = [];
    const entries = [];
    let offset = 0;
    for (const file of files) {
        const contents = await readFile(file.absolutePath);
        const name = Buffer.from(file.relativePath, "utf8");
        if (name.length > 0xffff) {
            throw new CliError("PATH_TOO_LONG", `A publication path is too long to archive: ${file.relativePath}`, {
                exitCode: ExitCode.LocalIo,
            });
        }
        const crc = crc32(contents);
        const header = Buffer.alloc(30);
        header.writeUInt32LE(0x0403_4b50, 0);
        header.writeUInt16LE(20, 4);
        header.writeUInt16LE(0x0800, 6);
        header.writeUInt16LE(0, 8);
        header.writeUInt16LE(0, 10);
        header.writeUInt16LE(33, 12);
        header.writeUInt32LE(crc, 14);
        header.writeUInt32LE(contents.length, 18);
        header.writeUInt32LE(contents.length, 22);
        header.writeUInt16LE(name.length, 26);
        header.writeUInt16LE(0, 28);
        entries.push({ contents, crc, name, offset });
        localParts.push(header, name, contents);
        offset += header.length + name.length + contents.length;
    }
    const centralOffset = offset;
    const centralParts = [];
    for (const entry of entries) {
        const header = Buffer.alloc(46);
        header.writeUInt32LE(0x0201_4b50, 0);
        header.writeUInt16LE(0x0314, 4);
        header.writeUInt16LE(20, 6);
        header.writeUInt16LE(0x0800, 8);
        header.writeUInt16LE(0, 10);
        header.writeUInt16LE(0, 12);
        header.writeUInt16LE(33, 14);
        header.writeUInt32LE(entry.crc, 16);
        header.writeUInt32LE(entry.contents.length, 20);
        header.writeUInt32LE(entry.contents.length, 24);
        header.writeUInt16LE(entry.name.length, 28);
        header.writeUInt16LE(0, 30);
        header.writeUInt16LE(0, 32);
        header.writeUInt16LE(0, 34);
        header.writeUInt16LE(0, 36);
        header.writeUInt32LE((0o100644 << 16) >>> 0, 38);
        header.writeUInt32LE(entry.offset, 42);
        centralParts.push(header, entry.name);
        offset += header.length + entry.name.length;
    }
    const centralSize = offset - centralOffset;
    if (entries.length > 0xffff || centralOffset > 0xffff_ffff || centralSize > 0xffff_ffff) {
        throw new CliError("ZIP64_REQUIRED", "The publication is too large for the deterministic ZIP format.", {
            exitCode: ExitCode.LocalIo,
        });
    }
    const end = Buffer.alloc(22);
    end.writeUInt32LE(0x0605_4b50, 0);
    end.writeUInt16LE(0, 4);
    end.writeUInt16LE(0, 6);
    end.writeUInt16LE(entries.length, 8);
    end.writeUInt16LE(entries.length, 10);
    end.writeUInt32LE(centralSize, 12);
    end.writeUInt32LE(centralOffset, 16);
    end.writeUInt16LE(0, 20);
    return Buffer.concat([...localParts, ...centralParts, end]);
}
async function createDirectoryArtifact(outputPath, files) {
    const stage = join(dirname(outputPath), `.${basename(outputPath)}.manse-${process.pid}-${randomBytes(6).toString("hex")}`);
    try {
        await mkdir(stage, { recursive: false, mode: 0o755 });
        for (const file of files) {
            const destination = join(stage, ...file.relativePath.split("/"));
            await mkdir(dirname(destination), { recursive: true, mode: 0o755 });
            await copyFile(file.absolutePath, destination);
            await chmod(destination, 0o644);
            await utimes(destination, FIXED_TIMESTAMP, FIXED_TIMESTAMP);
        }
        const directories = new Set([stage]);
        for (const file of files) {
            let current = dirname(join(stage, ...file.relativePath.split("/")));
            while (current !== dirname(stage) && current.startsWith(stage)) {
                directories.add(current);
                if (current === stage)
                    break;
                current = dirname(current);
            }
        }
        for (const directory of [...directories].sort((left, right) => right.length - left.length)) {
            await chmod(directory, 0o755);
            await utimes(directory, FIXED_TIMESTAMP, FIXED_TIMESTAMP);
        }
        await rename(stage, outputPath);
    }
    catch (error) {
        await rm(stage, { recursive: true, force: true }).catch(() => undefined);
        if (error instanceof CliError)
            throw error;
        throw new CliError("PACK_WRITE_FAILED", `Could not create publication directory ${outputPath}.`, {
            cause: error,
            exitCode: ExitCode.LocalIo,
        });
    }
}
export async function packPublication(rawProject, rawOutput, cwd) {
    const projectRoot = resolveUserPath(rawProject, cwd);
    const outputPath = resolveUserPath(rawOutput, cwd);
    const deployRoot = await findDeployRoot(projectRoot);
    await assertOutputOutsideInput(projectRoot, outputPath);
    if (await pathExists(outputPath)) {
        throw new CliError("OUTPUT_EXISTS", `Refusing to overwrite existing output: ${outputPath}`, {
            exitCode: ExitCode.Conflict,
        });
    }
    await validateProjectRoot(deployRoot);
    await assertNoRuntimeCdn(deployRoot);
    const walked = await walkRegularFiles(deployRoot);
    if (walked.length > MAX_ARTIFACT_FILES) {
        throw new CliError("TOO_MANY_FILES", `Publication artifacts may contain at most ${MAX_ARTIFACT_FILES} files.`, {
            exitCode: ExitCode.LocalIo,
        });
    }
    const totalBytes = walked.reduce((total, file) => total + file.size, 0);
    if (totalBytes > MAX_ARTIFACT_BYTES) {
        throw new CliError("ARTIFACT_TOO_LARGE", "Publication artifacts may not exceed 256 MiB.", {
            exitCode: ExitCode.LocalIo,
        });
    }
    for (const file of walked)
        assertPublishablePath(file.relativePath);
    const files = [];
    for (const file of walked) {
        const contents = await readFile(file.absolutePath);
        files.push({ ...file, sha256: sha256(contents) });
    }
    files.sort((left, right) => compareStrings(left.relativePath, right.relativePath));
    if (extname(outputPath).toLowerCase() === ".zip") {
        const archive = await createDeterministicZip(files);
        const temporary = `${outputPath}.manse-${process.pid}-${randomBytes(6).toString("hex")}.tmp`;
        try {
            await mkdir(dirname(outputPath), { recursive: true });
            await writeFile(temporary, archive, { flag: "wx", mode: 0o600 });
            await rename(temporary, outputPath);
        }
        catch (error) {
            await rm(temporary, { force: true }).catch(() => undefined);
            throw new CliError("PACK_WRITE_FAILED", `Could not create ${outputPath}.`, {
                cause: error,
                exitCode: ExitCode.LocalIo,
            });
        }
        return { deployRoot, files, kind: "zip", outputPath, sha256: sha256(archive) };
    }
    await mkdir(dirname(outputPath), { recursive: true });
    await createDirectoryArtifact(outputPath, files);
    return { deployRoot, files, kind: "directory", outputPath };
}
//# sourceMappingURL=pack.js.map