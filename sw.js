const cacheName = "users-v1";
const staticAssets = ["./", "./index.html", "./styles.css", "./index.js", "./manifest.webmanifest", "./user.js"];

self.addEventListener("install", async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener("activate", e => {
    self.clients.claim();
});

self.addEventListener("fetch", async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

const cacheFirst = async req => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || (await fetch(req));
};

const networkAndCache = async req => {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
};
