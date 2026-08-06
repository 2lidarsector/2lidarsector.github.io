self.__uv$config = {
  prefix: "/go/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/lib/handler.js",
  client: "/lib/client.js",
  bundle: "/lib/core.js",
  config: "/lib/settings.js",
  sw: "/lib/worker.js",
};
