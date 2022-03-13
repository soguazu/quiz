const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

class Question {
  constructor({ taken, ResponseBuilder, validateRequest }) {
    this.takenService = taken;
    this.ResponseBuilder = ResponseBuilder;
    this.validateRequest = validateRequest;
  }

  async create(req, res, next) {
    try {
      const inputData = this.validateRequest(req, {
        taken: Joi.array().items(
          Joi.object().keys({
            answer: Joi.objectId().required(),
            question: Joi.objectId().required(),
          })
        ),
        quiz: Joi.objectId().required(),
      });

      inputData.user = req.userId;

      const data = await this.takenService.create(inputData);

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

      const data = await this.takenService.getById(inputData);

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
