"use strict";
window.ARX = window.ARX || {};
(function () {
  var DEFAULTS = {
    engine: "ddg",
    home: "https://duckduckgo.com",
    transport: "bare",
    proxyUrl: "",
    cloak: "default",
    theme: "midnight",
    openMode: "embed",
    panic: "google",
    panicKey: "`",
    camo: "off",
    session: false,
    customCloakTitle: "",
    customCloakIcon: "",
  };
  var ENGINES = {
    google: "https://www.google.com/search?q=%s",
    ddg: "https://duckduckgo.com/?q=%s",
    bing: "https://www.bing.com/search?q=%s",
    yt: "https://www.youtube.com/results?search_query=%s",
  };
  var CLOAKS = {
    default: {
      title: "MathLab - Practice Drills",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%230f121d'/><text x='50' y='72' font-size='62' font-family='Georgia,serif' font-weight='bold' fill='%232dd4bf' text-anchor='middle'>&#960;</text></svg>",
    },
    docs: {
      title: "Google Docs",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%234285F4'/><rect x='26' y='18' width='48' height='64' rx='4' fill='white'/><path d='M34 34h32M34 44h32M34 54h20' stroke='%234285F4' stroke-width='5' stroke-linecap='round'/></svg>",
    },
    google: {
      title: "Google",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white'/><path d='M82 51c0-2.5-.2-5-.7-7.3H51v13.8h17.5c-.7 3.9-3 7.2-6.4 9.4v7.8h10.4c6.1-5.6 9.5-13.9 9.5-23.7Z' fill='%234285F4'/><path d='M51 84c8.6 0 15.9-2.9 21.2-7.8l-10.4-7.8c-2.9 2-6.6 3.1-10.8 3.1-8.3 0-15.3-5.6-17.8-13.2H22.6v8.1C28 75.7 38.7 84 51 84Z' fill='%2334A853'/><path d='M33.2 58.3c-.6-1.9-1-3.9-1-6.3s.4-4.4 1-6.3v-8.1H22.6c-2.1 4.2-3.6 9.1-3.6 14.4s1.5 10.2 3.6 14.4l10.6-8.1Z' fill='%23FBBC05'/><path d='M51 31.5c4.7 0 8.9 1.6 12.2 4.8l9.1-9.1C66.9 21.6 59.6 18.5 51 18.5c-12.3 0-23 8.4-28.4 20.1l10.6 8.1c2.5-7.6 9.5-13.2 17.8-13.2Z' fill='%23EA4335'/></svg>",
    },
    canvas: {
      title: "Canvas",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23D41F30'/><path d='M31 30c9-8 24-9 36-4 13 6 19 20 15 33-4 12-15 19-27 19-10 0-18-6-18-16 0-8 6-13 13-13 6 0 12 4 12 10 0 5-4 8-8 8' stroke='white' stroke-width='7' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>",
    },
    khan: {
      title: "Khan Academy",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231865F2'/><path d='M26 80c7-26 24-41 50-47' stroke='%2314BF96' stroke-width='9' fill='none' stroke-linecap='round'/><path d='M78 33L52 47l10-18z' fill='white'/></svg>",
    },
    desmos: {
      title: "Desmos",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white'/><path d='M18 78L50 22l32 56' stroke='%2300A2C0' stroke-width='10' fill='none' stroke-linecap='round' stroke-linejoin='round'/><circle cx='50' cy='64' r='7' fill='%2300A2C0'/></svg>",
    },
    classroom: {
      title: "Google Classroom",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='white'/><path d='M16 20h30v26H16z' fill='%234285F4'/><path d='M54 20h30v26H54z' fill='%23EA4335'/><path d='M16 54h30v26H16z' fill='%23FBBC05'/><path d='M54 54h30v26H54z' fill='%2334A853'/></svg>",
    },
    ixl: {
      title: "IXL",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%233B6EF5'/><path d='M50 16v68M50 16L32 44M50 16l18 28M50 84L32 56M50 84l18-28' stroke='white' stroke-width='8' fill='none' stroke-linecap='round'/></svg>",
    },
    deltamath: {
      title: "DeltaMath",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230B5394'/><path d='M22 74L50 24l28 50z' fill='none' stroke='white' stroke-width='8' stroke-linejoin='round'/><path d='M50 24v50' stroke='white' stroke-width='6' opacity='0.65'/></svg>",
    },
    custom: {
      title: "Custom",
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='14' fill='%2342454d'/><text x='50' y='70' font-size='58' text-anchor='middle' fill='white' font-family='Arial'>&#9679;</text></svg>",
    },
  };

  function emojiFavicon(emoji) {
    var e = encodeURIComponent(String(emoji || ""));
    return "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%231a1d27'/><text x='50' y='74' font-size='64' text-anchor='middle' fill='white'>" + e + "</text></svg>";
  }
  function textFavicon(text) {
    var first = String(text || "").trim().charAt(0).toUpperCase() || "?";
    return "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='18' fill='%23" + "6d7df6" + "'/><text x='50' y='72' font-size='60' font-family='Georgia,serif' font-weight='bold' text-anchor='middle' fill='white'>" + encodeURIComponent(first) + "</text></svg>";
  }
  function customCloakTitle() { return load().customCloakTitle || ""; }
  function customCloakIcon() { return load().customCloakIcon || ""; }

  var THEME_BASES = {
    midnight: { bg: "#0a0c14", surface: "#0f121d", surface2: "#141826", card: "#161b2b", accent: "#6d7df6", accent2: "#2dd4bf", text: "#e7eaf3" },
    neon: { bg: "#0d0a1a", surface: "#161029", surface2: "#1c1436", card: "#211a40", accent: "#a78bfa", accent2: "#f472b6", text: "#f3efff" },
    forest: { bg: "#081410", surface: "#0d2018", surface2: "#122a1f", card: "#153025", accent: "#4ade80", accent2: "#34d399", text: "#e8f5ee" },
    ocean: { bg: "#071120", surface: "#0c1c31", surface2: "#112742", card: "#142d4a", accent: "#38bdf8", accent2: "#22d3ee", text: "#e8f1fb" },
    sunset: { bg: "#1a0a10", surface: "#281218", surface2: "#331a21", card: "#3a1f27", accent: "#fb7185", accent2: "#fbbf24", text: "#fdeef1" },
    graphite: { bg: "#0b0c0e", surface: "#121316", surface2: "#17181c", card: "#1a1b20", accent: "#94a3b8", accent2: "#e2e8f0", text: "#eef0f4" },
    paper: { bg: "#f3f4f7", surface: "#ffffff", surface2: "#eceef2", card: "#ffffff", accent: "#4f5bd5", accent2: "#0d9488", text: "#1a1d26" },
    khan: { bg: "#f6f9ff", surface: "#ffffff", surface2: "#eef3fc", card: "#ffffff", accent: "#1865f2", accent2: "#14bf96", text: "#1f2937" },
    desmos: { bg: "#f2faf9", surface: "#ffffff", surface2: "#e6f6f4", card: "#ffffff", accent: "#00a2c0", accent2: "#0d9488", text: "#12363e" },
    canvas: { bg: "#f4f4f2", surface: "#ffffff", surface2: "#ececea", card: "#ffffff", accent: "#1f3b57", accent2: "#d41f30", text: "#1f2937" },
    ixl: { bg: "#f2f6ff", surface: "#ffffff", surface2: "#e8efff", card: "#ffffff", accent: "#3b6ef5", accent2: "#8b5cf6", text: "#1c2a4a" },
    deltamath: { bg: "#eef4fb", surface: "#ffffff", surface2: "#e4edf7", card: "#ffffff", accent: "#0b5394", accent2: "#1a9e6f", text: "#1a2740" },
  };

  function hexRgb(hex) {
    var v = parseInt(hex.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  function rgba(hex, a) {
    var c = hexRgb(hex);
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  }
  function shade(hex, amt) {
    var c = hexRgb(hex).map(function (v) {
      v = Math.round(v + amt * 255);
      return Math.max(0, Math.min(255, v));
    });
    return (
      "#" +
      c
        .map(function (v) {
          return ("0" + v.toString(16)).slice(-2);
        })
        .join("")
    );
  }

  function themeTokens(name, custom) {
    var b =
      name === "custom"
        ? custom || {}
        : THEME_BASES[name] || THEME_BASES.midnight;
    var bg = b.bg || "#0a0c14";
    var accent = b.accent || "#6d7df6";
    var accent2 = b.accent2 || "#2dd4bf";
    var text = b.text || "#e7eaf3";
    return {
      "--bg": bg,
      "--surface": b.surface || shade(bg, 0.05),
      "--surface-2": b.surface2 || shade(bg, 0.09),
      "--card": b.card || shade(bg, 0.11),
      "--border": rgba(text, 0.13),
      "--border-strong": rgba(text, 0.26),
      "--text": text,
      "--dim": rgba(text, 0.72),
      "--muted": rgba(text, 0.5),
      "--accent": accent,
      "--accent-2": accent2,
      "--accent-deep": shade(accent, -0.16),
      "--accent-bright": shade(accent, 0.12),
      "--accent-glow": rgba(accent, 0.18),
      "--selection": rgba(accent, 0.35),
      "--glow-1": rgba(accent, 0.13),
      "--glow-2": rgba(accent2, 0.09),
      "--nav-bg": rgba(bg, 0.72),
      "--nav-bg-2": rgba(bg, 0.9),
      "--scroll-thumb": rgba(text, 0.16),
      "--scroll-thumb-hover": rgba(text, 0.26),
    };
  }

  function applyTheme() {
    var vars = themeTokens(themeName(), themeCustom());
    var css =
      ":root{" +
      Object.keys(vars)
        .map(function (k) {
          return k + ":" + vars[k] + ";";
        })
        .join("") +
      "}";
    var el = document.getElementById("arx-theme");
    if (!el) {
      el = document.createElement("style");
      el.id = "arx-theme";
      document.head.appendChild(el);
    }
    el.textContent = css;
  }

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem("arx-settings") || "{}"); } catch (e) {}
    if (s.cloak === "crestview") s.cloak = "default";
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
  function transportUrl() { return load().proxyUrl; }
  function cloakName() { return load().cloak; }
  function themeName() { return load().theme; }
  function themeCustom() { return load().themeCustom || {}; }
  function openMode() { return load().openMode; }
  function panicTarget() { return load().panic; }
  function panicKey() { return load().panicKey || "`"; }
  function camoMode() { return load().camo || "off"; }
  function sessionRestore() { return !!load().session; }

  function comboFromEvent(e) {
    if (
      e.key === "Control" ||
      e.key === "Alt" ||
      e.key === "Shift" ||
      e.key === "Meta" ||
      e.key === "Dead"
    )
      return null;
    var mods = [];
    if (e.ctrlKey) mods.push("ctrl");
    if (e.altKey) mods.push("alt");
    if (e.shiftKey) mods.push("shift");
    if (e.metaKey) mods.push("meta");
    mods.push(e.key.toLowerCase());
    return mods.join("+");
  }

  function formatKey(combo) {
    return String(combo || "")
      .split("+")
      .map(function (k) {
        return k.length === 1 ? k : k.charAt(0).toUpperCase() + k.slice(1);
      })
      .join("+");
  }

  function topDoc() {
    try {
      return window.top && window.top.document ? window.top.document : document;
    } catch (e) {
      return document;
    }
  }

  function applyCloakName(name) {
    var c = CLOAKS[name] || CLOAKS.default;
    var doc = topDoc();
    var title = c.title;
    var icon = c.icon;
    if (name === "custom") {
      var ct = customCloakTitle();
      var ci = customCloakIcon();
      if (ct) title = ct;
      if (ci) {
        if (/^emoji:\s*(.+)$/.test(ci)) icon = emojiFavicon(RegExp.$1);
        else if (/^url:\s*(.+)$/.test(ci)) icon = RegExp.$1;
        else if (/^data:|^https?:/i.test(ci)) icon = ci;
        else icon = textFavicon(ci);
      }
    }
    doc.title = title;
    var link = doc.querySelector('link[rel="icon"]');
    if (!link) {
      link = doc.createElement("link");
      link.rel = "icon";
      doc.head.appendChild(link);
    }
    link.href = icon;
  }

  function applyCloak() {
    applyCloakName(cloakName());
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

  function blobTab() {
    var c = CLOAKS[cloakName()] || CLOAKS.default;
    var src = null;
    var frameEl = document.getElementById("frame");
    if (frameEl && frameEl.src) {
      try {
        var u = new URL(frameEl.src);
        if (
          u.origin === location.origin &&
          (u.pathname === "/app.html" || u.pathname.indexOf("/apps/") === 0)
        ) {
          src = frameEl.src;
        }
      } catch (e) {}
    }
    if (!src) src = location.origin + "/app.html";
    var html =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
      c.title +
      '</title><link rel="icon" href="' +
      c.icon +
      '"><style>body{margin:0;height:100%;overflow:hidden}</style></head><body><iframe src="' +
      src +
      '" style="position:fixed;inset:0;width:100%;height:100%;border:0"></iframe></body></html>';
    var w;
    try {
      var blobUrl = URL.createObjectURL(new Blob([html], { type: "text/html" }));
      w = window.open(blobUrl, "_blank");
    } catch (e) {}
    if (!w) {
      aboutBlank();
      return;
    }
    w.focus();
    setInterval(function () {
      if (w.closed) return;
      if (w.document.title !== c.title) w.document.title = c.title;
      var link = w.document.querySelector('link[rel="icon"]');
      if (link && link.href !== c.icon) link.href = c.icon;
    }, 500);
    try { window.close(); } catch (e) {}
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
    transportUrl: transportUrl,
    cloakName: cloakName,
    applyCloak: applyCloak,
    applyCloakName: applyCloakName,
    customCloakTitle: customCloakTitle,
    customCloakIcon: customCloakIcon,
    themeName: themeName,
    themeCustom: themeCustom,
    applyTheme: applyTheme,
    openMode: openMode,
    panicTarget: panicTarget,
    panicKey: panicKey,
    camoMode: camoMode,
    sessionRestore: sessionRestore,
    comboFromEvent: comboFromEvent,
    formatKey: formatKey,
    aboutBlank: aboutBlank,
    blobTab: blobTab,
  };

  var engineSel = document.getElementById("set-engine");
  var homeSel = document.getElementById("set-home");
  var transportSel = document.getElementById("set-transport");
  var transportUrlInput = document.getElementById("set-transport-url");
  var transportCustomRow = document.getElementById("transport-custom-row");
  var cloakSel = document.getElementById("set-cloak");
  var cloakCustomRow = document.getElementById("cloak-custom-row");
  var cloakTitleInput = document.getElementById("set-cloak-title");
  var cloakIconInput = document.getElementById("set-cloak-icon");
  var themeSel = document.getElementById("set-theme");
  var themeCustomRow = document.getElementById("theme-custom-row");
  var themeBg = document.getElementById("set-theme-bg");
  var themeAccent = document.getElementById("set-theme-accent");
  var themeAccent2 = document.getElementById("set-theme-accent2");
  var themeText = document.getElementById("set-theme-text");
  var openModeSel = document.getElementById("set-open-mode");
  var camoSel = document.getElementById("set-camo");
  var sessionSel = document.getElementById("set-session");
  var panicSel = document.getElementById("set-panic");
  var panicKeyInput = document.getElementById("set-panic-key");
  var configExportBtn = document.getElementById("btn-config-export");
  var configImportBtn = document.getElementById("btn-config-import");
  var configFileInput = document.getElementById("config-file-input");
  var modal = document.getElementById("settings-modal");
  var navEngine = document.getElementById("nav-engine");

  function syncTransportRow() {
    if (!transportCustomRow || !transportUrlInput) return;
    transportCustomRow.classList.toggle("hidden", transportSel.value !== "custom");
    if (transportSel.value === "custom") transportUrlInput.value = transportUrl();
  }

  function syncCloakRow() {
    if (!cloakCustomRow) return;
    cloakCustomRow.classList.toggle("hidden", cloakSel.value !== "custom");
    if (cloakSel.value === "custom") {
      if (cloakTitleInput) cloakTitleInput.value = customCloakTitle();
      if (cloakIconInput) cloakIconInput.value = customCloakIcon();
    }
  }

  function syncThemeRow() {
    if (!themeCustomRow) return;
    themeCustomRow.classList.toggle("hidden", themeSel.value !== "custom");
    if (themeSel.value === "custom") {
      var c = themeCustom();
      if (themeBg) themeBg.value = c.bg || "#0a0c14";
      if (themeAccent) themeAccent.value = c.accent || "#6d7df6";
      if (themeAccent2) themeAccent2.value = c.accent2 || "#2dd4bf";
      if (themeText) themeText.value = c.text || "#e7eaf3";
    }
  }

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
    transportSel.addEventListener("change", function () { set({ transport: transportSel.value }); syncTransportRow(); });
  }
  if (transportUrlInput) {
    transportUrlInput.addEventListener("change", function () { set({ proxyUrl: transportUrlInput.value.trim() }); });
  }
  if (cloakSel) {
    cloakSel.value = cloakName();
    cloakSel.addEventListener("change", function () { set({ cloak: cloakSel.value }); syncCloakRow(); applyCloak(); });
  }
  if (cloakTitleInput) {
    cloakTitleInput.addEventListener("input", function () { set({ customCloakTitle: cloakTitleInput.value }); applyCloak(); });
  }
  if (cloakIconInput) {
    cloakIconInput.addEventListener("input", function () { set({ customCloakIcon: cloakIconInput.value }); applyCloak(); });
  }
  if (themeSel) {
    themeSel.value = themeName();
    themeSel.addEventListener("change", function () { set({ theme: themeSel.value }); syncThemeRow(); applyTheme(); });
  }
  if (openModeSel) {
    openModeSel.value = openMode();
    openModeSel.addEventListener("change", function () { set({ openMode: openModeSel.value }); });
  }
  if (camoSel) {
    camoSel.value = camoMode();
    camoSel.addEventListener("change", function () { set({ camo: camoSel.value }); });
  }
  if (sessionSel) {
    sessionSel.checked = sessionRestore();
    sessionSel.addEventListener("change", function () {
      set({ session: sessionSel.checked });
      if (sessionSel.checked && typeof window.trySaveSession === "function") window.trySaveSession();
    });
  }
  if (panicSel) {
    panicSel.value = panicTarget();
    panicSel.addEventListener("change", function () { set({ panic: panicSel.value }); });
  }
  if (panicKeyInput) {
    panicKeyInput.value = formatKey(panicKey());
    panicKeyInput.addEventListener("keydown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var combo = comboFromEvent(e);
      if (!combo) return;
      set({ panicKey: combo });
      panicKeyInput.value = formatKey(combo);
    });
  }
  function exportConfig() {
    var custom = [];
    try { custom = JSON.parse(localStorage.getItem("arx-custom-games") || "[]"); } catch (e) {}
    var data = {
      exportedAt: new Date().toISOString(),
      settings: load(),
      customGames: Array.isArray(custom) ? custom : [],
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "arx-config.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function importConfig(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (data.settings && typeof data.settings === "object") {
          localStorage.setItem("arx-settings", JSON.stringify(data.settings));
        }
        if (data.customGames && Array.isArray(data.customGames)) {
          localStorage.setItem("arx-custom-games", JSON.stringify(data.customGames));
        }
        location.reload();
      } catch (e) {
        alert("Invalid config file.");
      }
    };
    reader.readAsText(file);
  }
  if (configExportBtn) configExportBtn.addEventListener("click", exportConfig);
  if (configImportBtn) configImportBtn.addEventListener("click", function () {
    if (configFileInput) configFileInput.click();
  });
  if (configFileInput) configFileInput.addEventListener("change", function () {
    if (configFileInput.files && configFileInput.files[0]) importConfig(configFileInput.files[0]);
    configFileInput.value = "";
  });
  var themeInputs = [
    [themeBg, "bg"],
    [themeAccent, "accent"],
    [themeAccent2, "accent2"],
    [themeText, "text"],
  ];
  for (var ti = 0; ti < themeInputs.length; ti++) {
    (function (input, key) {
      if (!input) return;
      input.addEventListener("input", function () {
        var c = themeCustom();
        c[key] = input.value;
        set({ themeCustom: c });
        applyTheme();
      });
    })(themeInputs[ti][0], themeInputs[ti][1]);
  }
  var openBtn = document.getElementById("btn-settings");
  var closeBtn = document.getElementById("btn-settings-close");
  var resetBtn = document.getElementById("btn-settings-reset");
  var blankBtn = document.getElementById("btn-aboutblank");
  var blobTabBtn = document.getElementById("btn-blobtab");
  if (openBtn) openBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
    if (engineSel) engineSel.value = engineKey();
    if (homeSel) homeSel.value = homeUrl();
    if (transportSel) transportSel.value = transportMode();
    if (cloakSel) cloakSel.value = cloakName();
    if (themeSel) themeSel.value = themeName();
    if (openModeSel) openModeSel.value = openMode();
    if (camoSel) camoSel.value = camoMode();
    if (sessionSel) sessionSel.checked = sessionRestore();
    if (panicSel) panicSel.value = panicTarget();
    if (panicKeyInput) panicKeyInput.value = formatKey(panicKey());
    syncTransportRow();
    syncThemeRow();
    syncCloakRow();
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { modal.classList.add("hidden"); });
  if (resetBtn) resetBtn.addEventListener("click", function () {
    reset();
    if (engineSel) engineSel.value = "ddg";
    if (homeSel) homeSel.value = "https://duckduckgo.com";
    if (transportSel) transportSel.value = "bare";
    if (cloakSel) cloakSel.value = "default";
    if (themeSel) themeSel.value = "midnight";
    if (openModeSel) openModeSel.value = "embed";
    if (camoSel) camoSel.value = "off";
    if (sessionSel) sessionSel.checked = false;
    if (panicSel) panicSel.value = "google";
    if (panicKeyInput) panicKeyInput.value = formatKey("`");
    if (navEngine) navEngine.value = ENGINES.ddg;
    if (transportUrlInput) transportUrlInput.value = "";
    if (cloakTitleInput) cloakTitleInput.value = "";
    if (cloakIconInput) cloakIconInput.value = "";
    syncTransportRow();
    syncThemeRow();
    syncCloakRow();
    applyCloak();
    applyTheme();
  });
  if (blankBtn) blankBtn.addEventListener("click", aboutBlank);
  if (blobTabBtn) blobTabBtn.addEventListener("click", blobTab);
  if (modal) modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.add("hidden");
  });

  applyCloak();
  applyTheme();
})();
