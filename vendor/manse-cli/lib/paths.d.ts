export interface WalkedFile {
    readonly absolutePath: string;
    readonly relativePath: string;
    readonly size: number;
}
export declare function resolveUserPath(value: string, cwd: string): string;
export declare function toPosixPath(value: string): string;
export declare function relativePosix(from: string, to: string): string;
export declare function isPathWithin(parent: string, candidate: string): boolean;
export declare function assertExistingDirectory(path: string): Promise<void>;
export declare function assertOutputOutsideInput(input: string, output: string): Promise<void>;
export declare function pathExists(path: string): Promise<boolean>;
export declare function walkRegularFiles(root: string): Promise<WalkedFile[]>;
//# sourceMappingURL=paths.d.ts.map