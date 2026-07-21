export declare const MAX_JSON_BYTES: number;
export declare function canonicalJson(value: unknown): string;
export declare function sha256(value: Uint8Array | string): string;
export declare function readJsonFile(filePath: string): Promise<unknown>;
export declare function atomicWriteFile(filePath: string, contents: Uint8Array | string): Promise<void>;
//# sourceMappingURL=json.d.ts.map