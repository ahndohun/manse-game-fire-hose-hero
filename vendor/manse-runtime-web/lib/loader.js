import { parseEpisodePack } from "@manse/schema";
const MAX_PACK_JSON_BYTES = 2 * 1024 * 1024;
export async function loadEpisodePack(source, platform) {
    if (typeof source === "string" || source instanceof URL) {
        return loadEpisodePackUrl(source, platform);
    }
    if (isWrappedPackSource(source)) {
        const baseUrl = resolvePackBaseUrl(source.baseUrl, platform);
        return { pack: parseEpisodePack(source.pack), baseUrl };
    }
    return {
        pack: parseEpisodePack(source),
        baseUrl: new URL(".", platform.location.href),
    };
}
async function loadEpisodePackUrl(source, platform) {
    const url = new URL(source.toString(), platform.location.href);
    assertLocalPackUrl(url, platform);
    const response = await platform.fetch(url, {
        method: "GET",
        credentials: "same-origin",
        cache: "default",
        headers: { accept: "application/json" },
    });
    if (!response.ok) {
        throw new Error(`Unable to load Manse pack (${response.status} ${response.statusText}).`);
    }
    const declaredLength = Number(response.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_PACK_JSON_BYTES) {
        throw new Error("Manse pack JSON exceeds the 2 MiB runtime limit.");
    }
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > MAX_PACK_JSON_BYTES) {
        throw new Error("Manse pack JSON exceeds the 2 MiB runtime limit.");
    }
    let input;
    try {
        input = JSON.parse(text);
    }
    catch (error) {
        throw new Error("Manse pack is not valid JSON.", { cause: error });
    }
    return { pack: parseEpisodePack(input), baseUrl: new URL(".", url) };
}
export function resolvePackAssetUrl(pack, assetId, baseUrl) {
    const asset = [...pack.assets.images, ...pack.assets.audio].find((candidate) => candidate.id === assetId);
    if (asset === undefined)
        throw new Error(`Unknown pack asset '${assetId}'.`);
    return resolveSafeRelativeUrl(asset.path, baseUrl);
}
export function resolveSafeRelativeUrl(path, baseUrl) {
    if (path.trim() === "" ||
        path.startsWith("/") ||
        path.startsWith("\\") ||
        path.startsWith("//") ||
        path.includes("\\") ||
        path.split("/").includes("..") ||
        /^[a-z][a-z\d+.-]*:/iu.test(path)) {
        throw new Error(`Pack asset path '${path}' is not a safe relative path.`);
    }
    const url = new URL(path, baseUrl);
    if (url.origin !== baseUrl.origin || !url.pathname.startsWith(baseUrl.pathname)) {
        throw new Error(`Pack asset path '${path}' escapes the pack directory.`);
    }
    return url;
}
function resolvePackBaseUrl(value, platform) {
    const url = value === undefined
        ? new URL(".", platform.location.href)
        : new URL(value.toString(), platform.location.href);
    assertLocalPackUrl(url, platform);
    return url.pathname.endsWith("/") ? url : new URL("./", url);
}
function assertLocalPackUrl(url, platform) {
    const expectedOrigin = platform.location.origin === "null"
        ? new URL(platform.location.href).origin
        : platform.location.origin;
    if (url.origin !== expectedOrigin && url.protocol !== "file:") {
        throw new Error("Runtime packs must be bundled on the same Site origin.");
    }
    if (url.username !== "" || url.password !== "") {
        throw new Error("Pack URLs must not contain credentials.");
    }
}
function isWrappedPackSource(value) {
    return "pack" in value;
}
//# sourceMappingURL=loader.js.map