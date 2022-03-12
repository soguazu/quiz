class HttpError extends Error {
  constructor(status, isOperational, message, data) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
    this.isOperational = isOperational;
  }

  getErrorResponse(res) {
    let respObj = {
      success: false,
      error: this.message,
    };
    if (this.data) {
      respObj['data'] = this.data;
    }
    return res.status(this.status).json(respObj);
  }
}

module.exports = HttpError;
