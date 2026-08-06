self.__site$config = {
  prefix: "/go/",
  encodeUrl: Arcadia.codec.xor.encode,
  decodeUrl: Arcadia.codec.xor.decode,
  handler: "/lib/handler.js",
  client: "/lib/client.js",
  bundle: "/lib/core.js",
  config: "/lib/settings.js",
  sw: "/lib/worker.js",
};
