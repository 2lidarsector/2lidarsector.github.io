// Frontend configuration.
// Edit bareServers/wispUrl to point at your hosted backend when running on a
// static host (GitHub Pages, Netlify, Cloudflare Pages, ...) that cannot run
// the Node server. Example backend URL: https://your-app.onrender.com
window.__ARXX_CONFIG__ = {
  // Bare server endpoints (used with the bare-as-module3 transport).
  // Leave empty to fall back to the same-origin /bare/ endpoint.
  bareServers: [],
  // Wisp endpoint for the encrypted epoxy transport (same-origin /wisp/ by default).
  wispUrl: null,
};
