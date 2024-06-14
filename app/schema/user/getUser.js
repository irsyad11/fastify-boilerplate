"user strict";

const bodyJsonSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "integer",
    },
  },
};

const getUser = {
  body: bodyJsonSchema,
};

module.exports = { getUser };
