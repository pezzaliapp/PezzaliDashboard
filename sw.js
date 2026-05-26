// PezzaliDashboard - Service Worker
// Strategia: network-first per le pagine, cache-first per gli asset statici.
// L'app fa chiamate live a api.github.com che NON devono essere cachate.

const CACHE_NAME = 'pezzali-dashboard-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
];

// Install: pre-cache asset statici
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// Activate: pulisci vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: api.github.com sempre live, asset statici cache-first
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Mai cachare le chiamate API
  if (url.hostname === 'api.github.com' || url.hostname === 'cdn.jsdelivr.net') {
    return; // pass-through al network
  }

  // Same-origin: cache-first con fallback network
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) =>
        cached || fetch(event.request).then((res) => {
          // Aggiorna cache in background
          if (res && res.status === 200 && event.request.method === 'GET') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          }
          return res;
        })
      )
    );
  }
});
