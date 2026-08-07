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
  ensureScramjetWorker();
  if (scramjet) {
    try {
      await scramjet.loadConfig();
    } catch (e) {
      scramjet = null;
    }
  }
  if (scramjet && scramjet.config && scramjet.route(event)) {
    return await scramjet.fetch(event);
  }
  if (engine.route(event)) {
    return await engine.fetch(event);
  }
  return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});
