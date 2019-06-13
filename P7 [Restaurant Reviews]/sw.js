var CACHE_VERSION = 'v1';

self.addEventListener('install', (event) => {
    // Service worker was installed
    // event.waitUntil(
    //     caches.open(CACHE_VERSION).then((cache) => {
    //         cache.addAll(cacheAssets);
    //     }).then(() => {
    //         self.skipWaiting();
    //     })
    // );
});

self.addEventListener('activate', (event) => {
    // Service worker was activated
    // We want to remove caches which no longer are a part of our app
    // Such as when we change the CACHE_VERSION from v1 to v2
    event.waitUntil(
        // We get all the cache keys
        caches.keys().then((cacheNames) => {
            return Promise.all(
                // Iterate through all the keys
                cacheNames.map((cache) => {
                    // If we find a cache version that no longer corresponds to our app...
                    if (cache !== CACHE_VERSION) {
                        // Returns a resolution to the promise through deleting the cache
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('SW fetch')
    event.respondWith(fetch(event.request).then((response) => {
        // Due to some memory optimizations the response can only be read once so we clone it.
        const responseClone = response.clone();

        // For every request, put the response in the cache
        caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, responseClone);
        });

        return response
    }).catch(() => {
        return caches.match(event.request).then((response) => {
            return response;
        });
    }))
});