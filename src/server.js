import { join } from "node:path";
import { hostname } from "node:os";
import { createServer } from "node:http";
import express from "express";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const publicPath = join(process.cwd(), "public");

const app = express();

// Anti-scraper decoy: serve a school "learning portal" page to requests that do
// not look like a real browser. The decoy auto-redirects to the real site after
// 5 seconds via <meta refresh>; a one-time cookie lets following requests through.
const botPattern =
  /bot|crawler|spider|scraper|scrape|curl|wget|python|httpclient|http-client|requests|scrapy|headless|phantom|selenium|puppeteer|playwright|axios|node-fetch|postman|go-http|okhttp|java\/|ruby|perl|php(?!-)script|lynx|w3m|python-requests/i;

function looksLikeBot(req) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  if (!ua) return true;
  if (!ua.includes("mozilla/")) return true;
  return botPattern.test(ua);
}

app.use((req, res, next) => {
  if (req.method === "GET" || req.method === "HEAD") {
    if (req.path === "/" || req.path === "/index.html") {
      if (looksLikeBot(req)) {
        const passed = (req.headers.cookie || "").includes("arxx_visitor=1");
        if (!passed) {
          res.setHeader("Set-Cookie", "arxx_visitor=1; Path=/; Max-Age=600");
          return res.sendFile(join(publicPath, "decoy.html"));
        }
      }
    }
  }
  next();
});

// Load our publicPath first and prioritize it over UV.
app.use(express.static(publicPath));
// Load vendor files last.
// The vendor's uv.config.js won't conflict with our uv.config.js inside the publicPath directory.
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

// Error for everything else
app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  app(req, res);
});
server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) {
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
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("signal received: closing HTTP server");
  server.close();
  process.exit(0);
}

server.listen({ port });
