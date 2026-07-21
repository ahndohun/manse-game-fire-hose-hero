#!/usr/bin/env node
import type { NetworkDependencies } from "./network.js";
import type { WritableOutput } from "./types.js";
export interface CliDependencies {
    readonly cwd?: string;
    readonly network?: NetworkDependencies;
    readonly stderr?: WritableOutput;
    readonly stdout?: WritableOutput;
}
export declare function runCli(argv: readonly string[], dependencies?: CliDependencies): Promise<number>;
export declare function isDirectCliInvocation(moduleUrl: string, invokedPath: string | undefined): boolean;
//# sourceMappingURL=cli.d.ts.map