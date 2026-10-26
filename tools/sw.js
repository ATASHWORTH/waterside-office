// Waterside Office — offline support for the web version.
// The page and its fonts and Bible text are kept on the device after the first visit.
// The page itself is checked against the network first, so updates arrive on the next open.
const CACHE = 'wo-__VERSION__';
const FILES = ['./', 'index.html', 'kjv.js', 'manifest.webmanifest', 'logo.svg', 'icon-192.png', 'icon-512.png',
  'fonts/IMFellEnglish-Regular.ttf', 'fonts/IMFellEnglish-Italic.ttf', 'fonts/Spectral-Regular.ttf', 'fonts/Spectral-Italic.ttf',
  'fonts/Spectral-SemiBold.ttf', 'fonts/AlegreyaSans-Regular.ttf', 'fonts/AlegreyaSans-Medium.ttf', 'fonts/AlegreyaSans-Bold.ttf'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/esv-api/')) return; // ESV text is never cached here
  const isPage = e.request.mode === 'navigate';
  if (isPage) {
    e.respondWith(fetch(e.request).then((r) => {
      const copy = r.clone(); caches.open(CACHE).then((c) => c.put('index.html', copy)); return r;
    }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
