import { pathExists, resolveUserPath } from "./paths.js";
import { atomicWriteFile, canonicalJson, readJsonFile } from "./json.js";
import { CliError, ExitCode } from "./errors.js";
import { fetchPublicManifest, parsePublicManifestUrl } from "./network.js";
import { validateCatalog, validateCatalogSnapshot } from "./schema-adapter.js";
function compareStrings(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
}
function asCatalogEntries(catalog, source) {
    if (!Array.isArray(catalog.games)) {
        throw new CliError("INVALID_CATALOG", `${source} does not contain a games array.`, {
            exitCode: ExitCode.Validation,
        });
    }
    return catalog.games.map((entry, index) => {
        if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
            throw new CliError("INVALID_CATALOG_ENTRY", `Catalog entry ${index + 1} is not an object.`, {
                exitCode: ExitCode.Validation,
            });
        }
        const manifestUrl = entry.manifestUrl;
        if (typeof manifestUrl !== "string") {
            throw new CliError("INVALID_CATALOG_ENTRY", `Catalog entry ${index + 1} has no manifestUrl.`, {
                exitCode: ExitCode.Validation,
            });
        }
        return { manifestUrl: parsePublicManifestUrl(manifestUrl).toString() };
    }).sort((left, right) => compareStrings(left.manifestUrl, right.manifestUrl));
}
async function readCatalog(catalogPath, allowMissing) {
    if (!(await pathExists(catalogPath))) {
        if (allowMissing)
            return validateCatalog({ schemaVersion: 1, games: [] }, catalogPath);
        throw new CliError("CATALOG_NOT_FOUND", `Catalog not found: ${catalogPath}`, {
            exitCode: ExitCode.LocalIo,
        });
    }
    return validateCatalog(await readJsonFile(catalogPath), catalogPath);
}
async function resolveEntries(entries, network) {
    const results = [];
    const pending = [...entries];
    const workerCount = Math.min(4, pending.length);
    await Promise.all(Array.from({ length: workerCount }, async () => {
        while (pending.length > 0) {
            const entry = pending.shift();
            if (entry === undefined)
                return;
            const manifest = await fetchPublicManifest(entry.manifestUrl, network);
            results.push({ manifestUrl: entry.manifestUrl, manifest });
        }
    }));
    return results.sort((left, right) => compareStrings(left.manifestUrl, right.manifestUrl));
}
function getIdentity(manifest, key) {
    const value = manifest[key];
    return typeof value === "string" ? value : undefined;
}
function assertUniqueManifests(entries) {
    for (const key of ["id", "slug", "gameUrl"]) {
        const seen = new Map();
        for (const entry of entries) {
            const value = getIdentity(entry.manifest, key);
            if (value === undefined)
                continue;
            const previous = seen.get(value);
            if (previous !== undefined && previous !== entry.manifestUrl) {
                throw new CliError(`DUPLICATE_${key.replace(/[A-Z]/gu, (letter) => `_${letter}`).toUpperCase()}`, `Two public manifests declare the same ${key}: ${value}`, { exitCode: ExitCode.Conflict });
            }
            seen.set(value, entry.manifestUrl);
        }
    }
}
export async function addCatalogEntry(rawManifestUrl, rawCatalogPath, cwd, network) {
    const manifestUrl = parsePublicManifestUrl(rawManifestUrl).toString();
    const catalogPath = resolveUserPath(rawCatalogPath, cwd);
    const catalog = await readCatalog(catalogPath, true);
    const entries = asCatalogEntries(catalog, catalogPath);
    const newManifest = await fetchPublicManifest(manifestUrl, network);
    const alreadyPresent = entries.some((entry) => entry.manifestUrl === manifestUrl);
    const nextEntries = alreadyPresent ? entries : [...entries, { manifestUrl }]
        .sort((left, right) => compareStrings(left.manifestUrl, right.manifestUrl));
    const resolvedExisting = await resolveEntries(nextEntries.filter((entry) => entry.manifestUrl !== manifestUrl), network);
    const resolved = [...resolvedExisting, { manifestUrl, manifest: newManifest }]
        .sort((left, right) => compareStrings(left.manifestUrl, right.manifestUrl));
    assertUniqueManifests(resolved);
    const nextCatalog = validateCatalog({ schemaVersion: 1, games: nextEntries }, catalogPath);
    if (!alreadyPresent)
        await atomicWriteFile(catalogPath, canonicalJson(nextCatalog));
    return {
        catalog: nextCatalog,
        catalogPath,
        changed: !alreadyPresent,
        manifest: newManifest,
        manifestUrl,
    };
}
export async function buildCatalogSnapshot(rawCatalogPath, rawOutputPath, cwd, network) {
    const catalogPath = resolveUserPath(rawCatalogPath, cwd);
    const outputPath = resolveUserPath(rawOutputPath, cwd);
    if (catalogPath === outputPath) {
        throw new CliError("OUTPUT_OVERLAPS_INPUT", "The catalog snapshot must use a different path from the source catalog.", {
            exitCode: ExitCode.Conflict,
        });
    }
    const catalog = await readCatalog(catalogPath, false);
    const entries = asCatalogEntries(catalog, catalogPath);
    const resolved = await resolveEntries(entries, network);
    assertUniqueManifests(resolved);
    const snapshot = validateCatalogSnapshot({ schemaVersion: 1, games: resolved }, outputPath);
    await atomicWriteFile(outputPath, canonicalJson(snapshot));
    return { catalogPath, outputPath, snapshot };
}
//# sourceMappingURL=catalog.js.map