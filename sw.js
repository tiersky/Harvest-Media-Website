self.addEventListener("install", function (event) {
  console.log("Service Worker installing.");
  // Add caching logic here if desired
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker activating.");
});
// sw.js

const CACHE_NAME = "harvest-media-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/script.js",
  "/images/harvest_yatay.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-512x512.png",
];

// Install the service worker and cache assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercept fetch requests and serve cached assets if available
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return the response from the cached version
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and can only be consumed once.
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream and can only be consumed once.
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Activate the service worker and remove old caches
self.addEventListener("activate", function (event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
