const fastify = require("fastify");
const cors = require("@fastify/cors");
const { routesConfig } = require("./routes/routes");

// import DB
const chm = require("../database/mysql/chmSupport");
// const redis = require("../database/redis/redis");
const { attachDB } = require("../database/conHandler");

const buildApp = (opt = {}) => {
  const app = fastify(opt);

  // Register DB
  app.register(chm, { prefix: "chm" });

  // Register cors
  app.register(cors, {
    origin: ["*.dev.bri.co.id", "172.18.*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.addHook("onRequest", (req, reply, done) => {
    try {
      const mysqlCon = app.mysql;
      const redisCon = [];
      attachDB(req, mysqlCon, redisCon);
    } catch (err) {
      console.log("gagal create DB connection handler: ", err);
      throw new Error("gagal create DB connection handler");
    }
    done();
  });

  // register routes
  routesConfig.forEach((route) => {
    app.route(route);
  });

  return app;
};

module.exports = { buildApp };
