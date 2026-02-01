const CACHE_NAME = 'outing-app-v4';
const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./data.js",
    "./manifest.json",
    "./icon-192.png",
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
    // Network-First Strategy for Data and Manifest (Always try to get fresh copy)
    if (e.request.url.includes("data.js") || e.request.url.includes("manifest.json")) {
        e.respondWith(
            fetch(e.request)
                .then(response => {
                    // Update cache with new version
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clonedResponse));
                    return response;
                })
                .catch(() => caches.match(e.request)) // Fallback to cache if offline
        );
    } else {
        // Cache-First Strategy for Static Assets (Performance)
        e.respondWith(
            caches.match(e.request).then(res => res || fetch(e.request))
        );
    }
});
