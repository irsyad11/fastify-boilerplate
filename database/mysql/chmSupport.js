"use strict";
const mysql = require("@fastify/mysql");
const fastifyPlugin = require("fastify-plugin");

const chm = (fastify, options, done) => {
  try {
    fastify.register(mysql, {
      promise: true,
      name: process.env.DB_CONNNAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectionLimit: parseInt(process.env.DB_CONLIMIT),
      database: process.env.DB_NAME,
    });
    done();
  } catch (err) {
    console.error("Cannot connect to chm_support : ", err);
    done(err);
  }
};

module.exports = fastifyPlugin(chm);
