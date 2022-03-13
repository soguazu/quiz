const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

class Question {
  constructor({ question, ResponseBuilder, validateRequest }) {
    this.questionService = question;
    this.ResponseBuilder = ResponseBuilder;
    this.validateRequest = validateRequest;
  }

  async create(req, res, next) {
    try {
      const inputData = this.validateRequest(req, {
        questions: Joi.array().items(
          Joi.object().keys({
            question: Joi.string(),
            level: Joi.string().valid('easy', 'medium', 'hard').optional(),
          })
        ),
        quiz: Joi.objectId().required(),
      });

      const data = await this.questionService.create(inputData);

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

      const data = await this.questionService.getById(inputData);

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
