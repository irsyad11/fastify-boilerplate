const logger = {
  local: {
    transport: {
      target: "pino-pretty",
      Options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  development: true,
  productioin: true,
  test: false,
};

module.exports = { logger };
