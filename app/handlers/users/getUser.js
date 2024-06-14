const { responseFormat } = require("../../utils/response/responseFormat");

const getUser = async (req, reply) => {
  const getQry = "SELECT id, username, created_time FROM users WHERE id = ?";

  try {
    const conn = req.chm;
    const { id } = req.body;

    const [rows] = await conn.query(getQry, id);
    if (rows.length > 0) {
      const response = responseFormat(
        true,
        "Get Spesific Users Success",
        rows,
        200
      );

      reply.code(200).send(response);
    } else {
      const response = responseFormat(false, "No Users Found", {}, 400);

      reply.code(404).send(response);
    }
  } catch (err) {
    req.log.error(err);
    const response = responseFormat(false, "Internal Server Error", {}, 500);

    reply.code(500).send(response);
  }
};

module.exports = getUser;
