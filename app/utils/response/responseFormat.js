const responseFormat = (status, message, objData, errCode = "") => {
  return {
    status,
    code: errCode,
    message,
    data: objData,
  };
};

module.exports = { responseFormat };
