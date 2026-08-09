"use strict";

const library = [
  {
    name: "Path Study",
    desc: "Guide a growing path to collect targets.",
    path: "/apps/path-builder/",
    tag: "Logic",
    grad: ["#22c55e", "#0ea5e9"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M14 50h44" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M58 50v-22h22v22" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="86" cy="64" r="6" fill="#fff"/><circle cx="36" cy="50" r="4" fill="#052e16"/><circle cx="52" cy="50" r="4" fill="#052e16"/></svg>',
  },
  {
    name: "Number Merge",
    desc: "Merge matching tiles to build higher values.",
    path: "/apps/number-merge/",
    tag: "Math",
    cloak: "canvas",
    grad: ["#f59e0b", "#ef4444"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="14" width="22" height="22" rx="5" fill="#fff" opacity="0.9"/><rect x="42" y="14" width="22" height="22" rx="5" fill="#fff" opacity="0.7"/><rect x="14" y="42" width="22" height="22" rx="5" fill="#fff" opacity="0.7"/><rect x="42" y="42" width="44" height="44" rx="6" fill="#fff"/><text x="64" y="74" font-size="24" font-weight="bold" text-anchor="middle" fill="#ef4444">2</text></svg>',
  },
  {
    name: "Rally",
    desc: "Two-player rally on a canvas.",
    path: "/apps/rally/",
    tag: "Sports",
    grad: ["#a855f7", "#6366f1"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="8" y="28" width="8" height="44" rx="4" fill="#fff"/><rect x="84" y="28" width="8" height="44" rx="4" fill="#fff"/><line x1="50" y1="8" x2="50" y2="92" stroke="#fff" stroke-width="2" stroke-dasharray="6 6" opacity="0.6"/><circle cx="50" cy="50" r="7" fill="#fff"/></svg>',
  },
  {
    name: "Block Clearing",
    desc: "Clear the rows with a bouncing ball.",
    path: "/apps/block-clearing/",
    tag: "Physics",
    grad: ["#f472b6", "#f59e0b"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><g fill="#fff"><rect x="10" y="12" width="23" height="12" rx="3"/><rect x="39" y="12" width="23" height="12" rx="3"/><rect x="68" y="12" width="22" height="12" rx="3"/><rect x="10" y="30" width="23" height="12" rx="3"/><rect x="39" y="30" width="23" height="12" rx="3"/><rect x="68" y="30" width="22" height="12" rx="3"/></g><circle cx="62" cy="52" r="7" fill="#fff"/><rect x="22" y="82" width="56" height="9" rx="4.5" fill="#fff"/></svg>',
  },
  {
    name: "Grid Marks",
    desc: "Line up three marks before the computer.",
    path: "/apps/grid-marks/",
    tag: "Logic",
    cloak: "deltamath",
    grad: ["#34d399", "#22c55e"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><line x1="30" y1="8" x2="30" y2="92" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="70" y1="8" x2="70" y2="92" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="8" y1="30" x2="92" y2="30" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="8" y1="70" x2="92" y2="70" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>',
  },
  {
    name: "Pairs",
    desc: "Find all matching pairs.",
    path: "/apps/pair-study/",
    tag: "Cognition",
    grad: ["#0ea5e9", "#6366f1"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><g fill="#fff"><rect x="14" y="14" width="30" height="30" rx="6"/><rect x="56" y="14" width="30" height="30" rx="6"/><rect x="14" y="56" width="30" height="30" rx="6"/><rect x="56" y="56" width="30" height="30" rx="6"/></g><g fill="#0ea5e9"><rect x="20" y="20" width="18" height="18" rx="4"/><rect x="62" y="20" width="18" height="18" rx="4"/><rect x="20" y="62" width="18" height="18" rx="4"/><rect x="62" y="62" width="18" height="18" rx="4"/></g></svg>',
  },
  {
    name: "Block Studio",
    desc: "Creative building and exploration.",
    path: "/apps/block-studio/",
    tag: "3D",
    cloak: "docs",
    grad: ["#f59e0b", "#ef4444"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="20" stroke="#fff" stroke-width="6"/><line x1="50" y1="14" x2="50" y2="34" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="50" y1="66" x2="50" y2="86" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="14" y1="50" x2="34" y2="50" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="66" y1="50" x2="86" y2="50" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#f59e0b"/></svg>',
  },
  {
    name: "Court Rally",
    desc: "Local two-player match, first to five.",
    path: "/apps/court-rally/",
    tag: "Sports",
    grad: ["#34d399", "#a855f7"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="30" width="22" height="40" rx="6" fill="#34d399"/><rect x="64" y="30" width="22" height="40" rx="6" fill="#f472b6"/><line x1="38" y1="50" x2="62" y2="50" stroke="#fff" stroke-width="4" stroke-dasharray="6 6"/><line x1="26" y1="14" x2="32" y2="30" stroke="#34d399" stroke-width="6" stroke-linecap="round"/><line x1="74" y1="86" x2="68" y2="70" stroke="#f472b6" stroke-width="6" stroke-linecap="round"/></svg>',
  },
  {
    name: "Activity Hub",
    desc: "A huge library of online activities, all in one place.",
    path: "https://githubgames.gitlab.io/",
    tag: "Library",
    cloak: "khan",
    grad: ["#22c55e", "#0ea5e9"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M28 38a16 16 0 1 0 0 24M72 38a16 16 0 1 1 0 24" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M34 46a8 8 0 1 0 0 8M66 46a8 8 0 1 0 0 8" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="82" cy="26" r="6" fill="#f59e0b"/><path d="M82 20v12M76 26h12" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/></svg>',
  },
  {
    name: "Study Portal",
    desc: "A student resource hub with curated picks and a searchable library.",
    path: "https://gn-math.dev/",
    tag: "Library",
    cloak: "google",
    grad: ["#fc2651", "#0f172a"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="12" y="30" width="76" height="40" rx="20" stroke="#fff" stroke-width="7"/><path d="M32 45v10M27 50h10" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="68" cy="46" r="4" fill="#fff"/><circle cx="78" cy="56" r="4" fill="#fff"/></svg>',
  },
  {
    name: "Rhythm Studio",
    desc: "A rhythm challenge with levels, search, and a built-in editor.",
    path: "/apps/rhythm-studio/",
    tag: "Platformer",
    cloak: "docs",
    grad: ["#c1fb3d", "#16a34a"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M14 36h26l10 12h36v16H14z" fill="#fff"/><path d="M50 36l10 12 8-4-2 8h14" stroke="#16a34a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="26" cy="58" r="5" fill="#16a34a"/><circle cx="74" cy="58" r="5" fill="#16a34a"/></svg>',
  },
  {
    name: "Card Deck",
    desc: "A deck-building challenge. Build combos and score big hands.",
    path: "/apps/card-deck/",
    tag: "Cards",
    cloak: "classroom",
    grad: ["#f43f5e", "#7f1d1d"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="22" y="14" width="56" height="72" rx="8" fill="#fff" stroke="#7f1d1d" stroke-width="4"/><path d="M50 30l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#ef4444"/><circle cx="32" cy="26" r="3" fill="#7f1d1d"/><circle cx="68" cy="74" r="3" fill="#7f1d1d"/></svg>',
  },
  {
    name: "A Client",
    desc: "Online.",
    path: "/apps/astra/",
    tag: "3D",
    cloak: "docs",
    grad: ["#6d7df6", "#2dd4bf"],
    download: "/apps/astra/index.html",
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M50 8l12 30 30 12-30 12-12 30-12-30-30-12 30-12z" fill="#fff"/><circle cx="50" cy="50" r="9" fill="#6d7df6"/></svg>',
  },
  {
    name: "Text Document",
    desc: "A clean writing space that autosaves to your browser.",
    path: "/apps/text-doc/",
    tag: "Tools",
    cloak: "docs",
    grad: ["#4285f4", "#34a853"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="22" y="14" width="56" height="72" rx="6" fill="#fff"/><path d="M30 30h40M30 42h40M30 54h28" stroke="#4285f4" stroke-width="6" stroke-linecap="round"/><circle cx="70" cy="72" r="10" fill="#34a853"/></svg>',
  },
  {
    name: "Block Stack",
    desc: "Stack and clear lines as the pieces fall.",
    path: "/apps/stack-blocks/",
    tag: "Arcade",
    cloak: "docs",
    grad: ["#22d3ee", "#a78bfa"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="14" width="34" height="22" rx="3" fill="#22d3ee"/><rect x="48" y="14" width="38" height="22" rx="3" fill="#facc15"/><rect x="14" y="36" width="34" height="22" rx="3" fill="#a78bfa"/><rect x="48" y="36" width="38" height="22" rx="3" fill="#34d399"/><rect x="14" y="58" width="72" height="22" rx="3" fill="#fb7185"/></svg>',
  },
  {
    name: "Wing Hop",
    desc: "Tap to glide through the gaps.",
    path: "/apps/wing-hop/",
    tag: "Arcade",
    cloak: "docs",
    grad: ["#facc15", "#f97316"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><circle cx="42" cy="48" r="20" fill="#facc15"/><path d="M66 46l16-6-16 6v10l16-6-16 6z" fill="#f59e0b" fill-opacity="0.85"/><path d="M14 28h30M14 70h30" stroke="#34d399" stroke-width="8" stroke-linecap="round"/><circle cx="48" cy="42" r="3" fill="#1a1a1a"/><path d="M56 48l10-3-10 3v6l10-3-10 3z" fill="#f97316"/></svg>',
  },
  {
    name: "Bounce",
    desc: "Bounce upward and don't fall.",
    path: "/apps/bounce-up/",
    tag: "Arcade",
    cloak: "docs",
    grad: ["#34d399", "#f59e0b"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="36" r="16" fill="#f8c14a"/><rect x="40" y="50" width="20" height="22" rx="4" fill="#f8c14a"/><rect x="20" y="72" width="22" height="9" rx="4" fill="#34d399"/><rect x="58" y="64" width="24" height="9" rx="4" fill="#f59e0b"/><rect x="34" y="84" width="18" height="9" rx="4" fill="#f472b6"/></svg>',
  },
  {
    name: "Card Sort",
    desc: "Classic Klondike. Build all four foundations.",
    path: "/apps/card-sort/",
    tag: "Cards",
    cloak: "classroom",
    grad: ["#f43f5e", "#7c3aed"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="20" y="18" width="40" height="54" rx="6" fill="#fff" transform="rotate(-8 40 45)"/><rect x="34" y="30" width="40" height="54" rx="6" fill="#fff" transform="rotate(8 54 57)"/><text x="42" y="66" font-size="26" font-family="Georgia" fill="#dc2626">A</text><circle cx="56" cy="42" r="7" fill="#7c3aed"/><circle cx="56" cy="72" r="7" fill="#7c3aed"/></svg>',
  },
  {
    name: "Grid Sweep",
    desc: "Clear the grid without hitting a hidden cell.",
    path: "/apps/grid-sweep/",
    tag: "Logic",
    cloak: "canvas",
    grad: ["#60a5fa", "#22d3ee"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="14" width="72" height="72" rx="8" fill="#262a52"/><g stroke="#6d7df6" stroke-width="2"><line x1="26" y1="26" x2="74" y2="26"/><line x1="26" y1="42" x2="74" y2="42"/><line x1="26" y1="58" x2="74" y2="58"/><line x1="26" y1="74" x2="74" y2="74"/><line x1="26" y1="26" x2="26" y2="74"/><line x1="42" y1="26" x2="42" y2="74"/><line x1="58" y1="26" x2="58" y2="74"/><line x1="74" y1="26" x2="74" y2="74"/></g><circle cx="34" cy="34" r="5" fill="#34d399"/><circle cx="66" cy="50" r="5" fill="#f87171"/><circle cx="50" cy="66" r="5" fill="#facc15"/></svg>',
  },
  {
    name: "Number Grid",
    desc: "Fill the grid with logic, not luck.",
    path: "/apps/number-grid/",
    tag: "Logic",
    cloak: "classroom",
    grad: ["#34d399", "#0ea5e9"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="14" width="72" height="72" rx="6" fill="#1a1f33"/><g stroke="#6d7df6" stroke-width="3"><line x1="42" y1="14" x2="42" y2="86"/><line x1="58" y1="14" x2="58" y2="86"/><line x1="14" y1="42" x2="86" y2="42"/><line x1="14" y1="58" x2="86" y2="58"/></g><g stroke="#3a4158" stroke-width="1.5"><line x1="28" y1="14" x2="28" y2="86"/><line x1="72" y1="14" x2="72" y2="86"/><line x1="14" y1="28" x2="86" y2="28"/><line x1="14" y1="72" x2="86" y2="72"/></g><g fill="#34d399" font-size="14" font-family="Georgia"><text x="21" y="26">3</text><text x="65" y="66">7</text><text x="36" y="76">5</text></g></svg>',
  },
  {
    name: "Board Strategy",
    desc: "Play against a simple opponent.",
    path: "/apps/board-strategy/",
    tag: "Strategy",
    cloak: "classroom",
    grad: ["#b58863", "#3a4158"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="30" width="72" height="56" rx="4" fill="#b58863"/><g font-size="30" text-anchor="middle"><text x="32" y="70" fill="#f5efdf">&#9817;</text><text x="56" y="70" fill="#1a1a1a">&#9823;</text><text x="80" y="70" fill="#f5efdf">&#9817;</text></g><path d="M20 26h60l-6 8H26z" fill="#f5efdf"/><circle cx="50" cy="20" r="6" fill="#f5efdf"/></svg>',
  },
  {
    name: "Word Guess",
    desc: "Guess the hidden word in six tries.",
    path: "/apps/word-guess/",
    tag: "Word",
    cloak: "classroom",
    grad: ["#34d399", "#f59e0b"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="14" width="20" height="20" rx="3" fill="#34d399"/><rect x="40" y="14" width="20" height="20" rx="3" fill="#f59e0b"/><rect x="66" y="14" width="20" height="20" rx="3" fill="#3a4158"/><rect x="14" y="40" width="20" height="20" rx="3" fill="#3a4158"/><rect x="40" y="40" width="20" height="20" rx="3" fill="#34d399"/><rect x="66" y="40" width="20" height="20" rx="3" fill="#3a4158"/><rect x="14" y="66" width="20" height="20" rx="3" fill="#3a4158"/><rect x="40" y="66" width="20" height="20" rx="3" fill="#3a4158"/><rect x="66" y="66" width="20" height="20" rx="3" fill="#f59e0b"/></svg>',
  },
];

const CUSTOM_KEY = "arx-custom-games";
const GRADS = [
  { label: "Violet", v: ["#6d7df6", "#2dd4bf"] },
  { label: "Sunset", v: ["#f59e0b", "#ef4444"] },
  { label: "Purple", v: ["#a855f7", "#6366f1"] },
  { label: "Green", v: ["#22c55e", "#0ea5e9"] },
  { label: "Pink", v: ["#f472b6", "#f59e0b"] },
  { label: "Teal", v: ["#2dd4bf", "#0ea5e9"] },
];

function customGames() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function saveCustom(list) {
  try {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
  } catch (e) {}
}

function removeCustomGame(name) {
  saveCustom(customGames().filter((g) => g.name !== name));
  renderLibrary();
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

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

// ---- view refs ----

const homeView = document.getElementById("home-view");
const browserView = document.getElementById("browser-view");
const tabBar = document.getElementById("tab-bar");
const homeAddress = document.getElementById("hero-address");
const navAddress = document.getElementById("nav-address");
const browserAddress = document.getElementById("browser-address-input");
const navEngine = document.getElementById("nav-engine");
const panicOverlay = document.getElementById("panic-overlay");
const btnToggleNav = document.getElementById("btn-toggle-nav");
const navToggleLabel = document.getElementById("btn-toggle-nav-label");

const NAV_HIDE_KEY = "arx-no-nav";

function applyNavPref() {
  const hidden = localStorage.getItem(NAV_HIDE_KEY) === "1";
  document.body.classList.toggle("no-nav", hidden);
  if (navToggleLabel) navToggleLabel.textContent = hidden ? "Show bar" : "Hide bar";
}

function setNavHidden(hidden) {
  localStorage.setItem(NAV_HIDE_KEY, hidden ? "1" : "0");
  applyNavPref();
}

if (btnToggleNav) {
  btnToggleNav.addEventListener("click", () => {
    setNavHidden(!document.body.classList.contains("no-nav"));
  });
}

if (window.ARX && ARX.settings) {
  const savedUrl = ARX.settings.ENGINES[ARX.settings.engineKey()];
  if (savedUrl) navEngine.value = savedUrl;
}
let currentEngine = navEngine.value;
let lastUrl = "";

// ---- proxy ----

async function proxify(url) {
  if (/^(blob|data|about|javascript|file):/i.test(url)) return url;
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
      return window.__scramjetController.encodeUrl(url);
    } catch (e) {
      console.error("scramjet failed, falling back to UV", e);
      uvFallback = true;
      try {
        await ensureTransport();
      } catch (e2) {}
      return __site$config.prefix + __site$config.encodeUrl(url);
    }
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
  return __site$config.prefix + __site$config.encodeUrl(url);
}

// ---- tabs ----

let tabs = [];
let activeTabId = null;
let tabSeq = 0;
const framesBox = document.getElementById("frames");

function embedMode() {
  return !(window.ARX && ARX.settings) || ARX.settings.openMode() === "embed";
}

function applyTabCloak(tab) {
  if (!window.ARX || !ARX.settings) return;
  if (tab && tab.cloak) ARX.settings.applyCloakName(tab.cloak);
  else ARX.settings.applyCloak();
}

function renderTabs() {
  tabBar.innerHTML = tabs
    .map(
      (t) => `
    <div class="tab${t.id === activeTabId ? " active" : ""}${t.pinned ? " pinned" : ""}${t.incognito ? " incognito" : ""}" data-id="${t.id}" title="${esc(t.url)}">
      ${t.incognito ? '<span class="tab-pin-icon incognito-mark">&#128065;</span>' : ""}
      ${t.pinned ? '<span class="tab-pin-icon">&#128204;</span>' : ""}
      <span class="tab-title">${esc(t.title)}</span>
      <button class="tab-fs" data-id="${t.id}" title="Fullscreen" ${t.pinned ? "disabled" : ""}>&#9974;</button>
      <button class="tab-close" data-id="${t.id}" title="Close tab" ${t.pinned ? "disabled" : ""}>&#10005;</button>
    </div>`
    )
    .join("");
}

function decodeUrlForDisplay(href) {
  if (!href) return "";
  try {
    const u = new URL(href);
    if (u.origin !== location.origin) return href;
    if (u.pathname.indexOf("/scramjet/") === 0) {
      try {
        return window.__scramjetController.decodeUrl(u.pathname + u.search);
      } catch (e) {}
    }
    try {
      if (u.pathname.indexOf(__site$config.prefix) === 0) {
        const decoded = __site$config.decodeUrl(u.pathname.slice(__site$config.prefix.length) + u.search);
        if (decoded) return decoded;
      }
    } catch (e) {}
  } catch (e) {}
  return href;
}

function updateAddressBar() {
  const tab = tabs.find((t) => t.id === activeTabId);
  const url = tab ? tab.url : "";
  browserAddress.value = url;
  lastUrl = url;
}

function onFrameLoad(tab) {
  try {
    const w = tab.frame.contentWindow;
    if (!w || !w.location) return;
    const href = w.location.href;
    if (!href || href === "about:blank") return;
    const display = decodeUrlForDisplay(href);
    tab.loadUrl = href;
    tab.proxied = true;
    if (!tab.local) tab.url = display;
    try {
      tab.title = w.document.title || display;
    } catch (e) {
      tab.title = display;
    }
    if (tab.id === activeTabId) {
      updateAddressBar();
      renderTabs();
    }
  } catch (e) {}
}

function makeFrame(tab) {
  const f = document.createElement("iframe");
  f.className = "browser-frame";
  f.title = "Browser";
  f.addEventListener("load", () => onFrameLoad(tab));
  framesBox.appendChild(f);
  return f;
}

function setActiveFrame(tab) {
  tabs.forEach((t) => {
    if (t.frame) {
      t.frame.classList.toggle("active", t.id === activeTabId);
      if (t.id === activeTabId) t.frame.id = "frame";
      else if (t.frame.id === "frame") t.frame.removeAttribute("id");
    }
  });
}

async function activateTab(id, doProxy) {
  const tab = tabs.find((t) => t.id === id);
  if (!tab) return;
  activeTabId = tab.id;
  if (doProxy && !tab.proxied) {
    try {
      tab.loadUrl = await proxify(tab.url);
      tab.proxied = true;
    } catch (e) {}
  }
  if (!tab.frame) tab.frame = makeFrame(tab);
  setActiveFrame(tab);
  const target = tab.loadUrl || "about:blank";
  if (tab.frame.src !== target) tab.frame.src = target;
  updateAddressBar();
  applyTabCloak(tab);
  renderTabs();
  homeView.classList.add("hidden");
  browserView.classList.remove("hidden");
  applyNavPref();
  window.scrollTo(0, 0);
}

function openTab(url, title, opts) {
  opts = opts || {};
  const tab = {
    id: "t" + ++tabSeq,
    title: title || url,
    url: opts.displayUrl || url,
    loadUrl: url,
    local: /^\/(?!\/)/.test(url),
    proxied: false,
    cloak: opts.cloak || null,
    pinned: !!opts.pinned,
    incognito: !!opts.incognito,
    frame: null,
  };
  tabs.push(tab);
  renderTabs();
  activateTab(tab.id, !!opts.proxy);
}

function closeTab(id) {
  const idx = tabs.findIndex((t) => t.id === id);
  if (idx === -1) return;
  const tab = tabs[idx];
  if (tab.pinned) return;
  try {
    tab.frame.src = "about:blank";
    tab.frame.remove();
  } catch (e) {}
  tabs.splice(idx, 1);
  if (tabs.length === 0) {
    showHome();
    return;
  }
  const next = tabs[Math.min(idx, tabs.length - 1)];
  renderTabs();
  activateTab(next.id);
}

function pinTab(id, pinned) {
  const tab = tabs.find((t) => t.id === id);
  if (!tab) return;
  tab.pinned = !!pinned;
  renderTabs();
}

function homeUrl() {
  if (window.ARX && ARX.settings) {
    const h = ARX.settings.homeUrl();
    if (h) return h;
  }
  return "https://duckduckgo.com";
}

function engineHome() {
  try {
    const tpl =
      window.ARX && ARX.settings ? ARX.settings.engineTemplate() : "https://duckduckgo.com/?q=%s";
    return new URL(tpl).origin;
  } catch (e) {
    return "https://duckduckgo.com";
  }
}

function newTab() {
  const home = homeUrl();
  openTab(home, home, { proxy: true });
}

function openIncognito() {
  const home = engineHome();
  openTab(home, home + " (Incognito)", { proxy: true, incognito: true });
}

function fullscreenTab(id) {
  const tab = tabs.find((t) => t.id === id);
  if (!tab) return;
  activateTab(id);
  const target = tab.frame || document.documentElement;
  try {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (target.requestFullscreen) target.requestFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
  } catch (e) {}
}

function showHome() {
  if (window.ARX && ARX.settings) ARX.settings.applyCloak();
  activeTabId = null;
  setActiveFrame(null);
  renderTabs();
  document.body.classList.remove("no-nav");
  if (navToggleLabel) navToggleLabel.textContent = "Hide bar";
  browserView.classList.add("hidden");
  homeView.classList.remove("hidden");
  window.scrollTo(0, 0);
}

function navTab(action) {
  const tab = tabs.find((t) => t.id === activeTabId);
  if (!tab || !tab.frame) return;
  try {
    if (action === "back") tab.frame.contentWindow.history.back();
    else if (action === "forward") tab.frame.contentWindow.history.forward();
    else if (action === "reload") tab.frame.contentWindow.location.reload();
  } catch (e) {
    try { tab.frame.src = tab.frame.src; } catch (e2) {}
  }
}

// ---- library ----

function cardHtml(g) {
  const thumb = g.icon
    ? g.icon
    : `<span class="thumb-emoji">${g.emoji ? esc(g.emoji) : "&#127918;"}</span>`;
  const isDownload = !!g.download;
  return `
    <div class="app-card-wrap${g.custom ? " custom-card" : ""}">
      <a class="app-card${isDownload ? " download-card" : ""}" href="${esc(g.download || g.path)}" ${isDownload ? `download="${esc(g.name + ".html")}"` : ""} data-cloak="${esc(g.cloak || "")}">
        ${g.custom ? `<button class="card-remove" title="Remove game" data-remove="${esc(g.name)}">&#10005;</button>` : ""}
        <div class="app-thumb" style="background: linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})">
          ${thumb}
        </div>
        <div class="app-info">
          <h3>${esc(g.name)}</h3>
          <p>${esc(g.desc || "Your custom game.")}</p>
          <span class="app-tag">${esc(g.tag || "Custom")}</span>
        </div>
        ${isDownload ? `<span class="card-dl-label">&#11015; Download</span>` : ""}
      </a>
    </div>`;
}

function renderLibrary() {
  const grid = document.getElementById("library-grid");
  const customs = customGames().map((g) => Object.assign({}, g, { custom: true }));
  grid.innerHTML = library.concat(customs).map(cardHtml).join("");
}

const RECENT_KEY = "arx-recent";

function recentGames() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function addRecentGame(name, href, cloak, grad, icon, emoji) {
  try {
    const list = recentGames().filter((g) => g.name !== name);
    list.unshift({ name, href, cloak: cloak || "", grad: grad || ["#6d7df6", "#2dd4bf"], icon: icon || "", emoji: emoji || "" });
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5)));
  } catch (e) {}
}

function camouflageMode() {
  return window.ARX && ARX.settings ? ARX.settings.camoMode() : "off";
}

async function openGameCamouflaged(href, name, cloak) {
  const isLocal = href.startsWith("/");
  let inner = href;
  if (!isLocal) {
    try {
      inner = await proxify(href);
    } catch (e) {}
  }
  const camo =
    "/camo.html?src=" +
    encodeURIComponent(inner) +
    "&title=" +
    encodeURIComponent(name || "Untitled document");
  openTab(camo, (name || "Document") + " - Google Docs", {
    proxy: false,
    cloak: cloak || "docs",
    displayUrl: "/document/d/" + encodeURIComponent(name || "document"),
  });
}

function openGame(href, name, cloak) {
  const isLocal = href.startsWith("/");
  if (embedMode()) {
    if (camouflageMode() !== "off") {
      openGameCamouflaged(href, name, cloak);
      return;
    }
    openTab(href, name, { proxy: !isLocal, cloak: cloak });
  } else {
    try {
      window.open(isLocal ? location.origin + href : href, "_blank");
    } catch (e) {}
  }
}

// ---- panic ----

function panicTarget() {
  return window.ARX && ARX.settings ? ARX.settings.panicTarget() : "google";
}

function showPanic() {
  const t = panicTarget();
  document.getElementById("panic-google").classList.toggle("hidden", t !== "google");
  document.getElementById("panic-canvas").classList.toggle("hidden", t !== "canvas");
  if (window.ARX && ARX.settings) ARX.settings.applyCloakName(t === "canvas" ? "canvas" : "google");
  panicOverlay.classList.remove("hidden");
  const input = document.getElementById("panic-search");
  if (input) {
    input.value = "";
    setTimeout(() => input.focus(), 30);
  }
}

function hidePanic() {
  panicOverlay.classList.add("hidden");
  if (window.ARX && ARX.settings) {
    const tab = tabs.find((t) => t.id === activeTabId);
    if (tab && tab.cloak) ARX.settings.applyCloakName(tab.cloak);
    else ARX.settings.applyCloak();
  }
}

function panicCombo() {
  return window.ARX && ARX.settings ? ARX.settings.panicKey() : "`";
}

document.addEventListener(
  "keydown",
  (e) => {
    const active = document.activeElement;
    if (active && active.id === "set-panic-key") return;
    if (!(window.ARX && ARX.settings)) return;
    if (ARX.settings.comboFromEvent(e) !== panicCombo()) return;
    if (panicOverlay.classList.contains("hidden")) showPanic();
    else hidePanic();
  },
  true
);

document.getElementById("panic-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = document.getElementById("panic-search").value.trim();
  if (!q) return;
  const url = "https://www.google.com/search?q=" + encodeURIComponent(q);
  try {
    window.open(await proxify(url), "_blank");
  } catch (err) {}
  hidePanic();
});

// ---- add game modal ----

(function initAddModal() {
  const gradSel = document.getElementById("add-grad");
  if (gradSel) {
    gradSel.innerHTML = GRADS.map((g, i) => `<option value="${i}">${g.label}</option>`).join("");
  }
  const cloakSel = document.getElementById("add-cloak");
  if (cloakSel && window.ARX && ARX.settings) {
    let opts = '<option value="">None (default)</option>';
    Object.keys(ARX.settings.CLOAKS).forEach((k) => {
      if (k === "default") return;
      opts += `<option value="${k}">${ARX.settings.CLOAKS[k].title}</option>`;
    });
    cloakSel.innerHTML = opts;
  }
})();

const addModal = document.getElementById("add-modal");
document.getElementById("btn-add-game").addEventListener("click", () => {
  addModal.classList.remove("hidden");
});
document.getElementById("btn-add-cancel").addEventListener("click", () => {
  addModal.classList.add("hidden");
});
document.getElementById("btn-add-save").addEventListener("click", () => {
  const name = document.getElementById("add-name").value.trim();
  let url = document.getElementById("add-url").value.trim();
  if (!name || !url) return;
  if (!/^([a-z][a-z0-9+.-]*:|\/)/i.test(url)) url = "https://" + url;
  const emoji = document.getElementById("add-icon").value.trim();
  const grad = GRADS[parseInt(document.getElementById("add-grad").value, 10)] || GRADS[0];
  const cloak = document.getElementById("add-cloak").value || "";
  const list = customGames();
  list.push({ name, desc: "", path: url, tag: "Custom", grad: grad.v, icon: "", emoji, cloak });
  saveCustom(list);
  renderLibrary();
  addModal.classList.add("hidden");
  document.getElementById("add-name").value = "";
  document.getElementById("add-url").value = "";
  document.getElementById("add-icon").value = "";
});
addModal.addEventListener("click", (e) => {
  if (e.target === addModal) addModal.classList.add("hidden");
});

// ---- form handlers ----

document.getElementById("hero-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const tpl = ARX.settings ? ARX.settings.engineTemplate() : "https://www.google.com/search?q=%s";
  const url = search(homeAddress.value, tpl);
  openTab(url, url, { proxy: true });
});

document.getElementById("nav-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const url = search(navAddress.value, navEngine.value);
  openTab(url, url, { proxy: true });
});

document.getElementById("browser-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const tab = tabs.find((t) => t.id === activeTabId);
  if (!tab) return;
  const url = search(browserAddress.value, navEngine.value);
  tab.url = url;
  tab.title = url;
  tab.proxied = false;
  tab.loadUrl = url;
  tab.local = /^\/(?!\/)/.test(url);
  activateTab(tab.id, !/^(blob|data|about|javascript|file):/i.test(url));
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
  navTab("back");
});

document.getElementById("btn-forward").addEventListener("click", () => {
  navTab("forward");
});

document.getElementById("btn-reload").addEventListener("click", () => {
  navTab("reload");
});

document.getElementById("btn-home").addEventListener("click", showHome);
document.getElementById("btn-new-tab").addEventListener("click", newTab);

document.getElementById("nav-open-browser").addEventListener("click", (e) => {
  e.preventDefault();
  if (tabs.length === 0) {
    newTab();
  } else if (activeTabId) {
    activateTab(activeTabId);
  } else {
    browserView.classList.remove("hidden");
    homeView.classList.add("hidden");
  }
});

document.getElementById("btn-incognito").addEventListener("click", openIncognito);

document.getElementById("btn-fullscreen").addEventListener("click", () => {
  if (activeTabId) fullscreenTab(activeTabId);
  else {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    } catch (e) {}
  }
});

document.getElementById("btn-exit").addEventListener("click", () => {
  tabs.forEach((t) => {
    try { t.frame && t.frame.remove(); } catch (e) {}
  });
  tabs = [];
  showHome();
});

// ---- tab bar ----

tabBar.addEventListener("click", (e) => {
  const fs = e.target.closest(".tab-fs");
  if (fs) {
    e.stopPropagation();
    fullscreenTab(fs.getAttribute("data-id"));
    return;
  }
  const close = e.target.closest(".tab-close");
  if (close) {
    e.stopPropagation();
    closeTab(close.getAttribute("data-id"));
    return;
  }
  const tab = e.target.closest(".tab");
  if (!tab) return;
  activateTab(tab.getAttribute("data-id"));
});

tabBar.addEventListener("contextmenu", (e) => {
  const tabEl = e.target.closest(".tab");
  if (!tabEl) return;
  e.preventDefault();
  pinTab(tabEl.getAttribute("data-id"), !tabs.find((t) => t.id === tabEl.getAttribute("data-id")).pinned);
});

// ---- keyboard shortcuts (real-browser feel) ----

document.addEventListener(
  "keydown",
  (e) => {
    const active = document.activeElement;
    const typing =
      active &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.tagName === "SELECT" ||
        active.isContentEditable);
    if (e.ctrlKey || e.metaKey) {
      const k = e.key.toLowerCase();
      if (k === "l") {
        e.preventDefault();
        browserAddress.focus();
        browserAddress.select();
      } else if (k === "t") {
        e.preventDefault();
        newTab();
      } else if (k === "w") {
        e.preventDefault();
        if (activeTabId) closeTab(activeTabId);
      } else if (k === "tab") {
        e.preventDefault();
        if (tabs.length > 1) {
          const idx = tabs.findIndex((t) => t.id === activeTabId);
          const next = tabs[(idx + (e.shiftKey ? tabs.length - 1 : 1)) % tabs.length];
          activateTab(next.id);
        }
      }
    }
    if (e.key === "Escape" && !typing) {
      if (!document.getElementById("add-modal").classList.contains("hidden")) {
        document.getElementById("add-modal").classList.add("hidden");
      }
      if (!document.getElementById("settings-modal").classList.contains("hidden")) {
        document.getElementById("settings-modal").classList.add("hidden");
      }
    }
  },
  true
);

// ---- transport health ----

async function measureLatency(fn) {
  const start = performance.now();
  try {
    const ok = await fn();
    return { ok, ms: Math.round(performance.now() - start) };
  } catch (e) {
    return { ok: false, ms: null, err: String(e && e.message || e) };
  }
}

async function probeWispHealth(wsUrl) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (ok, ms) => {
      if (done) return;
      done = true;
      resolve({ ok, ms });
    };
    try {
      const start = performance.now();
      const probe = new WebSocket(wsUrl);
      const timer = setTimeout(() => {
        try { probe.close(); } catch (e) {}
        finish(false, null);
      }, 3000);
      probe.onopen = () => {
        clearTimeout(timer);
        finish(true, Math.round(performance.now() - start));
        try { probe.close(); } catch (e) {}
      };
      probe.onerror = () => {
        clearTimeout(timer);
        finish(false, null);
      };
    } catch (e) {
      finish(false, null);
    }
  });
}

function healthRow(name, result, note) {
  const dot = result.ok ? "ok" : "down";
  const ms = result.ms !== null ? result.ms + "ms" : "-";
  return `<div class="health-row"><span class="health-dot ${dot}"></span><span class="health-name">${esc(name)}</span><span class="health-ms">${ms}</span></div>`;
}

async function refreshTransportHealth() {
  const el = document.getElementById("transport-health");
  if (!el) return;
  const sameOriginWisp =
    (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/stream/";
  const bareUrl = (config.bareServers.length ? config.bareServers[0] : "/remote/");
  el.innerHTML = '<div class="health-row"><span class="health-dot spin"></span><span class="health-name">Probing...</span></div>';
  const results = {};
  results["Backend (same-origin)"] = await measureLatency(async () => {
    const r = await fetch("/__status__", { cache: "no-store" });
    return r.ok;
  });
  if (results["Backend (same-origin)"].ok) {
    results["Wisp /stream/"] = await probeWispHealth(sameOriginWisp);
    results["Bare /remote/"] = await measureLatency(async () => {
      const r = await fetch(new URL(bareUrl, location.href), { method: "HEAD", cache: "no-store" });
      return true;
    });
  }
  const mode = settingsMode();
  let note = "";
  if (mode === "scramjet") note = '<div class="health-note">Scramjet mode: proxy handled by service worker.</div>';
  else if (mode === "custom") note = '<div class="health-note">Custom transport URL configured.</div>';
  el.innerHTML =
    Object.entries(results)
      .map(([k, v]) => healthRow(k, v))
      .join("") + note;
}

const settingsOpenBtn = document.getElementById("btn-settings");
if (settingsOpenBtn) {
  settingsOpenBtn.addEventListener("click", () => {
    setTimeout(refreshTransportHealth, 60);
  });
}

// ---- clock ----

const clockEl = document.getElementById("hero-clock");
function tickClock() {
  if (!clockEl) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  clockEl.innerHTML = `<span class="clock-time">${time}</span><span class="clock-date">${date}</span>`;
}
if (clockEl) {
  tickClock();
  setInterval(tickClock, 1000);
}

// ---- what's new ----

const CHANGELOG = [
  "Browser-style tabs: pin with right-click, Ctrl+T/L/W/Tab shortcuts.",
  "Camouflage mode: wrap games in a fake Google Doc (Settings).",
  "Custom cloaks: set your own tab title + icon.",
  "Transport health dashboard in Settings.",
  "Recently played row on home.",
  "Incognito tabs via Ctrl+Shift+N or the toolbar button.",
];

const NEWS_KEY = "arx-news-dismissed";
const newsSection = document.getElementById("news-section");
const newsList = document.getElementById("news-list");

function renderNews() {
  if (!newsSection || !newsList) return;
  try {
    if (localStorage.getItem(NEWS_KEY)) return;
  } catch (e) {}
  newsSection.classList.remove("hidden");
  newsList.innerHTML = CHANGELOG.map((c) => `<li>${esc(c)}</li>`).join("");
}

const newsDismiss = document.getElementById("btn-news-dismiss");
if (newsDismiss) {
  newsDismiss.addEventListener("click", () => {
    try {
      localStorage.setItem(NEWS_KEY, String(Date.now()));
    } catch (e) {}
    newsSection.classList.add("hidden");
  });
}

renderNews();

// ---- quick links ----

document.querySelectorAll(".quick-links a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    openTab(a.dataset.url, a.dataset.url, { proxy: true });
  });
});

// ---- library clicks ----

function findLibraryGame(name) {
  return library.find((g) => g.name === name) || customGames().find((g) => g.name === name);
}

document.getElementById("library-grid").addEventListener("click", (e) => {
  const rm = e.target.closest("[data-remove]");
  if (rm) {
    e.preventDefault();
    e.stopPropagation();
    removeCustomGame(rm.getAttribute("data-remove"));
    return;
  }
  const card = e.target.closest("a.app-card");
  if (!card) return;
  if (card.hasAttribute("download")) return;
  e.preventDefault();
  const href = card.getAttribute("href");
  const h3 = card.querySelector("h3");
  const name = h3 ? h3.textContent : href;
  const cloak = card.getAttribute("data-cloak") || null;
  const game = findLibraryGame(name);
  addRecentGame(
    name,
    href,
    cloak,
    game && game.grad,
    game && game.icon,
    game && (game.emoji || "")
  );
  renderRecent();
  openGame(href, name, cloak);
});

// ---- recently played ----

const recentGrid = document.getElementById("recent-grid");
const recentSection = document.getElementById("recent-section");

function renderRecent() {
  const recents = recentGames();
  if (!recentGrid || !recentSection) return;
  recentSection.classList.toggle("hidden", recents.length === 0);
  recentGrid.innerHTML = recents
    .map(
      (g) => `
    <div class="app-card-wrap recent-card">
      <a class="app-card" href="${esc(g.href)}" data-cloak="${esc(g.cloak || "")}">
        <div class="app-thumb" style="background: linear-gradient(135deg, ${esc((g.grad && g.grad[0]) || "#6d7df6")}, ${esc((g.grad && g.grad[1]) || "#2dd4bf")})">
          ${g.icon ? g.icon : `<span class="thumb-emoji">${g.emoji ? esc(g.emoji) : "&#127918;"}</span>`}
        </div>
        <div class="app-info">
          <h3>${esc(g.name)}</h3>
        </div>
      </a>
    </div>`
    )
    .join("");
}

if (recentGrid) {
  recentGrid.addEventListener("click", (e) => {
    const card = e.target.closest("a.app-card");
    if (!card) return;
    e.preventDefault();
    const href = card.getAttribute("href");
    const h3 = card.querySelector("h3");
    const name = h3 ? h3.textContent : href;
    const cloak = card.getAttribute("data-cloak") || null;
    const game = findLibraryGame(name);
    addRecentGame(name, href, cloak, game && game.grad, game && game.icon, game && (game.emoji || ""));
    renderRecent();
    openGame(href, name, cloak);
  });
}

// ---- migrate stale local names/paths from earlier builds ----

const OLD_NAME_TO_NEW = {
  "Sudoku": "Number Grid",
  "Doodle Jump": "Bounce",
  "Snake": "Path Study",
  "2048": "Number Merge",
  "Pong": "Rally",
  "Breakout": "Block Clearing",
  "Tic-Tac-Toe": "Grid Marks",
  "Memory Match": "Pairs",
  "Strike 3D": "Block Studio",
  "Duel Arena": "Court Rally",
  "Web Dashers": "Rhythm Studio",
  "Balatro": "Card Deck",
  "Tetris": "Block Stack",
  "Flappy Bird": "Wing Hop",
  "Solitaire": "Card Sort",
  "Minesweeper": "Grid Sweep",
  "Chess": "Board Strategy",
  "Wordle": "Word Guess",
};

const OLD_PATH_TO_NEW = {
  "/apps/sudoku/": "/apps/number-grid/",
  "/apps/doodle/": "/apps/bounce-up/",
  "/apps/snake/": "/apps/path-builder/",
  "/apps/2048/": "/apps/number-merge/",
  "/apps/pong/": "/apps/rally/",
  "/apps/breakout/": "/apps/block-clearing/",
  "/apps/tic-tac-toe/": "/apps/grid-marks/",
  "/apps/memory/": "/apps/pair-study/",
  "/apps/strike3d/": "/apps/block-studio/",
  "/apps/duel/": "/apps/court-rally/",
  "/apps/web-dashers/": "/apps/rhythm-studio/",
  "/apps/balatro/": "/apps/card-deck/",
  "/apps/flappy/": "/apps/wing-hop/",
  "/apps/solitaire/": "/apps/card-sort/",
  "/apps/minesweeper/": "/apps/grid-sweep/",
  "/apps/chess/": "/apps/board-strategy/",
  "/apps/wordle/": "/apps/word-guess/",
};

function localAppPaths() {
  return library
    .filter((g) => g.path && g.path.startsWith("/apps/"))
    .map((g) => g.path);
}

function migrateStoredGames() {
  const paths = localAppPaths();
  const valid = (href) => !/^\/apps\//.test(href) || paths.indexOf(href) !== -1;
  try {
    const recents = recentGames()
      .map((g) => Object.assign({}, g, {
        name: OLD_NAME_TO_NEW[g.name] || g.name,
        href: OLD_PATH_TO_NEW[g.href] || g.href,
      }))
      .filter((g) => valid(g.href));
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents.slice(0, 5)));
  } catch (e) {}
  try {
    const customs = customGames()
      .map((g) => Object.assign({}, g, {
        name: OLD_NAME_TO_NEW[g.name] || g.name,
        path: OLD_PATH_TO_NEW[g.path] || g.path,
      }))
      .filter((g) => valid(g.path));
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(customs));
  } catch (e) {}
}

migrateStoredGames();

renderRecent();

renderLibrary();

// ---- preload in-house games ----

(function preloadGames() {
  const local = library
    .filter((g) => g.path && g.path.startsWith("/apps/") && !g.download)
    .map((g) => g.path);
  if (!local.length) return;
  const schedule = (fn) =>
    "requestIdleCallback" in window ? window.requestIdleCallback(fn) : setTimeout(fn, 1500);
  schedule(() => {
    local.forEach((path) => {
      try {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = path;
        document.head.appendChild(link);
      } catch (e) {}
    });
  });
})();
