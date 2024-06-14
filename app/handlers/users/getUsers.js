const { responseFormat } = require("../../utils/response/responseFormat");

const getUsers = async (req, reply) => {
  const selectQry = `SELECT * FROM users`;
  try {
    const chmDb = req.chm;

    const [rows] = await chmDb.query(selectQry);
    if (rows.length > 0) {
      const response = responseFormat(
        true,
        "Users fetched Successfully",
        rows,
        200
      );
      reply.code(200).send(response);
    } else {
      const response = responseFormat(false, "No users found", {}, 404);
      reply.code(404).send(response);
    }
  } catch (err) {
    req.log.error(err);
    const response = responseFormat(false, "Internal Server Error", {}, 500);
    reply.code(500).send(response);
  }
};

module.exports = getUsers;
