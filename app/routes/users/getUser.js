const getUser = require("../../handlers/users/getUser");
const bearerJWT = require("../../middleware/bearerJWT");
const { getUser: getUserSchema } = require("../../schema/user/getUser");

const getUserRoute = {
  method: "POST",
  url: "/users/getById",
  preHandler: bearerJWT,
  schema: getUserSchema,
  handler: getUser,
};

module.exports = { getUserRoute };
