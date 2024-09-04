const CACHE_NAME = "barcode-scanner-pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/image.jpg",  // Ensure this image path is correct
    "/manifest.json",
    "/scanner.js"
];

// Install the service worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match('/index.html'));
        })
    );
});

// Update the service worker
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
