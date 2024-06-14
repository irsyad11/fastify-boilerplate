const testHandler = async (req, reply) => {
  try {
    req.log.info("In test handler");
    const chmsDb = req.chm;
    const request = req.body;
    if (request.isRequestAll) {
      // return reply.send({ message: "Query will run here to get all" });
      const [result] = await chmsDb.query("SELECT * FROM m_pekerja");
      reply.send(result);
    } else {
      reply.send({ message: "Query will run here to get just tomy" });
    }
  } catch (err) {
    req.log.error(err);
    reply.send({ message: "Error" });
  }
};

module.exports = testHandler;
