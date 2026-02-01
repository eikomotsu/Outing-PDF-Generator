const CACHE_NAME = 'outing-app-v1';
const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./data.js",
    "./manifest.json",
    "./icon-192.jpg",
    "./icon-512.png"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting(); // Force activation of new serviceworker
});

self.addEventListener("activate", e => {
    // Clean up old caches
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
    self.clients.claim(); // Take control of all clients immediately
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
