const attachDB = (req, mysql, redis) => {
  try {
    req.chm = mysql.chm;
    // req.redis = redis;
  } catch (err) {
    console.log("gagal create DB connection handler: ", err);
    throw new Error("gagal create DB connection handler");
  }
};

module.exports = { attachDB };
