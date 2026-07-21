import { type EpisodePack } from "@manse/schema";
import type { EpisodePackSource, LoadedEpisodePack, RuntimePlatform } from "./types.js";
export declare function loadEpisodePack(source: EpisodePackSource, platform: RuntimePlatform): Promise<LoadedEpisodePack>;
export declare function resolvePackAssetUrl(pack: EpisodePack, assetId: string, baseUrl: URL): URL;
export declare function resolveSafeRelativeUrl(path: string, baseUrl: URL): URL;
//# sourceMappingURL=loader.d.ts.map