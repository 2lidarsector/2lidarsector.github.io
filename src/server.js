import { join } from "node:path";
import { hostname } from "node:os";
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

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

// ---------- app ----------

const app = express();

// Load our publicPath first and prioritize it over other assets.
app.use(express.static(publicPath));
// Transport client is backend-only (served from node_modules, never on Pages).
app.use("/lesson/", express.static(epoxyPath));

app.get("/__status__", (req, res) => {
  res.type("text/plain").send("ok");
});

// Error for everything else
app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

const bare = createBareServer("/study/", {
  connectionLimiter: { maxConnectionsPerIP: 100000, windowDuration: 1 },
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
    return;
  }
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
    return;
  }
  if (req.url.endsWith("/practice/")) {
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
  console.log(`[build] version: ${APP_VERSION}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("signal received: closing HTTP server");
  server.close();
  process.exit(0);
}

server.listen({ port });
