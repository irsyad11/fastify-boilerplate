const createUsers = require("../../handlers/users/createUsers");
const { addUsers } = require("./addUsers");

const addUsersRoute = {
  method: "POST",
  url: "/users/add",
  schema: addUsers,
  handler: createUsers,
};

module.exports = { addUsersRoute };
