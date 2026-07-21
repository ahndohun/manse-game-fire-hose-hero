export type FetchFunction = (input: string | URL, init?: RequestInit) => Promise<Response>;
export type ResolveHostname = (hostname: string) => Promise<readonly string[]>;
export interface NetworkDependencies {
    readonly fetch: FetchFunction;
    readonly resolveHostname: ResolveHostname;
}
export declare const defaultNetworkDependencies: NetworkDependencies;
export declare function parsePublicManifestUrl(value: string): URL;
export declare function fetchPublicManifest(rawUrl: string, dependencies?: NetworkDependencies): Promise<Record<string, unknown>>;
//# sourceMappingURL=network.d.ts.map