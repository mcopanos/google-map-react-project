const staticWorker = 'google-map-react-app-v1';
const urlsToCache = [
    './public/index.html',
    './src/components',
    './App.js',
    './index.css'
]

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(staticWorker).then(cache => {
        console.log('urls cached')
        return cache.addAll(urlsToCache);
      }).catch(error => {
        console.log('urls not cached')
      })
   );
  })
 
  /* Fetch Request */
  self.addEventListener('fetch', event => {
   event.respondWith(
     caches.match(event.request).then(response => {
       if (response) return response;
       return fetch(event.request)
     })
   )
 });
 