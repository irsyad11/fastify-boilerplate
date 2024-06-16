const jwt = require("jsonwebtoken");

const isTokenExpired = (decodedToken) => {
  const exp = decodedToken.exp;
  if (exp !== "undefined") {
    const now = Math.floor(Date.now() / 1000);
    return now > exp;
  }
  return true;
};

const checkFormat = (token) => {
  if (typeof token === "undefined") {
    return false;
  }
  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [header, payload] = parts;

  if (!header || !payload) {
    return false;
  }

  try {
    JSON.parse(atob(header));
    JSON.parse(atob(payload));
  } catch (err) {
    return false;
  }

  return true;
};
// process.env.TOKEN_EXPTIME
const generateJwt = (data, exp = 3600) => {
  try {
    // Define the Payload (claims)
    const payload = {
      id: data.id, // User ID
      username: data.username, // Username
      // role: data.role, // User Role
      // appName: process.env.APP_NAME, // App Name
      iat: Date.now(), // Issued At
    };

    // Secret Key
    // const secretKey = process.env.SECRET_KEY; // for HS256
    const secretKey = process.env.PRIVATE_KEY; // for RS256

    // Generate JWT
    const token = jwt.sign(payload, secretKey, {
      algorithm: "RS256",
      expiresIn: 3600,
    });
    return { token, exp };
  } catch (err) {
    throw new Error("Failed to generate JWT Token");
  }
};

const verifyJwt = (token) => {
  try {
    // const secretKey = process.env.SECRET_KEY; // for HS256
    const secretKey = process.env.PUBLIC_KEY; // for RS256

    if (checkFormat(token)) {
      const decoded = jwt.verify(token, secretKey, { algorithms: ["RS256"] });

      if (isTokenExpired(decoded)) {
        return {
          status: false,
          decoded: {},
        };
      }
      return {
        status: true,
        decoded,
      };
    }
    return {
      status: false,
      decoded: {},
    };
  } catch (err) {
    return {
      status: false,
      decoded: {},
    };
  }
};

module.exports = { generateJwt, verifyJwt, isTokenExpired, checkFormat };
