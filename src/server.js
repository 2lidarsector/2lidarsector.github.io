import { join } from "node:path";
import { hostname } from "node:os";
import { createServer } from "node:http";
import { randomBytes, timingSafeEqual, createHmac } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import * as store from "./db.js";

// Report the real deployed build: git commit hash if present, else a fallback.
let APP_VERSION = process.env.ARX_VERSION || "";
if (!APP_VERSION) {
  try {
    if (existsSync(join(".git", "HEAD"))) {
      const ref = readFileSync(join(".git", "HEAD"), "utf8").trim().split(" ")[1];
      if (ref) {
        const head = readFileSync(join(".git", ref), "utf8").trim();
        if (/^[0-9a-f]{40}$/.test(head)) APP_VERSION = head.slice(0, 7);
      }
    }
  } catch (e) {}
}
if (!APP_VERSION) APP_VERSION = "unknown";

const publicPath = join(process.cwd(), "public");
const keysPath = join(process.cwd(), "keys.txt");

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const COOKIE_NAME = "arx_session";

// ---------- access keys (never shipped to the browser) ----------

// Local-only fallback list (used when there's no Wasmer DB configured).
let localKeys = null; // null = not loaded yet

function loadLocalKeys() {
  if (localKeys !== null) return localKeys;
  let keys = [];
  if (process.env.ARX_KEYS) {
    keys = process.env.ARX_KEYS.split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (!keys.length) {
    try {
      if (existsSync(keysPath)) {
        keys = readFileSync(keysPath, "utf8")
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    } catch (e) {}
  }
  if (!keys.length) {
    const generated = randomBytes(4).toString("hex");
    keys = [generated];
    try {
      writeFileSync(keysPath, generated + "\n");
      console.log(`[auth] Generated a local access key and saved it to ${keysPath}`);
    } catch (e) {
      console.log(`[auth] Generated access key (save this): ${generated}`);
    }
  }
  localKeys = keys;
  return localKeys;
}

async function validKey(input) {
  if (typeof input !== "string" || !input.length) return false;
  if (store.dbConfigured()) {
    try {
      return await store.keyExists(input);
    } catch (e) {
      console.error("[auth] DB lookup failed, falling back to local keys", e);
      return loadLocalKeys().some((k) => safeEqual(k, input));
    }
  }
  return loadLocalKeys().some((k) => safeEqual(k, input));
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

// ---------- per-key settings (enabled / max sessions / max devices) ----------

// Backed by the DB when configured (key_settings table), else a JSON file so
// the settings survive restarts even with in-memory keys.
const keySettingsPath = join(process.cwd(), "key-settings.json");

function loadKeySettingsFile() {
  try {
    if (existsSync(keySettingsPath)) {
      const raw = JSON.parse(readFileSync(keySettingsPath, "utf8"));
      return raw && typeof raw === "object" ? raw : {};
    }
  } catch (e) {}
  return {};
}

function saveKeySettingsFile(obj) {
  try {
    writeFileSync(keySettingsPath, JSON.stringify(obj, null, 2));
  } catch (e) {}
}

async function getKeySettings(key) {
  if (store.dbConfigured()) {
    try {
      return await store.getKeySettings(key);
    } catch (e) {
      console.error("[auth] DB settings lookup failed, using local", e);
    }
  }
  const all = loadKeySettingsFile();
  const s = all[key];
  return {
    enabled: s ? s.enabled !== false : true,
    maxSessions: (s && s.maxSessions) || 0,
    maxDevices: (s && s.maxDevices) || 0,
  };
}

async function setKeySettings(key, s) {
  const next = { enabled: s.enabled !== false, maxSessions: Math.max(0, s.maxSessions | 0), maxDevices: Math.max(0, s.maxDevices | 0) };
  if (store.dbConfigured()) {
    try {
      await store.setKeySettings(key, next);
      return;
    } catch (e) {
      console.error("[auth] DB settings write failed, using local", e);
    }
  }
  const all = loadKeySettingsFile();
  all[key] = next;
  saveKeySettingsFile(all);
}

async function allKeySettings() {
  if (store.dbConfigured()) {
    try {
      return await store.listKeySettings();
    } catch (e) {
      console.error("[auth] DB settings list failed, using local", e);
    }
  }
  const all = loadKeySettingsFile();
  const out = {};
  for (const [k, s] of Object.entries(all)) {
    out[k] = { enabled: s.enabled !== false, maxSessions: s.maxSessions || 0, maxDevices: s.maxDevices || 0 };
  }
  return out;
}

// ---------- sessions ----------

// Sessions are STATELESS: the cookie value is a signed token (payload.hmac).
// This is essential on Wasmer Edge, which serves each app from multiple
// instances with no shared memory — a request landing on a different instance
// must still be able to validate the session. Each instance also keeps an
// in-memory map purely for the admin dashboard's live tracking (best-effort).
const SESSION_SECRET =
  process.env.ARX_SESSION_SECRET || process.env.ARX_ADMIN_KEY || "dev-insecure-session-secret";

// token -> { exp, key, ip, device, ua, loginAt, lastSeen } (tracking only)
const sessions = new Map();
const recentLogins = []; // { key, ip, device, ua, at } newest first, capped

function sign(data) {
  return createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
}

function makeToken(payload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return body + "." + sign(body);
}

// Returns the payload { exp, key, ... } if the token is valid, else null.
// Pure crypto — no shared memory required — so any instance (or a restarted
// one) can authenticate a cookie issued by another instance.
function parseToken(token) {
  if (typeof token !== "string" || !token.length) return null;
  const i = token.lastIndexOf(".");
  if (i <= 0 || i === token.length - 1) return null;
  const body = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = sign(body);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload || typeof payload.exp !== "number" || payload.exp <= Date.now()) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

function cookieFor(token) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`;
}

function clearCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function readToken(req) {
  const raw = req.headers.cookie || "";
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    const name = part.slice(0, i).trim();
    if (name === COOKIE_NAME) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

// Adds a valid session to the local tracking map (best-effort, for admin).
function track(token, payload) {
  sessions.set(token, {
    exp: payload.exp,
    key: payload.key,
    ip: payload.ip,
    device: payload.device,
    ua: payload.ua,
    loginAt: payload.loginAt,
    lastSeen: Date.now(),
  });
}

function authed(req) {
  const token = readToken(req);
  if (!token) return false;
  const payload = parseToken(token);
  if (!payload) return false;
  const s = sessions.get(token);
  if (!s) track(token, payload);
  else s.lastSeen = Date.now();
  return true;
}

function recordLogin(key, ip, device, ua) {
  recentLogins.unshift({ key, ip, device, ua, at: Date.now() });
  if (recentLogins.length > 200) recentLogins.length = 200;
}

// Best-effort client IP from the proxy chain.
function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length) {
    return xff.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
}

// ---------- brute-force throttle ----------

const loginThrottle = new Map(); // ip -> { fails, lockedUntil }

function throttled(ip) {
  const t = loginThrottle.get(ip);
  if (!t) return false;
  if (t.lockedUntil && t.lockedUntil > Date.now()) return true;
  return false;
}

function recordFail(ip) {
  const t = loginThrottle.get(ip) || { fails: 0, lockedUntil: 0 };
  t.fails += 1;
  if (t.fails >= 6) {
    t.lockedUntil = Date.now() + 60 * 1000;
    t.fails = 0;
  }
  loginThrottle.set(ip, t);
}

// ---------- admin key (for managing access keys) ----------

const ADMIN_KEY = (process.env.ARX_ADMIN_KEY || "").trim();

function adminAuthed(req) {
  if (!ADMIN_KEY) return false;
  const provided = (req.headers["x-admin-key"] || "").trim();
  return provided.length > 0 && safeEqual(ADMIN_KEY, provided);
}

function requireAdmin(req, res, next) {
  if (!ADMIN_KEY) return res.status(404).json({ error: "admin api disabled" });
  if (!adminAuthed(req)) return res.status(403).json({ error: "invalid admin key" });
  next();
}

// ---------- app ----------

const app = express();
app.use(express.json());

// CDN safety: anything auth/session/API/HTML-related must never be cached
// (bunny.net, Cloudflare, etc. otherwise serve stale "not signed in" copies
// or cached redirects, breaking sign-in). Only real static assets may cache.
const NO_STORE = "no-store, no-cache, must-revalidate, max-age=0";
const PRIVATE = "private, no-store, no-cache, must-revalidate, max-age=0";
const STATIC_EXT = /\.(js|mjs|css|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|otf|eot|mp3|ogg|wasm|json|txt|fnt|data|mp4|webm)$/i;
app.use((req, res, next) => {
  const p = req.path;
  if (
    p.startsWith("/api/") ||
    p.startsWith("/remote/") ||
    p.startsWith("/stream/") ||
    p.startsWith("/net/") ||
    p.startsWith("/__status__")
  ) {
    res.setHeader("Cache-Control", NO_STORE);
    res.setHeader("Pragma", "no-cache");
  } else if (!STATIC_EXT.test(p) || req.headers.cookie) {
    // HTML pages, redirects, "/" and anything carrying a session cookie
    // must be revalidated every time so CDNs never serve stale auth state.
    res.setHeader("Cache-Control", PRIVATE);
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Vary", "Cookie");
  }
  next();
});

// Public: auth API + login page (self-contained, no external assets).
app.get("/login.html", (req, res) => {
  res.sendFile(join(publicPath, "login.html"));
});

app.get("/api/auth", (req, res) => {
  res.json({ ok: true, authed: authed(req), v: APP_VERSION });
});

// CDN-proof auth handoff. bunny.net pull zones ignore query strings when
// caching, so a `?auth=<token>` URL can still get served a stale cached copy
// of "/". Putting the token in the PATH (/auth/<token>) makes each handoff a
// unique URL that no CDN could have cached.
//
// CDN-proof auth handoff. We deliberately respond with a 200 HTML page (not a
// 302) because some CDNs (bunny.net) drop or mishandle Set-Cookie on redirect
// responses. A Set-Cookie on a normal 200 page is forwarded reliably; the tiny
// page then JS-redirects to the clean destination with the session cookie in
// place. Requests to the destination then carry the cookie, so a CDN configured
// with "bypass cache on cookie" (or no-store) serves the real app page.
app.get("/auth/:token", (req, res) => {
  const t = req.params.token || "";
  const payload = parseToken(t);
  if (!payload) {
    return res.redirect("/login.html");
  }
  track(t, payload);
  res.setHeader("Set-Cookie", cookieFor(t));
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Pragma", "no-cache");
  let next = typeof req.query.next === "string" ? req.query.next : "";
  if (!next.startsWith("/") || next.startsWith("//")) next = "/app.html";
  const target = JSON.stringify(next);
  res.send(
    "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Loading\u2026</title></head>" +
    "<body><script>location.replace(" + target + ");</script></body></html>"
  );
});

app.post("/api/login", async (req, res) => {
  const ip = clientIp(req);
  if (throttled(ip)) {
    res.status(429).json({ ok: false, error: "Too many attempts. Wait a minute." });
    return;
  }
  const key = req.body && typeof req.body.key === "string" ? req.body.key : "";
  if (await validKey(key)) {
    const device = typeof req.body.device === "string" ? req.body.device.slice(0, 64) : "";
    const ua = (req.headers["user-agent"] || "").slice(0, 200);

    const settings = await getKeySettings(key);
    if (!settings.enabled) {
      res.status(403).json({ ok: false, error: "This key is disabled." });
      return;
    }
    if (settings.maxSessions > 0 || settings.maxDevices > 0) {
      const now = Date.now();
      const active = [...sessions.values()].filter((s) => s.key === key && s.exp > now);
      if (settings.maxSessions > 0 && active.length >= settings.maxSessions) {
        res.status(403).json({
          ok: false,
          error: `Max ${settings.maxSessions} concurrent session(s) reached for this key.`,
        });
        return;
      }
      if (settings.maxDevices > 0 && device) {
        const devices = new Set(active.filter((s) => s.device).map((s) => s.device));
        if (!devices.has(device) && devices.size >= settings.maxDevices) {
          res.status(403).json({
            ok: false,
            error: `Max ${settings.maxDevices} device(s) allowed for this key.`,
          });
          return;
        }
      }
    }

    const payload = { exp: Date.now() + SESSION_TTL_MS, key, ip, device, ua, loginAt: Date.now() };
    const token = makeToken(payload);
    track(token, payload);
    recordLogin(key, ip, device, ua);
    res.setHeader("Set-Cookie", cookieFor(token));
    res.json({ ok: true, token });
  } else {
    recordFail(ip);
    res.status(401).json({ ok: false, error: "Invalid access key" });
  }
});

app.post("/api/logout", (req, res) => {
  const token = readToken(req);
  if (token) sessions.delete(token);
  res.setHeader("Set-Cookie", clearCookie());
  res.json({ ok: true });
});

// Admin API: list / add / remove access keys in the database.
app.get("/api/admin/keys", requireAdmin, async (req, res) => {
  try {
    if (store.dbConfigured()) {
      const rows = await store.listKeys();
      res.json({ ok: true, keys: rows });
    } else {
      loadLocalKeys();
      res.json({ ok: true, keys: localKeys.map((key_value, i) => ({ id: i + 1, key_value })) });
    }
  } catch (e) {
    console.error("[admin] list keys failed", e);
    res.status(500).json({ error: "database error" });
  }
});

app.post("/api/admin/keys", requireAdmin, async (req, res) => {
  const key = req.body && typeof req.body.key === "string" ? req.body.key.trim() : "";
  if (key.length < 4 || key.length > 255) {
    res.status(400).json({ error: "Key must be between 4 and 255 characters" });
    return;
  }
  try {
    if (store.dbConfigured()) {
      await store.addKey(key);
    } else {
      loadLocalKeys();
      if (localKeys.some((k) => safeEqual(k, key))) {
        return res.status(409).json({ error: "Key already exists" });
      }
      localKeys.push(key);
    }
    res.json({ ok: true });
  } catch (e) {
    if (e && e.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "Key already exists" });
      return;
    }
    console.error("[admin] add key failed", e);
    res.status(500).json({ error: "database error" });
  }
});

app.delete("/api/admin/keys/:id", requireAdmin, async (req, res) => {
  try {
    if (store.dbConfigured()) {
      await store.removeKey(req.params.id);
    } else {
      loadLocalKeys();
      const idx = Number(req.params.id) - 1;
      if (idx >= 0 && idx < localKeys.length) localKeys.splice(idx, 1);
    }
    res.json({ ok: true });
  } catch (e) {
    console.error("[admin] remove key failed", e);
    res.status(500).json({ error: "database error" });
  }
});

// Remove a key by its value (used by the admin dashboard).
app.post("/api/admin/keys/remove", requireAdmin, async (req, res) => {
  const key = req.body && typeof req.body.key === "string" ? req.body.key.trim() : "";
  if (!key) {
    res.status(400).json({ error: "Missing key" });
    return;
  }
  try {
    if (store.dbConfigured()) {
      await store.removeKeyByValue(key);
    } else {
      loadLocalKeys();
      localKeys = localKeys.filter((k) => !safeEqual(k, key));
      const all = loadKeySettingsFile();
      if (key in all) {
        delete all[key];
        saveKeySettingsFile(all);
      }
    }
    res.json({ ok: true });
  } catch (e) {
    console.error("[admin] remove key by value failed", e);
    res.status(500).json({ error: "database error" });
  }
});

// Admin overview: key usage + account-sharing flags.
function activeSessions() {
  const now = Date.now();
  const out = [];
  for (const [token, s] of sessions) {
    if (s.exp <= now) continue;
    out.push({ token, key: s.key, ip: s.ip, device: s.device, ua: s.ua, loginAt: s.loginAt, lastSeen: s.lastSeen });
  }
  return out;
}

async function allKnownKeys() {
  if (store.dbConfigured()) {
    const rows = await store.listKeys();
    return rows.map((r) => r.key_value);
  }
  loadLocalKeys();
  return [...localKeys];
}

// A key is "shared" when more than one distinct device is using it.
// IPs are tracked for reference but not trusted for sharing detection.
async function summarize() {
  const active = activeSessions();
  const known = await allKnownKeys();
  const settings = await allKeySettings();
  const byKey = new Map();
  for (const k of known) {
    byKey.set(k, { key: k, sessions: [], devices: new Set(), ips: new Set(), uas: new Set() });
  }
  for (const s of active) {
    if (!byKey.has(s.key)) byKey.set(s.key, { key: s.key, sessions: [], devices: new Set(), ips: new Set(), uas: new Set() });
    const e = byKey.get(s.key);
    e.sessions.push(s);
    if (s.device) e.devices.add(s.device);
    if (s.ua) e.uas.add(s.ua);
    e.ips.add(s.ip);
  }
  const keys = [];
  for (const e of byKey.values()) {
    const lastSeen = e.sessions.length ? Math.max(...e.sessions.map((s) => s.lastSeen)) : 0;
    const st = settings[e.key] || { enabled: true, maxSessions: 0, maxDevices: 0 };
    // Per-session detail: which device (fingerprint), IP, and browser used it.
    const sessions = e.sessions
      .slice()
      .sort((a, b) => b.lastSeen - a.lastSeen)
      .map((s) => ({ ip: s.ip, device: s.device, ua: s.ua, loginAt: s.loginAt, lastSeen: s.lastSeen }));
    keys.push({
      key: e.key,
      used: e.sessions.length > 0,
      sessionCount: e.sessions.length,
      deviceCount: e.devices.size,
      devices: [...e.devices],
      ipCount: e.ips.size,
      ips: [...e.ips],
      lastSeen,
      sharing: e.sessions.length > 0 && e.devices.size > 1,
      settings: st,
      sessions,
    });
  }
  return { active, keys };
}

app.get("/api/admin/overview", requireAdmin, async (req, res) => {
  try {
    const sum = await summarize();
    let dbOk = false;
    let dbError = "";
    if (store.dbConfigured()) {
      try {
        await store.countKeys();
        dbOk = true;
      } catch (e) {
        dbError = e.message;
      }
    }
    res.json({
      ok: true,
      v: APP_VERSION,
      db: { configured: store.dbConfigured(), connected: dbOk, host: process.env.DB_HOST || "", error: dbError },
      totalKeys: sum.keys.length,
      activeSessions: sum.active.length,
      uniqueIps: new Set(sum.active.map((s) => s.ip)).size,
      keys: sum.keys,
      flagged: sum.keys.filter((k) => k.sharing),
      recentLogins: recentLogins.slice(0, 100),
    });
  } catch (e) {
    console.error("[admin] overview failed", e);
    res.status(500).json({ error: "database error" });
  }
});

// Kick all sessions that used a given key (force re-login).
app.post("/api/admin/kick", requireAdmin, async (req, res) => {
  const key = req.body && typeof req.body.key === "string" ? req.body.key.trim() : "";
  let removed = 0;
  for (const [token, s] of sessions) {
    if (s.key === key) {
      sessions.delete(token);
      removed++;
    }
  }
  res.json({ ok: true, removed });
});

// Update per-key settings (enabled, max sessions, max devices).
app.post("/api/admin/keys/settings", requireAdmin, async (req, res) => {
  const key = req.body && typeof req.body.key === "string" ? req.body.key.trim() : "";
  if (!key) {
    res.status(400).json({ error: "Missing key" });
    return;
  }
  const body = req.body || {};
  await setKeySettings(key, {
    enabled: body.enabled === undefined ? true : !!body.enabled,
    maxSessions: Number(body.maxSessions) || 0,
    maxDevices: Number(body.maxDevices) || 0,
  });
  // Disabling a key also kicks its live sessions so it takes effect immediately.
  if (body.enabled === false) {
    for (const [token, s] of sessions) {
      if (s.key === key) sessions.delete(token);
    }
  }
  res.json({ ok: true });
});

// Gate everything else (static files, health check, everything) behind a session.
app.use((req, res, next) => {
  if (authed(req)) return next();
  // CDN fallback: some CDNs (bunny.net) drop Set-Cookie on POST, so the login
  // page can carry the session token in the URL instead. On this page load we
  // set the cookie normally and bounce to the clean URL.
  const t = req.query && req.query.auth;
  if (typeof t === "string" && t.length) {
    const payload = parseToken(t);
    if (payload) {
      res.setHeader("Set-Cookie", cookieFor(t));
      return res.redirect(req.path || "/app.html");
    }
  }
  if (req.accepts("html")) {
    const nextUrl = encodeURIComponent(req.originalUrl || "/app.html");
    return res.redirect("/login.html?next=" + nextUrl);
  }
  res.status(401).json({ error: "unauthorized" });
});

app.get("/__status__", (req, res) => {
  res.type("text/plain").send("ok");
});

// Load our publicPath first and prioritize it over other assets.
app.use(express.static(publicPath));
// Transport client is backend-only (served from node_modules, never on Pages).
app.use("/net/", express.static(epoxyPath));

// Error for everything else
app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

const bare = createBareServer("/remote/", {
  connectionLimiter: { maxConnectionsPerIP: 100000, windowDuration: 1 },
});
const server = createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  if (bare.shouldRoute(req)) {
    if (!authed(req)) {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("unauthorized");
      return;
    }
    bare.routeRequest(req, res);
    return;
  }
  app(req, res);
});
server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    if (!authed(req)) {
      socket.end();
      return;
    }
    bare.routeUpgrade(req, socket, head);
    return;
  }
  if (req.url.endsWith("/stream/")) {
    if (!authed(req)) {
      socket.end();
      return;
    }
    wisp.routeRequest(req, socket, head);
    return;
  }
  socket.end();
});

let port = parseInt(process.env.PORT || "");
if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(`[auth] database: ${store.dbConfigured() ? "MySQL (" + process.env.DB_HOST + ")" : "local keys"}`);
  if (ADMIN_KEY) console.log("[admin] key management API enabled");
  else console.log("[admin] key management API disabled (set ARX_ADMIN_KEY)");
});

// Init database table + seed local keys into it on startup.
(async () => {
  loadLocalKeys();
  if (store.dbConfigured()) {
    try {
      await store.ensureTable();
      if (localKeys.length) {
        await store.ensureKeys(localKeys);
        console.log(`[auth] ensured ${localKeys.length} key(s) from env are present in the database`);
      }
    } catch (e) {
      console.error("[auth] database init failed (keys will not come from the DB)", e);
    }
  }
})();

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("signal received: closing HTTP server");
  server.close();
  process.exit(0);
}

server.listen({ port });
