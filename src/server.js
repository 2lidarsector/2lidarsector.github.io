import { join } from "node:path";
import { hostname } from "node:os";
import { createServer } from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import * as store from "./db.js";

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

// ---------- sessions ----------

const sessions = new Map(); // token -> expiresAt

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

function authed(req) {
  const token = readToken(req);
  if (!token) return false;
  const exp = sessions.get(token);
  if (!exp) return false;
  if (Date.now() > exp) {
    sessions.delete(token);
    return false;
  }
  return true;
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

const ADMIN_KEY = process.env.ARX_ADMIN_KEY || "";

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

// Public: auth API + login page (self-contained, no external assets).
app.get("/login.html", (req, res) => {
  res.sendFile(join(publicPath, "login.html"));
});

app.get("/api/auth", (req, res) => {
  res.json({ ok: true, authed: authed(req) });
});

app.post("/api/login", async (req, res) => {
  const ip = req.ip || "unknown";
  if (throttled(ip)) {
    res.status(429).json({ ok: false, error: "Too many attempts. Wait a minute." });
    return;
  }
  const key = req.body && typeof req.body.key === "string" ? req.body.key : "";
  if (await validKey(key)) {
    const token = randomBytes(32).toString("hex");
    sessions.set(token, Date.now() + SESSION_TTL_MS);
    res.setHeader("Set-Cookie", cookieFor(token));
    res.json({ ok: true });
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

// Gate everything else (static files, health check, everything) behind a session.
app.use((req, res, next) => {
  if (authed(req)) return next();
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
      if (localKeys.length && (await store.countKeys()) === 0) {
        for (const k of localKeys) {
          try {
            await store.addKey(k);
          } catch (e) {}
        }
        console.log(`[auth] seeded ${localKeys.length} local key(s) into the database`);
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
