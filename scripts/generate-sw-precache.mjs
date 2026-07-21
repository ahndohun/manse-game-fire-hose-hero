import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";

// Rewrite the PRECACHE_URLS list inside dist/client/sw.js so the service
// worker caches the game shell and pack data at install time. Without this,
// the first page load happens before the worker controls the page and nothing
// reaches the cache, which breaks the documented "load once, then play
// offline" path. The list is injected into sw.js itself (not a sibling file)
// because the production asset manifest is frozen at build time and would not
// serve a file added afterwards.
//
// Heavy camera-only payloads (pose models, mediapipe wasm) are excluded on
// purpose: they cache lazily on first camera use, keeping install light while
// guaranteeing offline pointer play after a single visit.

const clientRoot = resolve(process.cwd(), "dist/client");
const EXCLUDED_PREFIXES = ["models", "vendor"];
const EXCLUDED_FILES = new Set(["sw.js", "_headers"]);

async function collect(dir) {
  const urls = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const absolute = join(dir, entry.name);
    const relativePath = relative(clientRoot, absolute).split(sep).join("/");
    if (entry.isDirectory()) {
      if (EXCLUDED_PREFIXES.includes(relativePath.split("/")[0])) continue;
      urls.push(...(await collect(absolute)));
      continue;
    }
    if (EXCLUDED_FILES.has(relativePath)) continue;
    if (EXCLUDED_PREFIXES.includes(relativePath.split("/")[0])) continue;
    if (relativePath.split("/").some((segment) => segment.startsWith(".") && segment !== ".well-known")) continue;
    urls.push(`/${relativePath}`);
  }
  return urls;
}

await stat(clientRoot);
const urls = ["/", ...(await collect(clientRoot)).sort()];
const workerPath = join(clientRoot, "sw.js");
const source = await readFile(workerPath, "utf8");
const marker = /const PRECACHE_URLS = \[[^;]*\];/;
if (!marker.test(source)) throw new Error("dist/client/sw.js is missing the PRECACHE_URLS marker.");
await writeFile(workerPath, source.replace(marker, `const PRECACHE_URLS = ${JSON.stringify(urls)};`));
console.log(`sw precache: ${urls.length} URLs injected (models/ and vendor/ cache lazily on camera use)`);
