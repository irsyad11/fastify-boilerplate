const testMiddleware = async (request, reply, next) => {
  request.log.info("In test middleware");
  const headerTest = request.headers.test;
  if (headerTest != "test") {
    reply.code(401).send({ message: "Unauthorized" });
  }
};

module.exports = testMiddleware;
