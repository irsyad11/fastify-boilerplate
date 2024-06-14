const bcrypt = require("../utils/bcrypt/bcrypt");

const basicAuth = async (req, rep, next) => {
  const queryUsers = `SELECT password FROM users WHERE username = ?`;
  const prefix = "Basic ";
  const auth = req.headers.authorization;
  if (!auth || auth.indexOf(prefix) !== 0) {
    rep.code(401).send({ message: "Invalid credentials" });
    return;
  }
  const base64Credentials = auth.substring(prefix.length);
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const [rows] = await req.chm.query(queryUsers, [username]);
  if (rows.length === 0) {
    return rep.code(401).send({ message: "Invalid credentials" });
  }
  const hashedPassword = rows[0].password;
  const isValid = await bcrypt.verify(password, hashedPassword);
  if (!isValid) {
    return rep.code(401).send({ message: "Invalid credentials" });
  }
};

module.exports = basicAuth;
