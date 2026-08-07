"use strict";
importScripts('/lib/core.js');
importScripts('/lib/settings.js');
importScripts(self.__site$config.sw || '/lib/worker.js');
importScripts('/scram/scramjet.all.js');

const engine = new SiteWorker();

let scramjet = null;

function ensureScramjetWorker() {
  if (scramjet) return;
  try {
    const { ScramjetServiceWorker } = $scramjetLoadWorker();
    scramjet = new ScramjetServiceWorker();
  } catch (e) {
    scramjet = null;
  }
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.resolve(self.clients.claim()).catch(() => {})
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.scramjet$type) {
    ensureScramjetWorker();
  }
});

async function handleRequest(event) {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/scramjet/')) {
    if (!scramjet) ensureScramjetWorker();
    if (scramjet) {
      try {
        await scramjet.loadConfig();
      } catch (e) {
        scramjet = null;
      }
    }
    if (scramjet && scramjet.config && scramjet.route(event)) {
      try {
        return await scramjet.fetch(event);
      } catch (e) {
        return new Response('Scramjet proxy failed to reach the requested site.', {
          status: 502,
          headers: { 'content-type': 'text/plain' },
        });
      }
    }
    return new Response('Scramjet proxy is not ready yet. Reload the page and try again.', {
      status: 503,
      headers: { 'content-type': 'text/plain' },
    });
  }
  if (engine.route(event)) {
    return await engine.fetch(event);
  }
  return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});
