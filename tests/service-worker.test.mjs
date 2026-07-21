import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

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
            return stored.get(request.url)?.clone();
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
