"use strict";
window.ARX = window.ARX || {};
(function () {
  var DEFAULTS = {
    engine: "ddg",
    home: "https://www.google.com",
    transport: "auto",
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
      title: "ArcadeX",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%236d5df6'/><text x='50' y='68' font-size='55' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'>A</text></svg>",
    },
    crestview: {
      title: "Crestview Student Portal",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230f4c81'/><path d='M50 18 84 42H66v28H34V42H16Z' fill='%23f2b807'/><path d='M50 28l20 12v-6h8v10l10 5v3H12v-3l38-21Z' fill='%23fff'/></svg>",
    },
    docs: {
      title: "Google Docs",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%234285F4'/><rect x='26' y='18' width='48' height='64' rx='4' fill='white'/><path d='M34 34h32M34 44h32M34 54h20' stroke='%234285F4' stroke-width='5' stroke-linecap='round'/></svg>",
    },
  };

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem("arx-settings") || "{}"); } catch (e) {}
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

  function applyCloak() {
    var c = CLOAKS[cloakName()] || CLOAKS.default;
    document.title = c.title;
    var link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = c.icon;
  }

  function aboutBlank() {
    var w = window.open("about:blank", "_blank");
    if (w) {
      w.document.title = "Google";
      w.document.body.style.cssText = "margin:0;height:100%";
      w.document.write("<title>Google</title><script>setInterval(function(){if(!document.title){document.title='Google'}},100);history.replaceState(null,'','about:blank')<\\/script>");
    }
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
    if (transportSel) transportSel.value = "auto";
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
