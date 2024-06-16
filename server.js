const { dev, local } = { dev: ".env.dev", local: ".env.local" };
const ENV = local;
const { options } = require("./configs/server")
require("dotenv").config({ path: `./configs/${ENV}` });
// const { options } = require("./configs/app");

const { buildApp } = require("./app/app");

const app = buildApp(options(ENV));

try {
  app.listen({
    port: process.env.SERVER_PORT,
  });
  app.log.info(`start on ${process.env.NODE_ENV} mode`);
  app.log.info(`Server listening on port ${process.env.SERVER_PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
