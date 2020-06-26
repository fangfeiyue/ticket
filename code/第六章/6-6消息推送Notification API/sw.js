/*

Notification既是一个对象也是一个构造函数，在页面中是构造函数，在service worker中是对象
通知：
在页面中获取通知状态
Notification.permission三种状态分别是default、denied 、granted

// 弹出授权请求
```
Notification.requestPermission().then(permission=>console.log(permission))
```

// 弹出通知内容
new Notification('hello world', {body: 'hi'})

*/
// const CACHE_NAME = 'cache-v1';
// self.addEventListener('install', event => {
//   console.log('install', event);
//   event.waitUntil(caches.open(CACHE_NAME).then(cache => {
//     console.log('cache1', cache)
//     cache.addAll([
//       '/',
//       './index.css'
//     ]);
//   }));
// });

// self.addEventListener('activate', event => {
//   console.log('activate', event)
//   event.waitUntil(caches.keys().then(cacheNames => {
//     return Promise.all(cacheNames.map(cacheName => {
//       if (cacheName !== CACHE_NAME) {
//         return caches.delete(cacheName);
//       }
//     }));
//   }));
// });

// self.addEventListener('fetch', event => {
//   console.log('fetch', event)
//   event.respondWith(caches.open(CACHE_NAME).then(cache => {
//     return cache.match(event.request).then(response => {
//       console.log(response)
//       if (response) {
//         return response;
//       }
//       return fetch(event.request).then(response => {
//         // response需要克隆的原因是body流只能被消费一次，但requst没有这个顾虑，因为本身cache API就只能处理GET请求，根本涉及不到request的body
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     })
//   }))
// });


// 通知

// 将通知设为默认返回的依然是denied，在service work中不允许弹出授权请求
console.log(Notification.permission)

// Notification.requestPermission() // Notification.requestPermission is not a function

self.registration.showNotification('hello', {body: 'world'})
