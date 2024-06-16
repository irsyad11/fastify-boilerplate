const fastify = require("fastify");
const cors = require("@fastify/cors");
const { routesConfig } = require("./routes/routes");
const { logger, uuidv4 } = require("./utils/logger/winston");

const chm = require("../database/mysql/chmSupport"); // import DB
// const redis = require("../database/redis/redis");
const { attachDB } = require("../database/conHandler");

const { errValidation } = require("./utils/response/errorResponse"); // error res format
const { insertLog, logLevel, logtype } = require("./utils/logger/logFormat");

const buildApp = (opt = {}) => {
  const app = fastify(opt);
  const { LEVEL_ERROR, LEVEL_INFO } = logLevel;
  const { LOG_REQUEST, LOG_RESPONSE } = logtype;

  // Register DB
  app.register(chm, { prefix: "chm" });

  // Register cors
  app.register(cors, {
    origin: ["*.dev.bri.co.id", "172.18.*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.addHook("onRequest", (req, reply, done) => {
    req.winston = logger;
    req.winston_log_id = uuidv4();

    try {
      const mysqlCon = app.mysql;
      const redisCon = [];
      attachDB(req, mysqlCon, redisCon);
    } catch (err) {
      insertLog(req, LEVEL_ERROR, LOG_ERROR, err);
    }
    done();
  });

  // set error validation format
  app.setErrorHandler(errValidation);

  // Set logger on each request with body
  app.addHook("preHandler", (req, reply, done) => {
    if (req.body.length) {
      let logPrehandler = {
        method: req.method,
        url: req.url,
        body: req.body,
      };
      insertLog(req, LEVEL_INFO, LOG_REQUEST, logPrehandler);
    }
    done();
  });

  // Set logger on each response
  app.addHook("onResponse", (req, reply, done) => {
    let logOnSend = {
      resTime: reply.elapsedTime,
      resCode: reply.statusCode,
    };
    insertLog(req, LEVEL_INFO, LOG_RESPONSE, logOnSend);
    console.log(logOnSend);
    done();
  });
  // register routes
  routesConfig.forEach((route) => {
    app.route(route);
  });

  return app;
};

module.exports = { buildApp };
