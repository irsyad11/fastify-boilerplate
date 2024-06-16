const { responseFormat } = require("./responseFormat");

const errValidation = (err, request, reply) => {
  if (err.validation.length) {
    const errorRes = responseFormat(
      false,
      "Validation Error",
      err.validation,
      "400" // error code . u can set ur error code here
    );

    reply.status(200).send(errorRes);
  } else {
    reply.status(error.code).send(errorRes);
  }
};

module.exports = { errValidation };
