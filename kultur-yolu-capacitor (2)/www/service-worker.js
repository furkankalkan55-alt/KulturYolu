const CACHE_NAME='kultur-yolu-v1';
const PRECACHE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png',
'https://cdn.tailwindcss.com',
'https://unpkg.com/react@18/umd/react.production.min.js',
'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
'https://unpkg.com/framer-motion/dist/framer-motion.umd.js',
'https://unpkg.com/papaparse@5.4.1/papaparse.min.js',
'https://unpkg.com/@babel/standalone/babel.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.pathname.endsWith('.csv')){ e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))); return; }
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{ const copy=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)); return resp; }).catch(()=>caches.match('./index.html'))));
});