const bcrypt = require("../../utils/bcrypt/bcrypt");
const { responseFormat } = require("../../utils/response/responseFormat");

const createUsers = async (req, reply) => {
  const insertQry = `INSERT INTO users (username, password, created_time) VALUES (?, ?, NOW())`;
  try {
    const chmDb = req.chm;
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await chmDb.query(insertQry, [username, hashedPassword]);
    if (rows.affectedRows > 0) {
      const response = responseFormat(
        true,
        "User created Successfully",
        { username },
        200
      );
      reply.code(200).send(response);
    } else {
      const response = responseFormat(
        false,
        "User not created : failed insert to DB ",
        { username },
        500
      );
      reply.code(500).send(response);
    }
  } catch (err) {
    req.log.error(err);
    const response = responseFormat(
      false,
      "User not created : Internal Server Err",
      {},
      500
    );
    reply.code(500).send(response);
  }
};

module.exports = createUsers;
