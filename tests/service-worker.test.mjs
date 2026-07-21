import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

test("the build emits an install-time precache covering the shell and pack", async () => {
  const source = await readFile("dist/client/sw-precache.js", "utf8");
  const context = { self: {} };
  vm.runInNewContext(source, context, { filename: "dist/client/sw-precache.js" });
  const urls = context.self.__MANSE_PRECACHE__;
  assert.equal(Array.isArray(urls), true);
  assert.equal(urls.includes("/"), true, "the navigation shell must be precached");
  assert.equal(urls.some((url) => url.startsWith("/assets/")), true, "built shell assets must be precached");
  assert.equal(urls.some((url) => /^\/packs\/.+\/manse\.pack\.json$/.test(url)), true, "the pack must be precached");
  assert.equal(urls.some((url) => url.startsWith("/models/") || url.startsWith("/vendor/")), false,
    "camera-only payloads must stay lazy so install stays light");
});

test("the built service worker serves a previously visited route while offline", async () => {
  const source = await readFile("dist/client/sw.js", "utf8");
  const listeners = new Map();
  const stored = new Map();
  let online = true;
  let networkRequests = 0;
  const context = {
    URL,
    Response,
    self: {
      location: { origin: "https://game.example" },
      clients: { async claim() {} },
      skipWaiting() {},
      addEventListener(type, listener) { listeners.set(type, listener); },
    },
    caches: {
      async keys() { return ["manse-game-v1"]; },
      async delete() { return true; },
      async open() {
        return {
          async match(request) {
            const key = typeof request === "string" ? new URL(request, "https://game.example").href : request.url;
            return stored.get(key)?.clone();
          },
          async put(request, response) {
            stored.set(request.url, response.clone());
          },
        };
      },
    },
    async fetch(request) {
      networkRequests += 1;
      if (!online) throw new Error("offline");
      return new Response(`network:${request.url}`, { status: 200, headers: { "content-type": "text/html" } });
    },
  };
  vm.runInNewContext(source, context, { filename: "dist/client/sw.js" });
  const fetchListener = listeners.get("fetch");
  assert.equal(typeof fetchListener, "function");

  const request = { method: "GET", mode: "navigate", url: "https://game.example/play" };
  const first = await dispatchFetch(fetchListener, request);
  assert.equal(await first.text(), "network:https://game.example/play");
  assert.equal(networkRequests, 1);

  online = false;
  const second = await dispatchFetch(fetchListener, request);
  assert.equal(await second.text(), "network:https://game.example/play");
  assert.equal(networkRequests, 2, "the worker should try the network before using its navigation cache");

  const shell = { method: "GET", mode: "navigate", url: "https://game.example/" };
  online = true;
  await dispatchFetch(fetchListener, shell);
  online = false;
  const fallback = await dispatchFetch(fetchListener, {
    method: "GET", mode: "navigate", url: "https://game.example/never-visited",
  });
  assert.equal(await fallback.text(), "network:https://game.example/",
    "an offline navigation to an unvisited route must fall back to the cached shell");

  let intercepted = false;
  fetchListener({
    request: { method: "GET", mode: "cors", url: "https://cdn.example/remote.js" },
    respondWith() { intercepted = true; },
  });
  assert.equal(intercepted, false, "cross-origin requests must stay outside the game cache");
});

async function dispatchFetch(listener, request) {
  let responsePromise;
  listener({ request, respondWith(value) { responsePromise = Promise.resolve(value); } });
  assert.notEqual(responsePromise, undefined, "same-origin GET should be intercepted");
  return responsePromise;
}
