const bcrypt = require("../../utils/bcrypt/bcrypt");
const { generateJwt } = require("../../utils/jwt/jwt");
const { responseFormat } = require("../../utils/response/responseFormat");

const getAccess = async (req, reply) => {
  try {
    const connDb = req.chm;
    const { username, password } = req.body;

    const [result] = await connDb.query(
      "SELECT id, username, password from users where username = ?",
      [username]
    );
    if (result.length === 0) {
      const response = responseFormat(
        false,
        "User not found",
        { username },
        400
      );
      return reply.code(400).send;
    }

    const pass = result[0].password;

    const isMatch = await bcrypt.verify(password, pass);
    if (!isMatch) {
      const response = responseFormat(
        false,
        "Password incorrect",
        { username },
        400
      );
      return reply.code(400).send(response);
    }

    const userData = {
      id: result[0].id,
      username: result[0].username,
    };

    const token = await generateJwt(userData);
    const response = responseFormat(true, "User logged in", { token }, 200);

    return reply.code(200).send(response);
  } catch (err) {
    req.log.error(err);
    reply.send({ message: "Error" });
  }
};

module.exports = getAccess;
