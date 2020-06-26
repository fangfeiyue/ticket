/*
1.不能访问dom
2.不能访问window、localstorage等对象

self代表service worker的全局作用域对象

三个生命周期：
- install：在一个新的脚本安装后触发，只要内容有一点不同浏览器就会认为这是两个不同的service worker，新的版本会被立即下载安装，但不会立即生效，当前生效的是上个版本。
- activate
- fetch
*/
const CACHE_NAME = 'cache-v1';
self.addEventListener('install', event => {
  console.log('install', event);
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    cache.addAll([
      './index.html',
      './index.css'
    ]);
  }));
});

self.addEventListener('activate', event => {
  console.log('activate', event)
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cacheName => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }));
  }));
});

self.addEventListener('fecth', event => {
  console.log('fetch', event)
  event.responseWith(caches.open(CACHE_NAME).then(cache => {
    return cache.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        // response需要克隆的原因是body流只能被消费一次，但requst没有这个顾虑，因为本身cache API就只能处理GET请求，根本涉及不到request的body
        cache.put(event.request, response.clone());
        return response;
      });
    })
  }))
});
