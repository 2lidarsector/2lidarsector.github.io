"use strict";
window.ARX = window.ARX || {};
(function () {
  var DEFAULTS = {
    engine: "ddg",
    home: "https://www.google.com",
    transport: "bare",
    cloak: "default",
  };
  var ENGINES = {
    google: "https://www.google.com/search?q=%s",
    ddg: "https://duckduckgo.com/?q=%s",
    bing: "https://www.bing.com/search?q=%s",
    yt: "https://www.youtube.com/results?search_query=%s",
  };
  var CLOAKS = {
    default: {
      title: "Crestview School District - Student Portal",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230f4c81'/><path d='M50 18 84 42H66v28H34V42H16Z' fill='%23f2b807'/><path d='M50 28l20 12v-6h8v10l10 5v3H12v-3l38-21Z' fill='%23fff'/></svg>",
    },
    docs: {
      title: "Google Docs",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%234285F4'/><rect x='26' y='18' width='48' height='64' rx='4' fill='white'/><path d='M34 34h32M34 44h32M34 54h20' stroke='%234285F4' stroke-width='5' stroke-linecap='round'/></svg>",
    },
    google: {
      title: "Google",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white'/><path d='M82 51c0-2.5-.2-5-.7-7.3H51v13.8h17.5c-.7 3.9-3 7.2-6.4 9.4v7.8h10.4c6.1-5.6 9.5-13.9 9.5-23.7Z' fill='%234285F4'/><path d='M51 84c8.6 0 15.9-2.9 21.2-7.8l-10.4-7.8c-2.9 2-6.6 3.1-10.8 3.1-8.3 0-15.3-5.6-17.8-13.2H22.6v8.1C28 75.7 38.7 84 51 84Z' fill='%2334A853'/><path d='M33.2 58.3c-.6-1.9-1-3.9-1-6.3s.4-4.4 1-6.3v-8.1H22.6c-2.1 4.2-3.6 9.1-3.6 14.4s1.5 10.2 3.6 14.4l10.6-8.1Z' fill='%23FBBC05'/><path d='M51 31.5c4.7 0 8.9 1.6 12.2 4.8l9.1-9.1C66.9 21.6 59.6 18.5 51 18.5c-12.3 0-23 8.4-28.4 20.1l10.6 8.1c2.5-7.6 9.5-13.2 17.8-13.2Z' fill='%23EA4335'/></svg>",
    },
  };

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem("arx-settings") || "{}"); } catch (e) {}
    if (s.cloak === "crestview") s.cloak = "default";
    if (s.transport === "auto") s.transport = "bare";
    var out = {};
    for (var k in DEFAULTS) out[k] = s[k] !== undefined ? s[k] : DEFAULTS[k];
    return out;
  }
  function save(s) {
    try { localStorage.setItem("arx-settings", JSON.stringify(s)); } catch (e) {}
  }
  function get() { return load(); }
  function set(patch) {
    var s = load();
    for (var k in patch) s[k] = patch[k];
    save(s);
    return s;
  }
  function reset() { save(DEFAULTS); }
  function engineKey() { return load().engine; }
  function engineTemplate() { return ENGINES[load().engine]; }
  function homeUrl() { return load().home; }
  function transportMode() { return load().transport; }
  function cloakName() { return load().cloak; }

  function topDoc() {
    try {
      return window.top && window.top.document ? window.top.document : document;
    } catch (e) {
      return document;
    }
  }

  function applyCloak() {
    var c = CLOAKS[cloakName()] || CLOAKS.default;
    var doc = topDoc();
    doc.title = c.title;
    var link = doc.querySelector('link[rel="icon"]');
    if (!link) {
      link = doc.createElement("link");
      link.rel = "icon";
      doc.head.appendChild(link);
    }
    link.href = c.icon;
  }

  function aboutBlank() {
    var w;
    try {
      w = window.open("about:blank", "_blank");
    } catch (e) {}
    if (!w) {
      var a = document.createElement("a");
      a.href = "about:blank";
      a.target = "_blank";
      a.rel = "opener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    w.focus();
    w.document.open();
    w.document.write(
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Google</title><link rel="icon" href="data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27><rect width=%27100%27 height=%27100%27 fill=%27white%27/><path d=%27M82 51c0-2.5-.2-5-.7-7.3H51v13.8h17.5c-.7 3.9-3 7.2-6.4 9.4v7.8h10.4c6.1-5.6 9.5-13.9 9.5-23.7Z%27 fill=%27%234285F4%27/><path d=%27M51 84c8.6 0 15.9-2.9 21.2-7.8l-10.4-7.8c-2.9 2-6.6 3.1-10.8 3.1-8.3 0-15.3-5.6-17.8-13.2H22.6v8.1C28 75.7 38.7 84 51 84Z%27 fill=%27%2334A853%27/><path d=%27M33.2 58.3c-.6-1.9-1-3.9-1-6.3s.4-4.4 1-6.3v-8.1H22.6c-2.1 4.2-3.6 9.1-3.6 14.4s1.5 10.2 3.6 14.4l10.6-8.1Z%27 fill=%27%23FBBC05%27/><path d=%27M51 31.5c4.7 0 8.9 1.6 12.2 4.8l9.1-9.1C66.9 21.6 59.6 18.5 51 18.5c-12.3 0-23 8.4-28.4 20.1l10.6 8.1c2.5-7.6 9.5-13.2 17.8-13.2Z%27 fill=%27%23EA4335%27/></svg>"><style>body{margin:0;height:100%;overflow:hidden}</style></head><body><iframe src="' +
        location.origin +
        '/app.html" style="position:fixed;inset:0;width:100%;height:100%;border:0"></iframe></body></html>'
    );
    w.document.close();
    setInterval(function () {
      if (w.closed) return;
      if (w.document.title !== "Google") w.document.title = "Google";
    }, 500);
  }

  window.ARX.settings = {
    ENGINES: ENGINES,
    CLOAKS: CLOAKS,
    get: get,
    set: set,
    reset: reset,
    engineKey: engineKey,
    engineTemplate: engineTemplate,
    homeUrl: homeUrl,
    transportMode: transportMode,
    cloakName: cloakName,
    applyCloak: applyCloak,
    aboutBlank: aboutBlank,
  };

  var engineSel = document.getElementById("set-engine");
  var homeSel = document.getElementById("set-home");
  var transportSel = document.getElementById("set-transport");
  var cloakSel = document.getElementById("set-cloak");
  var modal = document.getElementById("settings-modal");
  var navEngine = document.getElementById("nav-engine");

  if (engineSel) {
    engineSel.value = engineKey();
    engineSel.addEventListener("change", function () {
      set({ engine: engineSel.value });
      if (navEngine) navEngine.value = ENGINES[engineSel.value] || navEngine.value;
    });
  }
  if (homeSel) {
    homeSel.value = homeUrl();
    homeSel.addEventListener("change", function () { set({ home: homeSel.value }); });
  }
  if (transportSel) {
    transportSel.value = transportMode();
    transportSel.addEventListener("change", function () { set({ transport: transportSel.value }); });
  }
  if (cloakSel) {
    cloakSel.value = cloakName();
    cloakSel.addEventListener("change", function () { set({ cloak: cloakSel.value }); applyCloak(); });
  }
  var openBtn = document.getElementById("btn-settings");
  var closeBtn = document.getElementById("btn-settings-close");
  var resetBtn = document.getElementById("btn-settings-reset");
  var blankBtn = document.getElementById("btn-aboutblank");
  if (openBtn) openBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
    if (engineSel) engineSel.value = engineKey();
    if (homeSel) homeSel.value = homeUrl();
    if (transportSel) transportSel.value = transportMode();
    if (cloakSel) cloakSel.value = cloakName();
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { modal.classList.add("hidden"); });
  if (resetBtn) resetBtn.addEventListener("click", function () {
    reset();
    if (engineSel) engineSel.value = "ddg";
    if (homeSel) homeSel.value = "https://www.google.com";
    if (transportSel) transportSel.value = "bare";
    if (cloakSel) cloakSel.value = "default";
    if (navEngine) navEngine.value = ENGINES.ddg;
    applyCloak();
  });
  if (blankBtn) blankBtn.addEventListener("click", aboutBlank);
  if (modal) modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.add("hidden");
  });

  applyCloak();
})();
