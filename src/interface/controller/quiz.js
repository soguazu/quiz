const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

class Quiz {
  constructor({ quiz, ResponseBuilder, validateRequest }) {
    this.quizService = quiz;
    this.ResponseBuilder = ResponseBuilder;
    this.validateRequest = validateRequest;
  }

  async create(req, res, next) {
    try {
      const inputData = this.validateRequest(req, {
        title: Joi.string().min(5).required(),
        description: Joi.string().min(5).optional(),
        category: Joi.string().required(),
      });

      inputData.user = req.userId;
      const data = await this.quizService.create(inputData);

      await this.ResponseBuilder.getResponseHandler(res).onSuccess(
        data,
        'Created successfully.',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await this.quizService.getAll(req.userId);
      await this.ResponseBuilder.getResponseHandler(res).onSuccess(
        data,
        '',
        200
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
      const filter = {
        _id: mongoose.Types.ObjectId(inputData.id),
      };

      const data = await this.quizService.getById(filter);
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

module.exports = Quiz;
