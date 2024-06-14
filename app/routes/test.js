// const testMiddleware = require("../middleware/test");
const basicAuth = require("../middleware/basicAuth");
const testHandler = require("../handlers/test");
const { testSchema } = require("../schema/testSchema");

const testRoute = {
  method: "POST",
  url: "/",
  preHandler: basicAuth,
  schema: testSchema,
  handler: testHandler,
};

module.exports = { testRoute };
