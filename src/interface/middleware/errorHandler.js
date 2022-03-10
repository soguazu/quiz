const fs = require('fs');
const { NextFunction, Request, Response } = require('express');

const { ResponseBuilder } = require('../util/ResponseBuilder');
const { logger } = require('../../infra/logger/');
const util = require('util');

/**
 * Error handling middleware
 */

const unlink = util.promisify(fs.unlink);

// eslint-disable-next-line no-unused-vars
module.exports = async (err, req, res, next) => {
  if (!err.isOperationalError) {
    logger.error('An error occurred: ', {
      error: err.message || err.toString(),
      stack: err.stack,
    });
  }

  const { file, files } = req;
  if (file) {
    const { path } = file;
    if (file.path) {
      if (fs.existsSync(path)) {
        await unlink(path);
      }
    }
  }

  if (err?.name || err?.error) {
    if (
      err?.name === 'HttpError' ||
      (err?.error && err?.error?.name === 'HttpError')
    ) {
      return ResponseBuilder.getResponseHandler(res).onError(
        err?.name || err?.error?.name,
        HttpStatus.BAD_REQUEST,
        err?.message || err?.error.toString(),
        err?.errors || err?.data || {}
      );
    }
    return ResponseBuilder.getResponseHandler(res).onError(
      err?.name,
      err?.status,
      err?.message || 'Something went wrong',
      err?.data
    );
  }

  const errorMessage =
    process.env.NODE_ENV === 'production'
      ? 'Something bad happened!'
      : err.message;
  const errorData = process.env.NODE_ENV === 'production' ? {} : err;
  return ResponseBuilder.getResponseHandler(res).onError(
    'InternalServerError',
    err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    errorMessage,
    errorData
  );
};
