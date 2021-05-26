// Needs to be updated every time a file in the cache needs to be re-loaded.
// var apiCacheName = 'api-0-1-1';
// var cacheFiles = [
//     '/',
// ];

// // 监听install事件，安装完成后，进行文件缓存
// self.addEventListener('install', function (e) {
//   console.log('Service Worker 状态： install');
//   var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
//       return cache.addAll(cacheFiles);
//   });
//   e.waitUntil(cacheOpenPromise);
// });

self.addEventListener('fetch', function (e) {
    // 需要缓存的xhr请求
    var cacheRequestUrls = [
        '/book?'
    ];
    // console.log('现在正在请求：' + e.request.url);

    // 判断当前请求是否需要缓存
    var needCache = cacheRequestUrls.some(function (url) {
        return e.request.url.indexOf(url) > -1;
    });

    /**** 这里是对XHR数据缓存的相关操作 ****/
    if (needCache) {
        // 需要缓存
        // 使用fetch请求数据，并将请求结果clone一份缓存到cache
        // 此部分缓存后在browser中使用全局变量caches获取
        caches.open(apiCacheName).then(function (cache) {
            return fetch(e.request).then(function (response) {
                cache.put(e.request.url, response.clone());
                return response;
            });
        });
    }
    /* ******************************* */

    else {
        // 非api请求，直接查询cache
        // 如果有cache则直接返回，否则通过fetch请求
        e.respondWith(
            caches.match(e.request).then(function (cache) {
                return cache || fetch(e.request);
            }).catch(function (err) {
                console.log(err);
                return fetch(e.request);
            })
        );
    }
});


// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
// self.addEventListener('activate', function (e) {
//   console.log('Service Worker 状态： activate');
//   var cachePromise = caches.keys().then(function (keys) {
//       return Promise.all(keys.map(function (key) {
//           if (key !== cacheName) {
//               return caches.delete(key);
//           }
//       }));
//   })
//   e.waitUntil(cachePromise);
//   return self.clients.claim();
// });

/*
var CACHE_VERSION = "22389(2)-SNAPSHOT";
var CACHE_NAME = "pwa-cache-v" + CACHE_VERSION;
console.log("fetch");
self.addEventListener("install", function (event) {
  // Perform some installation task
  console.log("install");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  // Perform activation task
  console.log("activate using cache version " + CACHE_VERSION);
  // Remove previous cached data from disk
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Clearing old version cache " + key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {}); */
