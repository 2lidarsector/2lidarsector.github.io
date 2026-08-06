/*global UVServiceWorker,__uv$config*/
"use strict";
importScripts('/lib/core.js');
importScripts('/lib/settings.js');
importScripts(__uv$config.sw || '/lib/worker.js');

const uv = new UVServiceWorker();

async function handleRequest(event) {
    if (uv.route(event)) {
        return await uv.fetch(event);
    }
    return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});
