import { CatalogSchema, CatalogSnapshotSchema, } from "./catalog.js";
import { EpisodePackSchema } from "./episode.js";
import { ManseGameManifestSchema } from "./manifest.js";
import { PlayerProfileSchema, SessionStatsSchema } from "./profile.js";
import { PackProvenanceSchema } from "./provenance.js";
export function parseGameManifest(input) {
    return ManseGameManifestSchema.parse(input);
}
export function safeParseGameManifest(input) {
    return ManseGameManifestSchema.safeParse(input);
}
export function parseCatalog(input) {
    return CatalogSchema.parse(input);
}
export function safeParseCatalog(input) {
    return CatalogSchema.safeParse(input);
}
export function parseCatalogSnapshot(input) {
    return CatalogSnapshotSchema.parse(input);
}
export function safeParseCatalogSnapshot(input) {
    return CatalogSnapshotSchema.safeParse(input);
}
export function parseEpisodePack(input) {
    return EpisodePackSchema.parse(input);
}
export function safeParseEpisodePack(input) {
    return EpisodePackSchema.safeParse(input);
}
export function parsePackProvenance(input) {
    return PackProvenanceSchema.parse(input);
}
export function safeParsePackProvenance(input) {
    return PackProvenanceSchema.safeParse(input);
}
export function parsePlayerProfile(input) {
    return PlayerProfileSchema.parse(input);
}
export function safeParsePlayerProfile(input) {
    return PlayerProfileSchema.safeParse(input);
}
export function parseSessionStats(input) {
    return SessionStatsSchema.parse(input);
}
export function safeParseSessionStats(input) {
    return SessionStatsSchema.safeParse(input);
}
//# sourceMappingURL=parsers.js.map