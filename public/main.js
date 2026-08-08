"use strict";

const library = [
  {
    name: "Snake",
    desc: "Grow a chain by collecting targets.",
    path: "/apps/snake/",
    tag: "Logic",
    grad: ["#22c55e", "#0ea5e9"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M14 50h44" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M58 50v-22h22v22" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="86" cy="64" r="6" fill="#fff"/><circle cx="36" cy="50" r="4" fill="#052e16"/><circle cx="52" cy="50" r="4" fill="#052e16"/></svg>',
  },
  {
    name: "2048",
    desc: "Merge tiles to reach 2048.",
    path: "/apps/2048/",
    tag: "Math",
    grad: ["#f59e0b", "#ef4444"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="14" width="22" height="22" rx="5" fill="#fff" opacity="0.9"/><rect x="42" y="14" width="22" height="22" rx="5" fill="#fff" opacity="0.7"/><rect x="14" y="42" width="22" height="22" rx="5" fill="#fff" opacity="0.7"/><rect x="42" y="42" width="44" height="44" rx="6" fill="#fff"/><text x="64" y="74" font-size="24" font-weight="bold" text-anchor="middle" fill="#ef4444">2</text></svg>',
  },
  {
    name: "Pong",
    desc: "Two-player rally on a canvas.",
    path: "/apps/pong/",
    tag: "Sports",
    grad: ["#a855f7", "#6366f1"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="8" y="28" width="8" height="44" rx="4" fill="#fff"/><rect x="84" y="28" width="8" height="44" rx="4" fill="#fff"/><line x1="50" y1="8" x2="50" y2="92" stroke="#fff" stroke-width="2" stroke-dasharray="6 6" opacity="0.6"/><circle cx="50" cy="50" r="7" fill="#fff"/></svg>',
  },
  {
    name: "Breakout",
    desc: "Clear the bricks with a bouncing ball.",
    path: "/apps/breakout/",
    tag: "Physics",
    grad: ["#f472b6", "#f59e0b"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><g fill="#fff"><rect x="10" y="12" width="23" height="12" rx="3"/><rect x="39" y="12" width="23" height="12" rx="3"/><rect x="68" y="12" width="22" height="12" rx="3"/><rect x="10" y="30" width="23" height="12" rx="3"/><rect x="39" y="30" width="23" height="12" rx="3"/><rect x="68" y="30" width="22" height="12" rx="3"/></g><circle cx="62" cy="52" r="7" fill="#fff"/><rect x="22" y="82" width="56" height="9" rx="4.5" fill="#fff"/></svg>',
  },
  {
    name: "Tic-Tac-Toe",
    desc: "Beat the computer in this classic.",
    path: "/apps/tic-tac-toe/",
    tag: "Logic",
    grad: ["#34d399", "#22c55e"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><line x1="30" y1="8" x2="30" y2="92" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="70" y1="8" x2="70" y2="92" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="8" y1="30" x2="92" y2="30" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="8" y1="70" x2="92" y2="70" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>',
  },
  {
    name: "Memory Match",
    desc: "Find all matching pairs.",
    path: "/apps/memory/",
    tag: "Cognition",
    grad: ["#0ea5e9", "#6366f1"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><g fill="#fff"><rect x="14" y="14" width="30" height="30" rx="6"/><rect x="56" y="14" width="30" height="30" rx="6"/><rect x="14" y="56" width="30" height="30" rx="6"/><rect x="56" y="56" width="30" height="30" rx="6"/></g><g fill="#0ea5e9"><rect x="20" y="20" width="18" height="18" rx="4"/><rect x="62" y="20" width="18" height="18" rx="4"/><rect x="20" y="62" width="18" height="18" rx="4"/><rect x="62" y="62" width="18" height="18" rx="4"/></g></svg>',
  },
  {
    name: "Strike 3D",
    desc: "Third-person exploration with creative building.",
    path: "/apps/strike3d/",
    tag: "3D",
    grad: ["#f59e0b", "#ef4444"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="20" stroke="#fff" stroke-width="6"/><line x1="50" y1="14" x2="50" y2="34" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="50" y1="66" x2="50" y2="86" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="14" y1="50" x2="34" y2="50" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="66" y1="50" x2="86" y2="50" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#f59e0b"/></svg>',
  },
  {
    name: "Duel Arena",
    desc: "Local two-player arena, first to five.",
    path: "/apps/duel/",
    tag: "Sports",
    grad: ["#34d399", "#a855f7"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="30" width="22" height="40" rx="6" fill="#34d399"/><rect x="64" y="30" width="22" height="40" rx="6" fill="#f472b6"/><line x1="38" y1="50" x2="62" y2="50" stroke="#fff" stroke-width="4" stroke-dasharray="6 6"/><line x1="26" y1="14" x2="32" y2="30" stroke="#34d399" stroke-width="6" stroke-linecap="round"/><line x1="74" y1="86" x2="68" y2="70" stroke="#f472b6" stroke-width="6" stroke-linecap="round"/></svg>',
  },
  {
    name: "Activity Hub",
    desc: "A huge library of online activities, all in one place.",
    path: "https://githubgames.gitlab.io/",
    tag: "Library",
    grad: ["#22c55e", "#0ea5e9"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M28 38a16 16 0 1 0 0 24M72 38a16 16 0 1 1 0 24" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M34 46a8 8 0 1 0 0 8M66 46a8 8 0 1 0 0 8" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="82" cy="26" r="6" fill="#f59e0b"/><path d="M82 20v12M76 26h12" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/></svg>',
  },
  {
    name: "Study Portal",
    desc: "A student resource hub with curated picks and a searchable library.",
    path: "https://genizymath.github.io/",
    tag: "Library",
    grad: ["#fc2651", "#0f172a"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="12" y="30" width="76" height="40" rx="20" stroke="#fff" stroke-width="7"/><path d="M32 45v10M27 50h10" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="68" cy="46" r="4" fill="#fff"/><circle cx="78" cy="56" r="4" fill="#fff"/></svg>',
  },
  {
    name: "Web Dashers",
    desc: "A fan-made rhythm platformer with main levels, level search, and a built-in level editor.",
    path: "/apps/web-dashers/",
    tag: "Platformer",
    grad: ["#c1fb3d", "#16a34a"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M14 36h26l10 12h36v16H14z" fill="#fff"/><path d="M50 36l10 12 8-4-2 8h14" stroke="#16a34a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="26" cy="58" r="5" fill="#16a34a"/><circle cx="74" cy="58" r="5" fill="#16a34a"/></svg>',
  },
  {
    name: "Balatro",
    desc: "A poker-inspired roguelike deck-builder. Build joker synergies, score blinds, and break the bank.",
    path: "/apps/balatro/",
    tag: "Cards",
    grad: ["#f43f5e", "#7f1d1d"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="22" y="14" width="56" height="72" rx="8" fill="#fff" stroke="#7f1d1d" stroke-width="4"/><path d="M50 30l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#ef4444"/><circle cx="32" cy="26" r="3" fill="#7f1d1d"/><circle cx="68" cy="74" r="3" fill="#7f1d1d"/></svg>',
  },
];

const connection = new FrameCore.FrameCoreConnection("/lib/transport-worker.js");
const config = window.__ARXX_CONFIG__ || { bareServers: [], wsUrl: null };
let uvFallback = false;

navigator.serviceWorker.addEventListener(
  "message",
  (event) => {
    if (
      settingsMode() === "scramjet" &&
      event.data &&
      event.data.type === "getPort" &&
      event.data.port
    ) {
      try {
        const port = uvFallback
          ? new SharedWorker("/lib/transport-worker.js", "arcade-bus-worker").port
          : new SharedWorker("/baremux/worker.js", "bare-mux-worker").port;
        event.data.port.postMessage(port, [port]);
      } catch (e) {}
    }
  },
  { capture: true }
);

let transportPromise = null;
let wispProbe = null;

function settingsMode() {
  return window.ARX && ARX.settings ? ARX.settings.transportMode() : "auto";
}

function probeWisp(wsUrl) {
  if (wispProbe) return wispProbe;
  wispProbe = new Promise((resolve) => {
    let settled = false;
    const done = (ok) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };
    try {
      const probe = new WebSocket(wsUrl);
      const timer = setTimeout(() => {
        try { probe.close(); } catch (e) {}
        done(false);
      }, 3000);
      probe.onopen = () => {
        clearTimeout(timer);
        try { probe.close(); } catch (e) {}
        done(true);
      };
      probe.onerror = () => {
        clearTimeout(timer);
        done(false);
      };
      probe.onclose = () => {
        clearTimeout(timer);
        done(false);
      };
    } catch (e) {
      done(false);
    }
  });
  return wispProbe;
}

async function getTransport() {
  if (transportPromise) return transportPromise;
  transportPromise = (async () => {
    const mode = settingsMode();
    const sameOriginWisp =
      (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/stream/";
    const bareFallback = () => {
      const bare = config.bareServers.length ? config.bareServers[0] : "/remote/";
      return { path: "/lib/remote-client.mjs", args: [new URL(bare, location.href).toString()] };
    };
    if (mode === "wisp") {
      if (await probeWisp(sameOriginWisp)) {
        return { path: "/net/index.mjs", args: [{ wisp: sameOriginWisp }] };
      }
      console.warn("[arxx] wisp unavailable on this host, falling back to bare");
      return bareFallback();
    }
    if (mode === "bare") {
      return bareFallback();
    }
    if (mode === "custom") {
      const custom = (window.ARX && ARX.settings ? ARX.settings.transportUrl() : "").trim();
      if (custom) {
        if (/^wss?:\/\//i.test(custom)) {
          return { path: "/net/index.mjs", args: [{ wisp: custom }] };
        }
        if (/^https?:\/\//i.test(custom)) {
          return { path: "/lib/remote-client.mjs", args: [new URL(custom, location.href).toString()] };
        }
      }
    }
    let hasBackend = false;
    try {
      hasBackend = await fetch("/__status__", { cache: "no-store" }).then((r) => r.ok);
    } catch (e) {}
    if (hasBackend) {
      if (await probeWisp(sameOriginWisp)) {
        return { path: "/net/index.mjs", args: [{ wisp: sameOriginWisp }] };
      }
      return bareFallback();
    }
    if (config.wsUrl) {
      return { path: "/net/index.mjs", args: [{ wisp: config.wsUrl }] };
    }
    return bareFallback();
  })();
  return transportPromise;
}

async function ensureTransport() {
  const t = await getTransport();
  if ((await connection.getTransport()) !== t.path) {
    await connection.setTransport(t.path, t.args);
  }
}

let scramjetReady = null;
async function ensureScramjet() {
  if (window.__scramjetController) return window.__scramjetController;
  if (!scramjetReady) {
    scramjetReady = (async () => {
      if (typeof $scramjetLoadController !== "function") {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "/scram/scramjet.all.js";
          s.onload = resolve;
          s.onerror = () => reject(new Error("Failed to load scramjet client"));
          document.head.appendChild(s);
        });
      }
      await repairScramjetDb();
      const { ScramjetController } = $scramjetLoadController();
      const controller = new ScramjetController({
        files: {
          wasm: "/scram/scramjet.wasm.wasm",
          all: "/scram/scramjet.all.js",
          sync: "/scram/scramjet.sync.js",
        },
      });
      await controller.init();
      window.__scramjetController = controller;
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg.active) reg.active.postMessage({ scramjet$type: "init" });
      } catch (e) {}
      return controller;
    })();
  }
  return scramjetReady;
}

async function repairScramjetDb() {
  for (let attempt = 0; attempt < 12; attempt++) {
    const result = await new Promise((resolve) => {
      const open = indexedDB.open("$scramjet", 1);
      let done = false;
      const finish = (v) => { if (!done) { done = true; resolve(v); } };
      open.onsuccess = () => {
        const db = open.result;
        if (
          db.objectStoreNames.contains("config") &&
          db.objectStoreNames.contains("cookies")
        ) {
          db.close();
          finish("ok");
          return;
        }
        db.close();
        const del = indexedDB.deleteDatabase("$scramjet");
        del.onsuccess = () => finish("deleted");
        del.onerror = () => finish("error");
        setTimeout(() => finish("blocked"), 700);
      };
      open.onerror = () => finish("open-error");
      open.onblocked = () => finish("open-blocked");
    });
    if (result === "ok" || result === "deleted") return;
    await new Promise((r) => setTimeout(r, 150));
  }
}

let baremuxReady = null;
async function ensureBareMux() {
  if (!baremuxReady) {
    baremuxReady = (async () => {
      localStorage.setItem("bare-mux-path", "/baremux/worker.js");
      const mod = await import("/baremux/index.mjs");
      const baremux = new mod.BareMuxConnection("/baremux/worker.js");
      const t = await getTransport();
      if ((await baremux.getTransport()) !== t.path) {
        await baremux.setTransport(t.path, t.args);
      }
      return baremux;
    })();
  }
  return baremuxReady;
}

const homeView = document.getElementById("home-view");
const browserView = document.getElementById("browser-view");
const frame = document.getElementById("frame");
const homeAddress = document.getElementById("hero-address");
const navAddress = document.getElementById("nav-address");
const browserAddress = document.getElementById("browser-address-input");
const navEngine = document.getElementById("nav-engine");

if (window.ARX && ARX.settings) {
  const savedUrl = ARX.settings.ENGINES[ARX.settings.engineKey()];
  if (savedUrl) navEngine.value = savedUrl;
}
let currentEngine = navEngine.value;
let lastUrl = "";

function renderLibrary() {
  const grid = document.getElementById("library-grid");
  grid.innerHTML = library
    .map(
      (g) => `
    <a class="app-card" href="${g.path}">
      <div class="app-thumb" style="background: linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})">
        ${g.icon}
      </div>
      <div class="app-info">
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
        <span class="app-tag">${g.tag}</span>
      </div>
    </a>`
    )
    .join("");
}

function getEngineTemplate() {
  const select = navEngine;
  return select.value;
}

async function openBrowser(rawInput, engineTemplate) {
  const url = search(rawInput, engineTemplate);

  lastUrl = url;
  browserAddress.value = url;

  if (/^(blob|data|about|javascript|file):/i.test(url)) {
    frame.src = url;
    homeView.classList.add("hidden");
    browserView.classList.remove("hidden");
    window.scrollTo(0, 0);
    return;
  }

  if (settingsMode() === "scramjet") {
    try {
      await registerSW();
      await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((r) => setTimeout(r, 3000)),
      ]);
    } catch (e) {}
    try {
      await ensureScramjet();
      await ensureBareMux();
      const controller = window.__scramjetController;
      frame.src = controller.encodeUrl(url);
      homeView.classList.add("hidden");
      browserView.classList.remove("hidden");
      window.scrollTo(0, 0);
    } catch (e) {
      console.error("scramjet failed, falling back to UV", e);
      uvFallback = true;
      try {
        await ensureTransport();
      } catch (e2) {}
      frame.src = __site$config.prefix + __site$config.encodeUrl(url);
      homeView.classList.add("hidden");
      browserView.classList.remove("hidden");
      window.scrollTo(0, 0);
    }
    return;
  }

  try {
    await registerSW();
  } catch (e) {}
  try {
    await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((r) => setTimeout(r, 3000)),
    ]);
  } catch (e) {}
  try {
    await ensureTransport();
  } catch (e) {}

  frame.src = __site$config.prefix + __site$config.encodeUrl(url);
  homeView.classList.add("hidden");
  browserView.classList.remove("hidden");
  window.scrollTo(0, 0);
}

function closeBrowser() {
  frame.src = "about:blank";
  browserView.classList.add("hidden");
  homeView.classList.remove("hidden");
  window.scrollTo(0, 0);
}

// ---- form handlers ----

document.getElementById("hero-form").addEventListener("submit", (e) => {
  e.preventDefault();
  openBrowser(homeAddress.value, ARX.settings ? ARX.settings.engineTemplate() : "https://www.google.com/search?q=%s");
});

document.getElementById("nav-form").addEventListener("submit", (e) => {
  e.preventDefault();
  openBrowser(navAddress.value, navEngine.value);
});

document.getElementById("browser-form").addEventListener("submit", (e) => {
  e.preventDefault();
  openBrowser(browserAddress.value, navEngine.value);
});

navEngine.addEventListener("change", () => {
  currentEngine = navEngine.value;
  if (window.ARX && ARX.settings) {
    const key = Object.keys(ARX.settings.ENGINES).find((k) => ARX.settings.ENGINES[k] === navEngine.value);
    if (key) ARX.settings.set({ engine: key });
  }
});

// ---- browser toolbar ----

document.getElementById("btn-back").addEventListener("click", () => {
  try {
    frame.contentWindow.history.back();
  } catch (e) {}
});

document.getElementById("btn-forward").addEventListener("click", () => {
  try {
    frame.contentWindow.history.forward();
  } catch (e) {}
});

document.getElementById("btn-reload").addEventListener("click", () => {
  try {
    frame.contentWindow.location.reload();
  } catch (e) {
    frame.src = frame.src;
  }
});

document.getElementById("btn-home").addEventListener("click", () => {
  const home = ARX.settings ? ARX.settings.homeUrl() : "https://www.google.com";
  const engine = ARX.settings ? ARX.settings.engineTemplate() : "https://www.google.com/search?q=%s";
  openBrowser(home, engine);
});

document.getElementById("btn-exit").addEventListener("click", closeBrowser);

// ---- quick links ----

document.querySelectorAll(".quick-links a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    openBrowser(a.dataset.url, navEngine.value);
  });
});

renderLibrary();

document.getElementById("library-grid").addEventListener("click", (e) => {
  const card = e.target.closest("a.app-card");
  if (!card) return;
  const href = card.getAttribute("href");
  if (!href) return;
  e.preventDefault();
  if (href.startsWith("/")) {
    frame.src = href;
    lastUrl = href;
    browserAddress.value = href;
  } else {
    openBrowser(href, navEngine.value);
    return;
  }
  homeView.classList.add("hidden");
  browserView.classList.remove("hidden");
  window.scrollTo(0, 0);
});
