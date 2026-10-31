// Service worker for Book Library.
// It lets Android browsers offer the one-tap "Install app" prompt.
// Nothing is cached, so new books and updates always show right away.

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

var OFFLINE_PAGE =
  '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>Book Library</title>' +
  '<body style="margin:0;height:100vh;display:grid;place-items:center;background:#0d0f14;color:#eef1f6;' +
  'font:16px system-ui,-apple-system,sans-serif;text-align:center;padding:24px;box-sizing:border-box">' +
  '<div><p style="font-weight:700;font-size:18px;margin:0 0 6px">No internet connection</p>' +
  '<p style="color:#98a1b0;margin:0">Connect to the internet and open the app again.</p></div></body>';

self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;   // PDFs, images and scripts go straight to the network
  e.respondWith(
    fetch(e.request).catch(function () {
      return new Response(OFFLINE_PAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    })
  );
});
