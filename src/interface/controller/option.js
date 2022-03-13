const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

class Question {
  constructor({ option, ResponseBuilder, validateRequest }) {
    this.optionService = option;
    this.ResponseBuilder = ResponseBuilder;
    this.validateRequest = validateRequest;
  }

  async create(req, res, next) {
    try {
      const inputData = this.validateRequest(req, {
        options: Joi.array().items(
          Joi.object().keys({
            answer: Joi.string(),
            correct: Joi.boolean(),
          })
        ),
        question: Joi.objectId().required(),
      });

      const data = await this.optionService.create(inputData);

      await this.ResponseBuilder.getResponseHandler(res).onSuccess(
        data,
        'Created successfully.',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const inputData = this.validateRequest(req, {
        id: Joi.objectId().required(),
      });

      const data = await this.optionService.getById(inputData);

      await this.ResponseBuilder.getResponseHandler(res).onSuccess(
        data[0],
        '',
        200
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Question;
