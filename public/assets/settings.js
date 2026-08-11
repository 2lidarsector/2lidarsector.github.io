self.__site$config = {
  prefix: "/go/",
  encodeUrl: Arcadia.codec.xor.encode,
  decodeUrl: Arcadia.codec.xor.decode,
  handler: "/assets/handler.js",
  client: "/assets/client.js",
  bundle: "/assets/core.js",
  config: "/assets/settings.js",
  sw: "/assets/worker.js",
};
