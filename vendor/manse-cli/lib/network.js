import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { CliError, ExitCode } from "./errors.js";
import { validateManifest } from "./schema-adapter.js";
import { MANIFEST_URL_PATH } from "./schema-adapter.js";
const MAX_MANIFEST_BYTES = 1024 * 1024;
const MAX_REDIRECTS = 3;
const NETWORK_TIMEOUT_MS = 10_000;
export const defaultNetworkDependencies = {
    fetch: globalThis.fetch.bind(globalThis),
    async resolveHostname(hostname) {
        if (isIP(hostname) !== 0)
            return [hostname];
        const results = await lookup(hostname, { all: true, verbatim: true });
        return results.map((entry) => entry.address);
    },
};
function isPrivateIpv4(address) {
    const parts = address.split(".").map(Number);
    if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255))
        return true;
    const [a = 0, b = 0] = parts;
    return a === 0
        || a === 10
        || a === 127
        || (a === 100 && b >= 64 && b <= 127)
        || (a === 169 && b === 254)
        || (a === 172 && b >= 16 && b <= 31)
        || (a === 192 && b === 168)
        || (a === 198 && (b === 18 || b === 19))
        || a >= 224;
}
function isPrivateIpv6(address) {
    const normalized = address.toLowerCase().split("%")[0] ?? "";
    if (normalized === "::" || normalized === "::1")
        return true;
    if (normalized.startsWith("fc") || normalized.startsWith("fd"))
        return true;
    if (/^fe[89ab]/u.test(normalized))
        return true;
    if (normalized.startsWith("ff"))
        return true;
    const mapped = normalized.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/u)?.[1];
    if (mapped !== undefined)
        return isPrivateIpv4(mapped);
    const mappedHex = normalized.match(/::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/u);
    if (mappedHex !== null) {
        const high = Number.parseInt(mappedHex[1] ?? "0", 16);
        const low = Number.parseInt(mappedHex[2] ?? "0", 16);
        return isPrivateIpv4(`${high >>> 8}.${high & 0xff}.${low >>> 8}.${low & 0xff}`);
    }
    return false;
}
function isPrivateAddress(address) {
    const version = isIP(address);
    if (version === 4)
        return isPrivateIpv4(address);
    if (version === 6)
        return isPrivateIpv6(address);
    return true;
}
export function parsePublicManifestUrl(value) {
    let url;
    try {
        url = new URL(value);
    }
    catch (error) {
        throw new CliError("INVALID_MANIFEST_URL", "The manifest URL is not a valid absolute URL.", {
            cause: error,
            exitCode: ExitCode.Usage,
        });
    }
    if (url.protocol !== "https:") {
        throw new CliError("HTTPS_REQUIRED", "Public Manse manifests must use HTTPS.", {
            exitCode: ExitCode.Network,
        });
    }
    if (url.username !== "" || url.password !== "" || url.search !== "" || url.hash !== "") {
        throw new CliError("UNSAFE_MANIFEST_URL", "Manifest URLs may not contain credentials, query parameters, or fragments.", { exitCode: ExitCode.Network });
    }
    if (url.port !== "" && url.port !== "443") {
        throw new CliError("UNSAFE_MANIFEST_PORT", "Manifest URLs must use the default HTTPS port.", {
            exitCode: ExitCode.Network,
        });
    }
    if (url.pathname !== MANIFEST_URL_PATH) {
        throw new CliError("WRONG_MANIFEST_PATH", `Manifest URLs must use the exact path ${MANIFEST_URL_PATH}.`, { exitCode: ExitCode.Network });
    }
    const hostname = url.hostname.toLowerCase();
    if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
        throw new CliError("PUBLIC_HOST_REQUIRED", "Catalog manifests must be hosted on a public site.", {
            exitCode: ExitCode.Network,
        });
    }
    return url;
}
async function assertPublicResolution(url, resolveHostname) {
    let addresses;
    try {
        addresses = await resolveHostname(url.hostname);
    }
    catch (error) {
        throw new CliError("DNS_FAILED", `Could not resolve ${url.hostname}.`, {
            cause: error,
            exitCode: ExitCode.Network,
        });
    }
    if (addresses.length === 0 || addresses.some(isPrivateAddress)) {
        throw new CliError("PRIVATE_NETWORK_BLOCKED", "Manifest URLs may not resolve to private, local, or reserved network addresses.", { exitCode: ExitCode.Network });
    }
}
function getUrlField(manifest, key) {
    const value = manifest[key];
    if (typeof value === "string")
        return value;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        const url = value.url;
        return typeof url === "string" ? url : undefined;
    }
    return undefined;
}
function assertManifestOriginPolicy(manifest, manifestUrl) {
    const gameUrlValue = getUrlField(manifest, "gameUrl");
    if (gameUrlValue !== undefined) {
        const gameUrl = new URL(gameUrlValue);
        if (gameUrl.protocol !== "https:" || gameUrl.origin !== manifestUrl.origin) {
            throw new CliError("GAME_ORIGIN_MISMATCH", "The manifest gameUrl must use HTTPS and the same Site origin as the manifest.", { exitCode: ExitCode.Network });
        }
    }
    const thumbnailValue = getUrlField(manifest, "thumbnail");
    if (thumbnailValue !== undefined) {
        const thumbnailUrl = new URL(thumbnailValue, manifestUrl);
        if (thumbnailUrl.protocol !== "https:" || thumbnailUrl.origin !== manifestUrl.origin) {
            throw new CliError("THUMBNAIL_ORIGIN_MISMATCH", "The public thumbnail must be served from the same Site origin as the manifest.", { exitCode: ExitCode.Network });
        }
        if (/\.(?:html?|svg)(?:$|[?#])/iu.test(thumbnailUrl.pathname)) {
            throw new CliError("UNSAFE_THUMBNAIL", "Catalog thumbnails must be safe raster images, not HTML or SVG.", {
                exitCode: ExitCode.Network,
            });
        }
    }
}
async function readBoundedResponse(response) {
    const declaredLength = Number(response.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_MANIFEST_BYTES) {
        throw new CliError("REMOTE_MANIFEST_TOO_LARGE", "The remote manifest exceeds the 1 MiB limit.", {
            exitCode: ExitCode.Network,
        });
    }
    const contentType = response.headers.get("content-type");
    if (contentType !== null && !/(?:application|text)\/(?:[a-z0-9.+-]*\+)?json\b/iu.test(contentType)) {
        throw new CliError("REMOTE_CONTENT_TYPE", "The manifest response must use a JSON content type.", {
            exitCode: ExitCode.Network,
        });
    }
    if (response.body === null)
        return "";
    const reader = response.body.getReader();
    const chunks = [];
    let totalBytes = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            totalBytes += value.byteLength;
            if (totalBytes > MAX_MANIFEST_BYTES) {
                await reader.cancel();
                throw new CliError("REMOTE_MANIFEST_TOO_LARGE", "The remote manifest exceeds the 1 MiB limit.", {
                    exitCode: ExitCode.Network,
                });
            }
            chunks.push(value);
        }
    }
    finally {
        reader.releaseLock();
    }
    return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("utf8");
}
async function fetchSameOriginResource(rawUrl, expectedOrigin, kind, dependencies) {
    let currentUrl;
    try {
        currentUrl = new URL(rawUrl);
    }
    catch (error) {
        throw new CliError("INVALID_RESOURCE_URL", `The manifest ${kind} URL is invalid.`, {
            cause: error,
            exitCode: ExitCode.Network,
        });
    }
    if (currentUrl.protocol !== "https:"
        || currentUrl.origin !== expectedOrigin
        || currentUrl.username !== ""
        || currentUrl.password !== "") {
        throw new CliError("RESOURCE_ORIGIN_MISMATCH", `The ${kind} must use the public game Site origin.`, {
            exitCode: ExitCode.Network,
        });
    }
    for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
        await assertPublicResolution(currentUrl, dependencies.resolveHostname);
        let response;
        try {
            response = await dependencies.fetch(currentUrl, {
                headers: { accept: kind === "thumbnail" ? "image/avif,image/webp,image/png,image/jpeg" : "text/html" },
                redirect: "manual",
                signal: AbortSignal.timeout(NETWORK_TIMEOUT_MS),
            });
        }
        catch (error) {
            throw new CliError("RESOURCE_FETCH_FAILED", `Could not reach the public ${kind}.`, {
                cause: error,
                exitCode: ExitCode.Network,
            });
        }
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get("location");
            if (location === null || redirectCount === MAX_REDIRECTS) {
                throw new CliError("UNSAFE_REDIRECT", `The public ${kind} returned an invalid redirect.`, {
                    exitCode: ExitCode.Network,
                });
            }
            const redirected = new URL(location, currentUrl);
            if (redirected.protocol !== "https:" || redirected.origin !== expectedOrigin) {
                throw new CliError("CROSS_ORIGIN_REDIRECT", `The public ${kind} redirected outside its Site.`, {
                    exitCode: ExitCode.Network,
                });
            }
            currentUrl = redirected;
            continue;
        }
        if (!response.ok) {
            throw new CliError("RESOURCE_HTTP_ERROR", `The public ${kind} returned HTTP ${response.status}.`, {
                exitCode: ExitCode.Network,
            });
        }
        if (kind === "thumbnail") {
            const mediaType = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
            if (!new Set(["image/avif", "image/jpeg", "image/png", "image/webp"]).has(mediaType ?? "")) {
                throw new CliError("UNSAFE_THUMBNAIL_MEDIA", "The public thumbnail response is not an allowed raster image.", {
                    exitCode: ExitCode.Network,
                });
            }
            const size = Number(response.headers.get("content-length"));
            if (Number.isFinite(size) && size > 8 * 1024 * 1024) {
                throw new CliError("THUMBNAIL_TOO_LARGE", "The public thumbnail exceeds the 8 MiB catalog limit.", {
                    exitCode: ExitCode.Network,
                });
            }
        }
        else {
            const mediaType = response.headers.get("content-type")?.toLowerCase();
            if (mediaType !== undefined && !mediaType.includes("text/html")) {
                throw new CliError("GAME_CONTENT_TYPE", "The public game URL must serve an HTML page.", {
                    exitCode: ExitCode.Network,
                });
            }
        }
        await response.body?.cancel().catch(() => undefined);
        return;
    }
}
export async function fetchPublicManifest(rawUrl, dependencies = defaultNetworkDependencies) {
    const initialUrl = parsePublicManifestUrl(rawUrl);
    let currentUrl = initialUrl;
    for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
        await assertPublicResolution(currentUrl, dependencies.resolveHostname);
        let response;
        try {
            response = await dependencies.fetch(currentUrl, {
                headers: { accept: "application/json" },
                redirect: "manual",
                signal: AbortSignal.timeout(NETWORK_TIMEOUT_MS),
            });
        }
        catch (error) {
            throw new CliError("MANIFEST_FETCH_FAILED", `Could not fetch ${currentUrl.toString()}.`, {
                cause: error,
                exitCode: ExitCode.Network,
            });
        }
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get("location");
            if (location === null || redirectCount === MAX_REDIRECTS) {
                throw new CliError("UNSAFE_REDIRECT", "The manifest returned an invalid or excessive redirect.", {
                    exitCode: ExitCode.Network,
                });
            }
            const redirected = parsePublicManifestUrl(new URL(location, currentUrl).toString());
            if (redirected.origin !== initialUrl.origin) {
                throw new CliError("CROSS_ORIGIN_REDIRECT", "Manifest redirects must stay on the submitted Site origin.", {
                    exitCode: ExitCode.Network,
                });
            }
            currentUrl = redirected;
            continue;
        }
        if (!response.ok) {
            throw new CliError("MANIFEST_HTTP_ERROR", `The manifest request returned HTTP ${response.status}.`, { exitCode: ExitCode.Network });
        }
        const text = await readBoundedResponse(response);
        let input;
        try {
            input = JSON.parse(text);
        }
        catch (error) {
            throw new CliError("REMOTE_INVALID_JSON", "The public manifest response is not valid JSON.", {
                cause: error,
                exitCode: ExitCode.Network,
            });
        }
        const manifest = validateManifest(input, currentUrl.toString());
        assertManifestOriginPolicy(manifest, initialUrl);
        const gameUrl = getUrlField(manifest, "gameUrl");
        const thumbnailUrl = getUrlField(manifest, "thumbnail");
        if (gameUrl !== undefined)
            await fetchSameOriginResource(gameUrl, initialUrl.origin, "game", dependencies);
        if (thumbnailUrl !== undefined) {
            await fetchSameOriginResource(new URL(thumbnailUrl, initialUrl).toString(), initialUrl.origin, "thumbnail", dependencies);
        }
        return manifest;
    }
    throw new CliError("MANIFEST_FETCH_FAILED", "The public manifest could not be fetched.", {
        exitCode: ExitCode.Network,
    });
}
//# sourceMappingURL=network.js.map