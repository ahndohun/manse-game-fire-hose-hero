import { createHash } from "node:crypto";
import { cp, mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const publicRoot = resolve(projectRoot, "public");
const runtimeAssets = resolve(projectRoot, "vendor/manse-runtime-web/assets");
const wasmSource = resolve(projectRoot, "node_modules/@mediapipe/tasks-vision/wasm");
const provenance = JSON.parse(await readFile(resolve(runtimeAssets, "asset-provenance.json"), "utf8"));

await mkdir(resolve(publicRoot, "models"), { recursive: true });
await mkdir(resolve(publicRoot, "vendor/mediapipe/wasm"), { recursive: true });
for (const asset of provenance.assets) {
  const source = resolve(runtimeAssets, asset.path);
  const digest = createHash("sha256").update(await readFile(source)).digest("hex");
  if (digest !== asset.sha256) throw new Error(`Integrity mismatch for ${asset.path}.`);
  await cp(source, resolve(publicRoot, asset.path));
}
for (const [filename, expectedHash] of [
  ["vision_wasm_internal.js", "e7fd9858e8e8f221d9b96eddc11f8e077f263e0b7bbd79d3cbe882b134274f8c"],
  ["vision_wasm_internal.wasm", "6a5c64584c2ab61c763b6e204afbdbc7ce1caf7f5216187322bca8df94f646bc"],
  ["vision_wasm_nosimd_internal.js", "438d1fe8ff7f4d946025bc211c291543c037d8a3785ed4eee60f1f521b236296"],
  ["vision_wasm_nosimd_internal.wasm", "8a3092d34c79d3f57e6ba8592105e8a90f6b07c27891ffecd14cca428bfd3e31"],
]) {
  const source = resolve(wasmSource, filename);
  const digest = createHash("sha256").update(await readFile(source)).digest("hex");
  if (digest !== expectedHash) throw new Error(`Integrity mismatch for ${filename}.`);
  await cp(source, resolve(publicRoot, "vendor/mediapipe/wasm", filename));
}
await cp(resolve(runtimeAssets, "THIRD_PARTY.md"), resolve(publicRoot, "THIRD_PARTY.md"));
console.log("Bundled same-origin Manse pose runtime assets.");
