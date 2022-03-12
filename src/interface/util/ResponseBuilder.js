const BasicResponse = {
  success: false,
  status_code: 500,
  message: '',
};

/**
 * Handles API responses
 */
class ResponseBuilder {
  static getResponseHandler(res) {
    return {
      onSuccess: (data, message, code, links) => {
        return ResponseBuilder.respondWithSuccess(
          res,
          code,
          data,
          message,
          links
        );
      },
      onError: (errorName, errorCode, errorMessage, data) => {
        return ResponseBuilder.respondWithError(
          res,
          errorName,
          errorCode,
          errorMessage,
          data
        );
      },
    };
  }

  static respondWithSuccess(
    res,
    code = ResponseBuilder.HTTP_STATUS.OK,
    data = {},
    message = 'success',
    links = []
  ) {
    const response = { ...BasicResponse };
    response.success = true;
    response.message = message;
    response.data = data;
    response.links = links;
    response.status_code = code;
    return res.status(code).json(response);
  }

  static respondWithError(
    res,
    errorName,
    errorCode = 500,
    message = 'Unknown error',
    data = {}
  ) {
    const response = { ...BasicResponse };
    response.success = false;
    response.name = errorName;
    response.message = message;
    response.status_code = errorCode;
    response.data = data;
    return res.status(errorCode).json(response);
  }
}

module.exports = ResponseBuilder;
