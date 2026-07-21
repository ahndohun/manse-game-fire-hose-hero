#!/usr/bin/env node
import { realpathSync } from "node:fs";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { addCatalogEntry, buildCatalogSnapshot } from "./catalog.js";
import { readProjectManifest, validateTarget } from "./documents.js";
import { runDoctor } from "./doctor.js";
import { CliError, ExitCode, toCliError } from "./errors.js";
import { canonicalJson } from "./json.js";
import { defaultNetworkDependencies } from "./network.js";
import { formatDiagnostic, writeJsonResult } from "./output.js";
import { packPublication } from "./pack.js";
import { relativePosix } from "./paths.js";
const HELP = `Manse CLI — validate and publish open motion games safely

Usage:
  manse doctor [--json]
  manse validate <project-or-pack> [--json]
  manse manifest <project> [--json]
  manse catalog add <manifest-url> --catalog <path> [--json]
  manse catalog build <catalog> --out <path> [--json]
  manse pack <project> --out <archive.zip-or-directory> [--json]

The CLI never calls OpenAI or Sites APIs. The Manse Codex plugin orchestrates Sites.
`;
function parseInvocation(argv) {
    const jsonCount = argv.filter((arg) => arg === "--json").length;
    if (jsonCount > 1) {
        throw new CliError("DUPLICATE_OPTION", "--json may be provided only once.", { exitCode: ExitCode.Usage });
    }
    const args = argv.filter((arg) => arg !== "--json");
    const command = args.shift();
    if (command === undefined)
        return { args: [], command: "help", json: jsonCount === 1 };
    if (command === "--help" || command === "-h" || command === "help") {
        return { args, command: "help", json: jsonCount === 1 };
    }
    if (command === "--version" || command === "-V") {
        return { args, command: "version", json: jsonCount === 1 };
    }
    return { args, command, json: jsonCount === 1 };
}
function parseCommandArgs(args, stringOptions = []) {
    const options = Object.fromEntries([
        ...stringOptions.map((name) => [name, { type: "string" }]),
        ["help", { type: "boolean", short: "h" }],
    ]);
    try {
        const parsed = parseArgs({ args: [...args], allowPositionals: true, options, strict: true });
        const normalized = {};
        for (const [name, value] of Object.entries(parsed.values)) {
            if (Array.isArray(value)) {
                throw new CliError("DUPLICATE_OPTION", `--${name} may be provided only once.`, {
                    exitCode: ExitCode.Usage,
                });
            }
            normalized[name] = value;
        }
        return { options: normalized, positionals: parsed.positionals };
    }
    catch (error) {
        throw new CliError("INVALID_ARGUMENTS", error instanceof Error ? error.message : "Invalid command arguments.", {
            cause: error,
            exitCode: ExitCode.Usage,
        });
    }
}
function requirePositionals(positionals, count, usage) {
    if (positionals.length !== count) {
        throw new CliError("INVALID_ARGUMENTS", `Expected ${count} argument${count === 1 ? "" : "s"}. Usage: ${usage}`, {
            exitCode: ExitCode.Usage,
        });
    }
}
function requireStringOption(options, name, usage) {
    const value = options[name];
    if (typeof value !== "string" || value.length === 0) {
        throw new CliError("MISSING_OPTION", `--${name} is required. Usage: ${usage}`, {
            exitCode: ExitCode.Usage,
        });
    }
    return value;
}
async function execute(invocation, cwd, network) {
    switch (invocation.command) {
        case "help":
            return { data: { help: HELP }, message: HELP.trimEnd() };
        case "version":
            return { data: { version: "0.1.0" }, message: "0.1.0" };
        case "doctor": {
            const { options, positionals } = parseCommandArgs(invocation.args);
            if (options.help === true)
                return { data: { help: "Usage: manse doctor [--json]" }, message: "Usage: manse doctor [--json]" };
            requirePositionals(positionals, 0, "manse doctor");
            const checks = await runDoctor(cwd);
            return { data: { checks }, message: `Manse CLI is ready. ${checks.length} checks passed.` };
        }
        case "validate": {
            const { options, positionals } = parseCommandArgs(invocation.args);
            if (options.help === true)
                return { data: { help: "Usage: manse validate <project-or-pack>" }, message: "Usage: manse validate <project-or-pack>" };
            requirePositionals(positionals, 1, "manse validate <project-or-pack>");
            const documents = await validateTarget(positionals[0] ?? "", cwd);
            return {
                data: { documents: documents.map((document) => ({ kind: document.kind, path: relativePosix(cwd, document.path) })) },
                message: `Valid Manse content: ${documents.length} document${documents.length === 1 ? "" : "s"} checked.`,
            };
        }
        case "manifest": {
            const { options, positionals } = parseCommandArgs(invocation.args);
            if (options.help === true)
                return { data: { help: "Usage: manse manifest <project>" }, message: "Usage: manse manifest <project>" };
            requirePositionals(positionals, 1, "manse manifest <project>");
            const manifest = await readProjectManifest(positionals[0] ?? "", cwd);
            return {
                artifacts: [{ kind: "manifest", path: relativePosix(cwd, manifest.path) }],
                data: manifest.document,
                message: canonicalJson(manifest.document).trimEnd(),
            };
        }
        case "catalog": {
            const operation = invocation.args[0];
            const rest = invocation.args.slice(1);
            if (operation === "add") {
                const { options, positionals } = parseCommandArgs(rest, ["catalog"]);
                if (options.help === true)
                    return { data: { help: "Usage: manse catalog add <manifest-url> --catalog <path>" }, message: "Usage: manse catalog add <manifest-url> --catalog <path>" };
                requirePositionals(positionals, 1, "manse catalog add <manifest-url> --catalog <path>");
                const catalogPath = requireStringOption(options, "catalog", "manse catalog add <manifest-url> --catalog <path>");
                const result = await addCatalogEntry(positionals[0] ?? "", catalogPath, cwd, network);
                return {
                    artifacts: [{ kind: "catalog", path: relativePosix(cwd, result.catalogPath) }],
                    changed: result.changed,
                    data: { manifest: result.manifest, manifestUrl: result.manifestUrl },
                    message: result.changed
                        ? `Added the public game to ${relativePosix(cwd, result.catalogPath)}.`
                        : "That public game is already in the catalog; no file was changed.",
                };
            }
            if (operation === "build") {
                const { options, positionals } = parseCommandArgs(rest, ["out"]);
                if (options.help === true)
                    return { data: { help: "Usage: manse catalog build <catalog> --out <path>" }, message: "Usage: manse catalog build <catalog> --out <path>" };
                requirePositionals(positionals, 1, "manse catalog build <catalog> --out <path>");
                const outputPath = requireStringOption(options, "out", "manse catalog build <catalog> --out <path>");
                const result = await buildCatalogSnapshot(positionals[0] ?? "", outputPath, cwd, network);
                return {
                    artifacts: [{ kind: "catalog-snapshot", path: relativePosix(cwd, result.outputPath) }],
                    changed: true,
                    data: { gameCount: Array.isArray(result.snapshot.games) ? result.snapshot.games.length : 0 },
                    message: `Built a static catalog snapshot at ${relativePosix(cwd, result.outputPath)}.`,
                };
            }
            throw new CliError("UNKNOWN_CATALOG_COMMAND", "Use `manse catalog add` or `manse catalog build`.", {
                exitCode: ExitCode.Usage,
            });
        }
        case "pack": {
            const { options, positionals } = parseCommandArgs(invocation.args, ["out"]);
            if (options.help === true)
                return { data: { help: "Usage: manse pack <project> --out <archive.zip-or-directory>" }, message: "Usage: manse pack <project> --out <archive.zip-or-directory>" };
            requirePositionals(positionals, 1, "manse pack <project> --out <archive.zip-or-directory>");
            const outputPath = requireStringOption(options, "out", "manse pack <project> --out <archive.zip-or-directory>");
            const result = await packPublication(positionals[0] ?? "", outputPath, cwd);
            return {
                artifacts: [{
                        kind: result.kind,
                        path: relativePosix(cwd, result.outputPath),
                        ...(result.sha256 === undefined ? {} : { sha256: result.sha256 }),
                    }],
                changed: true,
                data: {
                    deployRoot: relativePosix(cwd, result.deployRoot),
                    fileCount: result.files.length,
                    files: result.files.map((file) => ({ path: file.relativePath, sha256: file.sha256, size: file.size })),
                },
                message: `Created a deterministic ${result.kind} publication artifact at ${relativePosix(cwd, result.outputPath)}.`,
            };
        }
        default:
            throw new CliError("UNKNOWN_COMMAND", `Unknown command: ${invocation.command}. Run \`manse --help\`.`, {
                exitCode: ExitCode.Usage,
            });
    }
}
export async function runCli(argv, dependencies = {}) {
    const cwd = dependencies.cwd ?? process.cwd();
    const stdout = dependencies.stdout ?? process.stdout;
    const stderr = dependencies.stderr ?? process.stderr;
    const network = dependencies.network ?? defaultNetworkDependencies;
    let invocation;
    try {
        invocation = parseInvocation(argv);
    }
    catch (error) {
        const cliError = toCliError(error);
        const json = argv.includes("--json");
        if (json)
            writeJsonResult(stdout, "unknown", false, { diagnostics: cliError.diagnostics }, cwd);
        else {
            for (const diagnostic of cliError.diagnostics)
                stderr.write(`${formatDiagnostic(diagnostic, cwd)}\n`);
        }
        return cliError.exitCode;
    }
    try {
        const result = await execute(invocation, cwd, network);
        if (invocation.json) {
            writeJsonResult(stdout, invocation.command, true, result, cwd);
        }
        else {
            stdout.write(`${result.message}\n`);
        }
        return ExitCode.Success;
    }
    catch (error) {
        const cliError = toCliError(error);
        if (invocation.json) {
            writeJsonResult(stdout, invocation.command, false, { diagnostics: cliError.diagnostics }, cwd);
        }
        else {
            for (const diagnostic of cliError.diagnostics)
                stderr.write(`${formatDiagnostic(diagnostic, cwd)}\n`);
        }
        return cliError.exitCode;
    }
}
export function isDirectCliInvocation(moduleUrl, invokedPath) {
    if (invokedPath === undefined)
        return false;
    try {
        return realpathSync(fileURLToPath(moduleUrl)) === realpathSync(invokedPath);
    }
    catch {
        return false;
    }
}
if (isDirectCliInvocation(import.meta.url, process.argv[1])) {
    process.exitCode = await runCli(process.argv.slice(2));
}
//# sourceMappingURL=cli.js.map