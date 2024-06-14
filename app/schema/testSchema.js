"use strict";

const bodyJsonSchema = {
  type: "object",
  required: ["isRequestAll"],
  properties: {
    isRequestAll: {
      type: "string",
      maxLength: 128,
      minLength: 16,
    },
  },
};

const testSchema = {
  body: bodyJsonSchema,
};

module.exports = { testSchema };
