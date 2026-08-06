"use strict";
importScripts('/lib/core.js');
importScripts('/lib/settings.js');
importScripts(self.__site$config.sw || '/lib/worker.js');

const engine = new SiteWorker();

async function handleRequest(event) {
    if (engine.route(event)) {
        return await engine.fetch(event);
    }
    return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});
