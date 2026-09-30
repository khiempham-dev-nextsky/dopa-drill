const CACHE = 'dopa-drill-next-v5';
const CORE = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-192.png',
  '/icon-maskable-512.png',
  '/game/index.html',
  '/game/style.css',
  '/game/icon.svg',
  '/game/js/audio.js',
  '/game/js/bg.js',
  '/game/js/core.js',
  '/game/js/dopakichi.js',
  '/game/js/fx.js',
  '/game/js/growth.js',
  '/game/js/guide.js',
  '/game/js/main.js',
  '/game/js/problems.js',
  '/game/js/quests.js',
  '/game/js/scoring.js',
  '/game/js/session.js',
  '/game/js/skills.js',
  '/game/js/store.js',
  '/game/js/trophies.js',
  '/game/js/unlocks.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).catch(() => {}));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    }).catch(() => request.mode === 'navigate' ? caches.match('/offline.html') : Response.error()))
  );
});
