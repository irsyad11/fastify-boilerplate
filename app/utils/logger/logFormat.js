const logtype = {
  LOG_REQUEST: "REQUEST",
  LOG_RESPONSE: "RESPONSE",
  LOG_ERROR: "ERROR",
};

const logLevel = {
  LEVEL_INFO: "info",
  LEVEL_ERROR: "error",
};

const insertLog = (request, level, type, data) => {
  try {
    const logData = {
      trackingId: request.winston_log_id,
      type,
      data,
    };
    request.winston(level, logData);
  } catch (err) {
    throw new Error("Gagal menulis log");
  }
};

module.exports = { logtype, logLevel, insertLog };
