// Service worker for Swipe Book.
// - Lets Android browsers offer the one-tap "Install app" prompt.
// - Keeps cover pictures and the PDF engine on the phone, so the installed app starts fast.
//   Pages, books.json and the PDFs themselves are always fetched fresh, so new books show right away.

var STATIC_CACHE = 'swipebook-static-v1';   // change the number if lib/ files are ever replaced

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k.indexOf('swipebook-static-') === 0 && k !== STATIC_CACHE;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

var OFFLINE_PAGE =
  '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>Swipe Book</title>' +
  '<body style="margin:0;height:100vh;display:grid;place-items:center;background:#1f1022;color:#f8eef6;' +
  'font:16px system-ui,-apple-system,sans-serif;text-align:center;padding:24px;box-sizing:border-box">' +
  '<div><p style="font-weight:700;font-size:18px;margin:0 0 6px">No internet connection</p>' +
  '<p style="color:#c4a9c2;margin:0">Connect to the internet and open the app again.</p></div></body>';

// Files that never change at the same address:
// covers/<id>.jpg?v=<version> (a new cover gets a new version) and the PDF engine in lib/.
function keepOnPhone(url) {
  if (url.origin !== self.location.origin) return false;
  var path = url.pathname;
  if (/\/covers\/[^/]+\.jpg$/.test(path) && url.searchParams.has('v')) return true;
  if (/\/lib\/pdf(\.worker)?\.min\.js$/.test(path)) return true;
  return false;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  if (keepOnPhone(url)) {
    e.respondWith(
      caches.open(STATIC_CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req).then(function (res) {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          });
        });
      })
    );
    return;
  }

  if (req.mode !== 'navigate') return;   // PDFs, books.json and everything else go straight to the network
  e.respondWith(
    fetch(req).catch(function () {
      return new Response(OFFLINE_PAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    })
  );
});
