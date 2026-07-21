const CACHE_NAME = "manse-game-v1";

// The production build writes /sw-precache.js with the hashed shell asset and
// pack URLs. In development the file is absent and precaching is skipped.
let precacheUrls = [];
try {
  importScripts("/sw-precache.js");
  if (Array.isArray(self.__MANSE_PRECACHE__)) precacheUrls = self.__MANSE_PRECACHE__;
} catch {
  precacheUrls = [];
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.allSettled(precacheUrls.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      if (request.mode !== "navigate") {
        const cached = await cache.match(request);
        if (cached) return cached;
      }
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          const shell = await cache.match("/");
          if (shell) return shell;
        }
        throw error;
      }
    }),
  );
});
