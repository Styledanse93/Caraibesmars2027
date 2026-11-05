const CARNET = 'carnet-croisiere-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CARNET).then(c => c.addAll(['./', './index.html'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CARNET).map(x => caches.delete(x)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});