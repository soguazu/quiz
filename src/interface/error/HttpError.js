class HttpError extends Error {
  constructor(status, isOperational, message, data) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
    this.isOperational = isOperational;
  }
}

module.exports = HttpError;
