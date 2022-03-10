const HttpError = require('../error/HttpError');
const Joi = require('joi');

function validateRequest(req, rules) {
  const schema = Joi.object().keys(rules);
  return validateSchema(req, schema);
}

function validateRequestWithCustomSchema(req, schema) {
  return validateSchema(req, schema);
}

function validateSchema(req, schema) {
  const { error, value } = schema.validate({
    ...req.body,
    ...req.params,
    ...req.query,
  });

  if (error) {
    if (error.details) {
      throw new HttpError(400, true, error.details[0].message, error);
    } else {
      throw new HttpError(error.status || 400, true, error.message, error);
    }
  }
  return value;
}

module.exports = {
  validateRequest,
  validateSchema,
  validateRequestWithCustomSchema,
};
