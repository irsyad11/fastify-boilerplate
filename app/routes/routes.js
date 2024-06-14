const { testRoute } = require("./test");
const { addUsersRoute } = require("./users/addUsers");
const { getAccessRoute } = require("./auth/getAccess");
const { getUserRoute } = require("./users/getUser");

const routesConfig = [testRoute, addUsersRoute, getAccessRoute, getUserRoute];

module.exports = { routesConfig };
