const getAccess = require("../../handlers/auth/getAccess");
const { getAccess: schema } = require("../../schema/auth/getAccess");

const getAccessRoute = {
  method: "POST",
  url: "/auth/getAccess",
  schema,
  handler: getAccess,
};

module.exports = { getAccessRoute };
