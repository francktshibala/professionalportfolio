const CACHE_NAME = 'portfolio-cache-v2';
const RUNTIME_CACHE = 'runtime-cache-v2';

const STATIC_ASSETS = [
  '/',
  '/about',
  '/projects',
  '/blog',
  '/contact',
  '/favicon.ico',
  '/manifest.json',
];

const CACHE_STRATEGIES = {
  image: 'cache-first',
  font: 'cache-first',
  static: 'cache-first',
  api: 'network-first',
  page: 'network-first',
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$/)) {
    event.respondWith(cacheFirstWithFallback(request));
    return;
  }

  event.respondWith(networkFirstWithFallback(request));
});

async function cacheFirstWithFallback(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Network request failed:', error);
    return await caches.match('/offline.html') || new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function networkFirstWithFallback(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Network request failed, trying cache:', error);
    
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    if (request.url.includes('/api/')) {
      return new Response(JSON.stringify({
        error: 'Offline',
        message: 'This feature requires an internet connection'
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return await caches.match('/offline.html') || new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    console.log('Background sync triggered');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}