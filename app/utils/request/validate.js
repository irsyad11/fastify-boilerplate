const validateReq = (model, requestData) => {
  console.log("============ request data : ", requestData);
  console.log("============ model : ", model);

  try {
    const validateData = model.parse(requestData);
    console.log("============ validate data : ", validateData);
    return { status: true, message: validateData };
  } catch (error) {
    console.log("============ error : ", error);
    return { status: false, message: error };
  }
};

module.exports = { validateReq };
