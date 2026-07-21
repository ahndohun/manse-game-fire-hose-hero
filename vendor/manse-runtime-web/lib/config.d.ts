import type { DeviceTier, MediaPipeAssetOptions, ProviderKind, ProviderPreference, RuntimePlatform, TierPreference } from "./types.js";
export interface TierProfile {
    readonly tier: DeviceTier;
    readonly inferenceHz: number;
    readonly maxDevicePixelRatio: number;
    readonly model: "full" | "lite";
    readonly particleCount: number;
    readonly targetScale: number;
    readonly dwellScale: number;
    /** Lite models at low frame rates jitter more; motion thresholds scale up. */
    readonly noiseScale: number;
}
export declare const TIER_PROFILES: Readonly<Record<DeviceTier, TierProfile>>;
export declare const DEFAULT_MEDIAPIPE_ASSETS: MediaPipeAssetOptions;
export interface RuntimeOverrides {
    readonly provider: ProviderKind | null;
    readonly tier: DeviceTier | null;
}
export declare function parseRuntimeOverrides(search: string): RuntimeOverrides;
export declare function resolveProvider(preference: ProviderPreference, override: ProviderKind | null): ProviderKind;
export declare function resolveTier(preference: TierPreference, override: DeviceTier | null, document: Document): DeviceTier;
export declare function mergeMediaPipeAssets(overrides: Partial<MediaPipeAssetOptions> | undefined, platform: RuntimePlatform): MediaPipeAssetOptions;
export declare function assertSameOriginRuntimeUrl(value: string, location: Pick<Location, "href" | "origin">, label?: string): URL;
//# sourceMappingURL=config.d.ts.map