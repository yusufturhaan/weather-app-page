/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/assets/css/main.css","0e0373619108c793bee83ec8cb360fee"],["/assets/img/icons/Unlimites.png","f81b27350f343f122fb6d6935daef663"],["/assets/img/icons/appstore.png","4a6f7a1563c792e3e12d4da765ea4459"],["/assets/img/icons/bg.png","9efc9ae7ac7f8a18374eb9fdd71f393d"],["/assets/img/icons/bg1.png","818ac9acf7267587cdb7b1927c7adb99"],["/assets/img/icons/center.png","2bae245a3c8518237777d63d307dd7c7"],["/assets/img/icons/down.png","b2674d241ed251eadfe1752f08e43093"],["/assets/img/icons/facebook.png","1a788b49230fd1d55714dff6d0d5811d"],["/assets/img/icons/facebook1.png","b0902f4e4d50c5b0ef5488d56efff3df"],["/assets/img/icons/funweather.png","327203c8960bbc816db6d7ca7133e8af"],["/assets/img/icons/funweather1.png","778a29f57a2dca1087a47e23deaea7d8"],["/assets/img/icons/googleplay.png","bed2822bb447e0bb012fe85ce73e490b"],["/assets/img/icons/icon-128x128.png","61ddb05acbe176c28c4edf3061bc5ca7"],["/assets/img/icons/icon-144x144.png","e1d6ae04ac08afc1f990f2f361164095"],["/assets/img/icons/icon-152x152.png","4bf13d94a4900fe8529aca9911c4bc70"],["/assets/img/icons/icon-192x192.png","081f8edaade41625d6d74ee48518c7da"],["/assets/img/icons/icon-384x384.png","6b1d44e4dd14dc1785215296eb5dff16"],["/assets/img/icons/icon-512x512.png","63855ecafbc5f7f1dce674a317cb0699"],["/assets/img/icons/icon-72x72.png","f9a925c300b696e33b69ca30ef628421"],["/assets/img/icons/icon-96x96.png","016e9058d99c14f6225e3341c183218c"],["/assets/img/icons/icon.png","744c4388e33f1de3914a396853b73b75"],["/assets/img/icons/icon1.png","4f8d1f96a97ab09550578e414f1388ff"],["/assets/img/icons/icon2.png","87d6828864470c3c0b5b909fb84f35a9"],["/assets/img/icons/icon3.png","2a54d6ccb7521ab20c0ee6fe0f65e95a"],["/assets/img/icons/icon4.png","e03bc88c6b313d0157fad80dabd814d5"],["/assets/img/icons/icon5.png","91576d84ddc5beca296f9a62dd6455c8"],["/assets/img/icons/icons1.png","a5b586f0c9734a290611453f8c7d01a4"],["/assets/img/icons/instagram.png","c33f096c2b0e51f53682c45a6d388518"],["/assets/img/icons/instagram1.png","e20c29e5a9ddf66f6f8be819466f8901"],["/assets/img/icons/left-arrow.png","f3754fe17964902ac9272b827a54e156"],["/assets/img/icons/left.png","4a36c74e086eff54e802ad1e80f50749"],["/assets/img/icons/logo.png","da83b24a27e4bb99cb8840f55a2b342c"],["/assets/img/icons/parallax.png","d97acadfb3bf48e640c731c5bbccdebc"],["/assets/img/icons/phone.png","f9d501f3832b633a9d37d3070f13c3b5"],["/assets/img/icons/phone1.png","65e8eb9ddd9bd81efd7816c1654dd68c"],["/assets/img/icons/phone2.png","709d0e7733f8d0152cc883cf3a794ac2"],["/assets/img/icons/right-arrow.png","7f49bfbe206391d8065094cb0aa891bb"],["/assets/img/icons/right.png","f2d8fdd3b66fbf89edf8312046563bc8"],["/assets/img/icons/sunny.png","d0bd6a52b188e70cc18b8c719ad202cb"],["/assets/img/icons/three.png","936d5721e96636752b9c71bc83fff834"],["/assets/img/icons/twitter.png","454c547544bc4eceb2d8dde4f9854f1a"],["/assets/img/icons/twitter1.png","29e7b7b2391b126a9c159bd8167a5df7"],["/assets/img/icons/wave.png","37754afd5c5c56cb9212606dba5c9106"],["/assets/js/main-bundle.js","12f304ecf9552ac36d57f1664bd78de7"],["/assets/js/runtimechunk~main-bundle.js","a8525c78578c66672a093f91bad4ab92"],["/assets/js/vendors-bundle.js","3394b7388466c0fe11b18df8ba6c3d21"],["/index-critical.html","07444bb4bde9fa8e0a320e4a23b4d5be"],["/index.html","88f68702b6aad54c9969bc97e11a2c8e"],["/layouts/footer.html","ddd67e23a07b643c287f53e08b6f951b"],["/layouts/header.html","d5b45cf5c72e478054b77b402be92840"],["/layouts/main.html","df7b713dd24c0d9b0129b3e2cd0e7970"],["/mixins/icon.html","d41d8cd98f00b204e9800998ecf8427e"],["/mixins/index.html","d41d8cd98f00b204e9800998ecf8427e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







