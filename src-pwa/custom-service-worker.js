/*
 * This file (which will be your service worker)
 * is picked up by the build system if BOTH conditions are met:
 *  - You are building for production
 *  - quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/* global workbox */
import { precacheAndRoute } from 'workbox-precaching'
// Your other import statements go here.

precacheAndRoute(self.__WB_MANIFEST)
// Your other SW code goes here.

if (workbox) {
  workbox.precaching.precache(self.__precacheManifest)

  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request)
      })
    )
  })
}
