export const TIER_PROFILES = {
    S: {
        tier: "S",
        inferenceHz: 30,
        maxDevicePixelRatio: 2,
        model: "full",
        particleCount: 72,
        targetScale: 1,
        dwellScale: 1,
        noiseScale: 1,
    },
    A: {
        tier: "A",
        inferenceHz: 15,
        maxDevicePixelRatio: 1.5,
        model: "lite",
        particleCount: 44,
        targetScale: 1,
        dwellScale: 1,
        noiseScale: 1.1,
    },
    B: {
        tier: "B",
        inferenceHz: 12,
        maxDevicePixelRatio: 1,
        model: "lite",
        particleCount: 20,
        targetScale: 1.12,
        dwellScale: 0.9,
        noiseScale: 1.2,
    },
    C: {
        tier: "C",
        inferenceHz: 10,
        maxDevicePixelRatio: 1,
        model: "lite",
        particleCount: 8,
        targetScale: 1.25,
        dwellScale: 0.8,
        noiseScale: 1.35,
    },
};
export const DEFAULT_MEDIAPIPE_ASSETS = {
    wasmBaseUrl: "/vendor/mediapipe/wasm",
    fullModelUrl: "/models/pose_landmarker_full.task",
    liteModelUrl: "/models/pose_landmarker_lite.task",
};
export function parseRuntimeOverrides(search) {
    const query = new URLSearchParams(search);
    const providerValue = query.get("provider")?.toLowerCase();
    const provider = providerValue === "mediapipe" || providerValue === "simulated" || providerValue === "replay"
        ? providerValue
        : providerValue === "mouse"
            ? "simulated"
            : null;
    const tierValue = query.get("tier")?.toUpperCase();
    const tier = tierValue === "S" || tierValue === "A" || tierValue === "B" || tierValue === "C"
        ? tierValue
        : null;
    return { provider, tier };
}
export function resolveProvider(preference, override) {
    if (override !== null)
        return override;
    if (preference !== "auto")
        return preference;
    return "mediapipe";
}
export function resolveTier(preference, override, document) {
    if (override !== null)
        return override;
    if (preference !== "auto")
        return preference;
    const navigatorWithHints = typeof navigator === "undefined"
        ? undefined
        : navigator;
    const cores = navigatorWithHints?.hardwareConcurrency ?? 4;
    const memory = navigatorWithHints?.deviceMemory ?? 4;
    let webGl2 = false;
    try {
        webGl2 = document.createElement("canvas").getContext("webgl2") !== null;
    }
    catch {
        webGl2 = false;
    }
    if (!webGl2 || cores <= 2 || memory <= 2)
        return "C";
    if (cores <= 4 || memory <= 4)
        return "B";
    if (cores >= 8 && memory >= 8)
        return "S";
    return "A";
}
export function mergeMediaPipeAssets(overrides, platform) {
    const merged = { ...DEFAULT_MEDIAPIPE_ASSETS, ...overrides };
    for (const [name, value] of Object.entries(merged)) {
        assertSameOriginRuntimeUrl(value, platform.location, name);
    }
    return merged;
}
export function assertSameOriginRuntimeUrl(value, location, label = "asset URL") {
    if (value.trim() === "" || value.startsWith("//")) {
        throw new Error(`${label} must be a non-empty same-origin Site URL.`);
    }
    const url = new URL(value, location.href);
    const pageOrigin = location.origin === "null" ? new URL(location.href).origin : location.origin;
    if (url.username !== "" || url.password !== "") {
        throw new Error(`${label} must not contain credentials.`);
    }
    if (url.origin !== pageOrigin && url.protocol !== "file:") {
        throw new Error(`${label} must be hosted by the game Site; cross-origin runtime assets are not allowed.`);
    }
    return url;
}
//# sourceMappingURL=config.js.map