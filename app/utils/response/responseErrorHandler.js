const { responseFormat } = require("./responseFormat");

const responseWithPagination = (
  arrData,
  totalData,
  offset,
  limit,
  customSuccessMsg,
  customErrMsg
) => {
  if (arrData.length === 0) {
    return responseFormat(
      false,
      "Failed to get data, data not found",
      {},
      "400"
    );
  }

  const currentPage = offset === 0 ? 1 : Math.ceil(offset / limit) + 1;
  const totalPage = Math.ceil(totalData / limit);

  if (totalPage >= currentPage) {
    const data = {
      data: arrData,
      pagination: {
        totalData,
        currentPage,
        totalPage,
        limit,
        offset,
      },
    };
    return responseFormat(
      true,
      customSuccessMsg || "Success get data",
      data,
      "200"
    );
  }
  return responseFormat(
    false,
    customErrMsg ||
      "Failed to get data, current page cannot be greater than total page",
    {},
    "400"
  );
};

module.exports = { responseWithPagination };
