"use strict";
const mysql = require("@fastify/mysql");
const fastifyPlugin = require("fastify-plugin");

const chm = async (fastify, options, done) => {
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
      // name: "chm",
      // host: "localhost",
      // port: 3306,
      // user: "root",
      // password: "Borsalino09@",
      // connectionLimit: 50,
      // database: "chm",
    });
    // done();
  } catch (err) {
    console.error("Cannot connect to chm_support : ", err);
    done();
  }
};

module.exports = fastifyPlugin(chm);
