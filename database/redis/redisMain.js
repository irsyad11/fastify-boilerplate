'use strict'

const redis = require("@fastify/redis")
const fastifyPlugin = require("fastify-plugin")

const redisConnector = (fastify, option, done) => {
    fastify.register(redis, {
        namespace: "redisMain",
        host: "127.0.0.1",
        port: 6379,
        password: "P@ssw0rd",
        family: 4
    })
    done()
}

module.exports = fastifyPlugin(redisConnector)  