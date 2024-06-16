const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { v4: uuidv4 } = require("uuid");

let acceslog = new transports.DailyRotateFile({
  level: "info",
  filename: "./logs/appname-access-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
  maxSize: "500m",
  maxFiles: "30d",
  format: format.combine(format.timestamp(), format.logstash()),
});

let errorlog = new transports.DailyRotateFile({
  level: "error",
  filename: "./logs/appname-error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
  maxSize: "500m",
  maxFiles: "30d",
  format: format.combine(format.timestamp(), format.logstash()),
});

const consoleLog = new transports.Console({});

const transportLog =
  process.env.NODE_ENV == "production"
    ? [acceslog, errorlog]
    : [acceslog, errorlog, consoleLog];

const logger = createLogger({
  transports: transportLog,
});

module.exports = { logger, uuidv4 };
