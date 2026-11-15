/* Book Reader splash screen with the SB logo — drop-in, no dependencies.
   Add to index.html, right after <body>:   <script src="splash.js"></script>
   The splash shows on every app open, then fades out by itself. */
(function () {
  var APP_NAME   = "Swipe Book";               // big title (last word is colored)
  var TAGLINE    = "Your programming library";  // small line under it
  var LOGO_IMAGE = "";   // optional: e.g. "logo.png" to show your exact logo file instead of the drawn one
  var MIN_TIME = 2600;   // ms the splash stays at least
  var MAX_TIME = 4500;   // ms the splash stays at most (safety)

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var css = `
  #br-splash{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;
    align-items:center;justify-content:center;overflow:hidden;
    background:radial-gradient(110% 70% at 50% 0%,#3a1d2c 0%,rgba(58,29,44,0) 60%),
               radial-gradient(80% 50% at 50% 100%,#1c1a4a 0%,rgba(28,26,74,0) 60%),#0f1117;
    font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#fff;
    transition:opacity .6s ease, transform .6s ease}
  #br-splash.br-out{opacity:0;transform:scale(1.04);pointer-events:none}

  /* logo tile */
  #br-splash .br-logo{width:148px;height:148px;position:relative;
    opacity:0;transform:scale(.4) rotate(-12deg);animation:br-pop .7s .1s cubic-bezier(.2,1.4,.4,1) forwards}
  #br-splash .br-logo svg,#br-splash .br-logo img{width:100%;height:100%;display:block;overflow:visible;border-radius:34px}
  #br-splash .br-halo{position:absolute;inset:-22px;border-radius:50%;
    background:radial-gradient(closest-side,rgba(253,120,70,.45),rgba(232,51,111,.18) 60%,rgba(0,0,0,0));
    opacity:0;animation:br-fade .8s .5s forwards, br-breathe 2.4s 1.3s ease-in-out infinite}
  #br-splash .br-shine{position:absolute;inset:0;border-radius:34px;overflow:hidden;pointer-events:none}
  #br-splash .br-shine:after{content:"";position:absolute;top:-20%;left:-60%;width:40%;height:140%;
    background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.45),rgba(255,255,255,0));
    transform:skewX(-20deg);animation:br-shine .9s 1.75s ease-in-out forwards}

  /* parts of the drawn logo */
  #br-splash .br-left{transform-origin:60px 68px;transform:scaleX(0);animation:br-grow .35s .55s ease-out forwards}
  #br-splash .br-spine{opacity:0;animation:br-fade .25s .75s forwards}
  #br-splash .br-right{transform-origin:60px 68px;transform:scaleX(0);animation:br-open .5s .8s cubic-bezier(.3,1.3,.5,1) forwards}
  #br-splash .br-S,#br-splash .br-B{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.3)}
  #br-splash .br-S{animation:br-letter .4s 1.15s cubic-bezier(.2,1.5,.4,1) forwards}
  #br-splash .br-B{animation:br-letter .4s 1.3s cubic-bezier(.2,1.5,.4,1) forwards}
  #br-splash .br-base{transform-origin:60px 96px;transform:scaleX(0);animation:br-grow .4s 1.0s ease-out forwards}
  #br-splash .br-caret{opacity:0;transform:translateY(-14px);animation:br-drop .45s 1.45s cubic-bezier(.2,1.6,.4,1) forwards}

  /* text */
  #br-splash .br-name{margin-top:40px;font-size:40px;font-weight:800;letter-spacing:-.5px;
    opacity:0;transform:translateY(14px);animation:br-up .55s 1.55s forwards}
  #br-splash .br-name b{background:linear-gradient(90deg,#fd9130,#e8336f);-webkit-background-clip:text;
    background-clip:text;color:transparent}
  #br-splash .br-bar{width:72px;height:3px;border-radius:3px;margin:20px 0 14px;
    background:linear-gradient(90deg,#fd9130,#e8336f);transform:scaleX(0);animation:br-grow .5s 1.85s ease-out forwards}
  #br-splash .br-tag{font-size:15px;color:#a3a3b8;opacity:0;animation:br-fade .5s 2.0s forwards}

  @keyframes br-pop{to{opacity:1;transform:none}}
  @keyframes br-grow{to{transform:scaleX(1)}}
  @keyframes br-open{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}
  @keyframes br-letter{to{opacity:1;transform:none}}
  @keyframes br-drop{to{opacity:1;transform:none}}
  @keyframes br-up{to{opacity:1;transform:none}}
  @keyframes br-fade{to{opacity:1}}
  @keyframes br-breathe{50%{transform:scale(1.08)}}
  @keyframes br-shine{to{left:130%}}
  @media (prefers-reduced-motion: reduce){
    #br-splash *{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important}
  }`;

  var drawnLogo = `
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <defs>
      <linearGradient id="br-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fd9a2e"/><stop offset=".55" stop-color="#f6604c"/><stop offset="1" stop-color="#e2336f"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="28" fill="url(#br-bg)"/>
    <g class="br-caret"><path d="M52 27 L60 19 L68 27" fill="none" stroke="#ffe3d6" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
    <rect class="br-left" x="29" y="36" width="29" height="56" rx="2" fill="#26236b"/>
    <rect class="br-spine" x="57" y="36" width="5" height="56" fill="#2bb8f2"/>
    <rect class="br-right" x="62" y="36" width="29" height="56" rx="2" fill="#ffffff"/>
    <text class="br-S" x="43.5" y="76" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="30" fill="#ffffff">S</text>
    <text class="br-B" x="76.5" y="76" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="30" fill="#ef2f6a">B</text>
    <rect class="br-base" x="24" y="93" width="72" height="4" rx="2" fill="#ffe9e1"/>
  </svg>`;

  var logo = LOGO_IMAGE ? '<img src="' + LOGO_IMAGE + '" alt="">' : drawnLogo;

  var words = APP_NAME.split(" ");
  var title = words.length > 1
    ? words.slice(0, -1).join(" ") + " <b>" + words[words.length - 1] + "</b>"
    : "<b>" + APP_NAME + "</b>";

  var html = `
  <div class="br-logo"><div class="br-halo"></div>${logo}<div class="br-shine"></div></div>
  <div class="br-name">${title}</div>
  <div class="br-bar"></div>
  <div class="br-tag">${TAGLINE}</div>`;

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var el = document.createElement("div");
  el.id = "br-splash";
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", APP_NAME + " is loading");
  el.innerHTML = html;

  function mount() { (document.body || document.documentElement).appendChild(el); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  var start = Date.now(), done = false;
  function hide() {
    if (done) return; done = true;
    var wait = Math.max(0, (reduce ? 400 : MIN_TIME) - (Date.now() - start));
    setTimeout(function () {
      el.classList.add("br-out");
      setTimeout(function () { el.remove(); style.remove(); }, 700);
    }, wait);
  }
  window.addEventListener("load", hide);   // page finished loading
  setTimeout(hide, MAX_TIME);              // never stay longer than MAX_TIME
  el.addEventListener("click", hide);      // tap to skip
})();
