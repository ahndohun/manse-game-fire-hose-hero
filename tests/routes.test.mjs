import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the anonymous game start experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Start pointer training/);
  assert.match(html, /Firehouse 07 needs a hose hero/);
  assert.match(html, /3 alarms · 12 fires · 90 seconds/);
  assert.match(html, /Camera stays on this device/);
  assert.match(html, /한국어/);
  assert.match(html, /English/);
  assert.match(html, /Browse games/);
  assert.match(html, /https:\/\/manse-showcase\.ran584000\.chatgpt\.site/);
  assert.match(html, /\/packs\/fire-hose-hero\/assets\/images\/fire-hose-hero\.png/);
  assert.match(html, /https:\/\/github\.com\/ahndohun\/manse-game-fire-hose-hero/);
  assert.doesNotMatch(html, /replace-me/);
  assert.doesNotMatch(html, /signin-with-chatgpt|<iframe\b|<form\b/i);
  assert.doesNotMatch(html, /runtime ready|device tier/i);
  assert.doesNotMatch(html, /[—–]/, "visible shell copy must not use em or en dashes");
});

test("shared platform shell stays single-line at mobile widths", async () => {
  const [clientSource, css] = await Promise.all([
    readFile("app/GameClient.tsx", "utf8"),
    readFile("app/globals.css", "utf8"),
  ]);
  assert.match(clientSource, /const SHOWCASE_URL = "https:\/\/manse-showcase\.ran584000\.chatgpt\.site"/);
  assert.match(clientSource, /className="manse-mark" href=\{SHOWCASE_URL\}/);
  assert.match(clientSource, /className="browse-games" href=\{SHOWCASE_URL\}/);
  assert.match(css, /\.topbar \{[^}]*min-height: 68px[^}]*display: flex[^}]*align-items: center[^}]*justify-content: space-between/s);
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*?\.topbar \{[^}]*min-height: 64px[^}]*padding-inline: 10px/s);
  assert.match(css, /\.locale-long \{ display: none; \}/);
  assert.match(css, /\.stage:has\(\.start-card\) \{[^}]*height: auto[^}]*min-height: 720px[^}]*max-height: none/s);
  assert.doesNotMatch(css, /\.topbar[^}]*flex-wrap:\s*wrap/s);
});

test("ships a three-alarm mission and a game-specific AR renderer", async () => {
  const [pack, clientSource, rendererSource, overlaySource] = await Promise.all([
    readFile("public/packs/fire-hose-hero/manse.pack.json", "utf8").then(JSON.parse),
    readFile("app/GameClient.tsx", "utf8"),
    readFile("app/fire-hose-renderer.ts", "utf8"),
    readFile("app/hose-overlay.tsx", "utf8"),
  ]);
  const challenges = pack.scenes.filter((scene) => scene.kind === "challenge");
  assert.deepEqual(challenges.map((scene) => scene.id), ["alarm-one", "alarm-two", "alarm-three"]);
  assert.deepEqual(challenges.map((scene) => scene.challenge.count), [3, 4, 5]);
  assert.equal(challenges.reduce((total, scene) => total + scene.challenge.count, 0), 12);
  assert.deepEqual(challenges.map((scene) => scene.challenge.zone), ["reachable", "upper", "full"]);
  assert.deepEqual(challenges.map((scene) => scene.challenge.dwellMs), [700, 850, 1000]);
  assert.equal(pack.scenes.some((scene) => scene.id === "all-clear" && scene.terminal), true);
  assert.equal(pack.scenes.some((scene) => scene.id === "mission-failed" && scene.terminal), true);
  assert.match(clientSource, /rendererFactory: createFireHoseRendererFactory/);
  assert.match(clientSource, /failed: "Ready to retry"/);
  assert.match(clientSource, /snapshot\.sceneId === "mission-failed"/);
  assert.match(rendererSource, /drawFirefighterCostume/);
  assert.match(rendererSource, /drawFireTarget/);
  assert.match(rendererSource, /SCORE/);
  assert.match(overlaySource, /child's own aiming wrist becomes the hose nozzle/);
});

test("build bundles the public contract and pose runtime", async () => {
  const manifest = JSON.parse(await readFile("public/.well-known/manse-game.json", "utf8"));
  assert.equal(typeof manifest.slug, "string");
  assert.equal(manifest.slug.length > 0, true);
  await access(`public/packs/${manifest.slug}/manse.pack.json`);
  await access("dist/client/sw.js");
  await access("dist/client/models/pose_landmarker_lite.task");
  await access("dist/client/vendor/mediapipe/wasm/vision_wasm_internal.wasm");
  const clientEntries = await readdir("dist/client", { recursive: true });
  const scripts = await Promise.all(
    clientEntries.filter((entry) => entry.endsWith(".js")).map((entry) => readFile(`dist/client/${entry}`, "utf8")),
  );
  assert.equal(
    scripts.some((script) => script.includes("serviceWorker") && script.includes("/sw.js")),
    true,
    "the production client must register the bundled service worker",
  );
});
