const CACHE_NAME = 'version-1'
const cachePage = ['index.html', 'offline.html']

const self = this

self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('Cache Opened')

            return cache.addAll(cachePage)
        })
    )
})
self.addEventListener('listen', (e)=>{
    e.respondWith(
        caches.match(e.request)
        .then(()=>{
            return fetch(e.request)
            .catch(()=> caches.match('offline.html'))
        })
    )
})
self.addEventListener('activate', (e)=>{
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)
    e.waitUntil(
        caches.keys().then((cachesNames)=>{
            Promise.all(cachesNames.map((cacheName)=>{
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            }))
        })
    )
})