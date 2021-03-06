const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

class Category {
  constructor({ category, ResponseBuilder, validateRequest }) {
    this.categoryService = category;
    this.ResponseBuilder = ResponseBuilder;
    this.validateRequest = validateRequest;
  }

  async create(req, res, next) {
    try {
      const inputData = this.validateRequest(req, {
        name: Joi.string().min(4).required(),
      });

      inputData.user = req.userId;
      const data = await this.categoryService.create(inputData);

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
      const data = await this.categoryService.getAll(req.userId);
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

      const data = await this.categoryService.getById(filter);

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

module.exports = Category;
