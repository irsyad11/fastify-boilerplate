"use strict";

const bodyJsonSchema = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: {
      type: "string",
      maxLength: 128,
    },
    password: {
      type: "string",
      maxLength: 128,
    },
  },
};

const addUsers = {
  body: bodyJsonSchema,
};

module.exports = { addUsers };
