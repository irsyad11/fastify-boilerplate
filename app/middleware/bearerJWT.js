const { verifyJwt } = require("../utils/jwt/jwt");
const { responseFormat } = require("../utils/response/responseFormat");
const jwt = require("jsonwebtoken");

const bearerJWT = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      const response = responseFormat(false, "Invalid credentials", {}, 401);
      return res.code(401).send(response);
    }

    const parts = auth.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      const response = responseFormat(
        false,
        "Invalid credentials : wrong bearer format",
        {},
        401
      );
      return res.code(401).send(response);
    }

    const token = parts[1];
    const decodedToken = verifyJwt(token);

    if (!decodedToken.status) {
      const response = responseFormat(
        false,
        "Invalid credentials : token expired",
        {},
        401
      );
      return res.code(401).send(response);
    } else {
      req.user = decodedToken.data;
    }
  } catch (err) {
    const response = responseFormat(
      false,
      "Internal Server Error check",
      {},
      500
    );
    res.code(500).send(response);
  }
};

module.exports = bearerJWT;
