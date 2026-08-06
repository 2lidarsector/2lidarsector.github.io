"use strict";

const library = [
  {
    name: "Snake",
    desc: "Classic snake. Eat, grow, survive.",
    path: "/apps/snake/",
    tag: "Classic",
    grad: ["#22c55e", "#0ea5e9"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><path d="M14 50h44" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M58 50v-22h22v22" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="86" cy="64" r="6" fill="#fff"/><circle cx="36" cy="50" r="4" fill="#052e16"/><circle cx="52" cy="50" r="4" fill="#052e16"/></svg>',
  },
  {
    name: "2048",
    desc: "Merge tiles to reach 2048.",
    path: "/apps/2048/",
    tag: "Puzzle",
    grad: ["#f59e0b", "#ef4444"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="14" y="14" width="22" height="22" rx="5" fill="#fff" opacity="0.9"/><rect x="42" y="14" width="22" height="22" rx="5" fill="#fff" opacity="0.7"/><rect x="14" y="42" width="22" height="22" rx="5" fill="#fff" opacity="0.7"/><rect x="42" y="42" width="44" height="44" rx="6" fill="#fff"/><text x="64" y="74" font-size="24" font-weight="bold" text-anchor="middle" fill="#ef4444">2</text></svg>',
  },
  {
    name: "Pong",
    desc: "1v1 table tennis on a canvas.",
    path: "/apps/pong/",
    tag: "Arcade",
    grad: ["#a855f7", "#6366f1"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><rect x="8" y="28" width="8" height="44" rx="4" fill="#fff"/><rect x="84" y="28" width="8" height="44" rx="4" fill="#fff"/><line x1="50" y1="8" x2="50" y2="92" stroke="#fff" stroke-width="2" stroke-dasharray="6 6" opacity="0.6"/><circle cx="50" cy="50" r="7" fill="#fff"/></svg>',
  },
  {
    name: "Breakout",
    desc: "Smash all the bricks.",
    path: "/apps/breakout/",
    tag: "Arcade",
    grad: ["#f472b6", "#f59e0b"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><g fill="#fff"><rect x="10" y="12" width="23" height="12" rx="3"/><rect x="39" y="12" width="23" height="12" rx="3"/><rect x="68" y="12" width="22" height="12" rx="3"/><rect x="10" y="30" width="23" height="12" rx="3"/><rect x="39" y="30" width="23" height="12" rx="3"/><rect x="68" y="30" width="22" height="12" rx="3"/></g><circle cx="62" cy="52" r="7" fill="#fff"/><rect x="22" y="82" width="56" height="9" rx="4.5" fill="#fff"/></svg>',
  },
  {
    name: "Tic-Tac-Toe",
    desc: "Beat the AI in this classic.",
    path: "/apps/tic-tac-toe/",
    tag: "Strategy",
    grad: ["#34d399", "#22c55e"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><line x1="30" y1="8" x2="30" y2="92" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="70" y1="8" x2="70" y2="92" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="8" y1="30" x2="92" y2="30" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="8" y1="70" x2="92" y2="70" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>',
  },
  {
    name: "Memory Match",
    desc: "Find all matching pairs.",
    path: "/apps/memory/",
    tag: "Puzzle",
    grad: ["#0ea5e9", "#6366f1"],
    icon: '<svg viewBox="0 0 100 100" fill="none"><g fill="#fff"><rect x="14" y="14" width="30" height="30" rx="6"/><rect x="56" y="14" width="30" height="30" rx="6"/><rect x="14" y="56" width="30" height="30" rx="6"/><rect x="56" y="56" width="30" height="30" rx="6"/></g><g fill="#0ea5e9"><rect x="20" y="20" width="18" height="18" rx="4"/><rect x="62" y="20" width="18" height="18" rx="4"/><rect x="20" y="62" width="18" height="18" rx="4"/><rect x="62" y="62" width="18" height="18" rx="4"/></g></svg>',
  },
];

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

const homeView = document.getElementById("home-view");
const browserView = document.getElementById("browser-view");
const frame = document.getElementById("uv-frame");
const homeAddress = document.getElementById("hero-address");
const navAddress = document.getElementById("nav-address");
const browserAddress = document.getElementById("browser-address-input");
const navEngine = document.getElementById("nav-engine");

let currentEngine = navEngine.value;
let lastUrl = "";

function renderLibrary() {
  const grid = document.getElementById("library-grid");
  grid.innerHTML = library
    .map(
      (g) => `
    <a class="app-card" href="${g.path}" target="_blank" rel="noopener">
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
  try {
    await registerSW();
  } catch (err) {
    alert("Failed to register service worker: " + err);
    return;
  }

  const url = search(rawInput, engineTemplate);

  let wispUrl =
    (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  if ((await connection.getTransport()) !== "/epoxy/index.mjs") {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }

  lastUrl = url;
  frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
  browserAddress.value = url;

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
  openBrowser(homeAddress.value, "https://www.google.com/search?q=%s");
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
  openBrowser("https://www.google.com", "https://www.google.com/search?q=%s");
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
