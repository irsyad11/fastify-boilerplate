const bcrypt = require("bcryptjs");

const hash = (plainText) => bcrypt.hashSync(plainText, 10);

const verify = (input, hashed) => bcrypt.compareSync(input, hashed);

module.exports = { hash, verify };
