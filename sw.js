const cacheName = "users-v4";
const staticAssets = ["./index.html", "./styles.css", "./index.js", "./manifest.webmanifest", "./user.js"];

self.addEventListener("install", e => {
    console.log("worker installed");
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("caching files");
                cache.addAll(staticAssets);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", e => {
    console.log("worker activated");
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("service worker: clearing old cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", e => {
    console.log(e);
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// const cacheFirst = async req => {
//     const cache = await caches.open(cacheName);
//     const cached = await cache.match(req);
//     return cached || fetch(req);
// };

// const networkAndCache = async req => {
//     const cache = await caches.open(cacheName);
//     try {
//         const fresh = await fetch(req);
//         await cache.put(req, fresh.clone());
//         return fresh;
//     } catch (e) {
//         const cached = await cache.match(req);
//         return cached;
//     }
// };
