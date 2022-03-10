const Joi = require('joi');
class AuthController {
  constructor({
    auth,
    ResponseBuilder,
    validateRequest,
    validateRequestWithCustomSchema,
    createLog,
    LogTypes,
    httpError,
  }) {
    this.authService = auth;
    this.ResponseBuilder = ResponseBuilder;
    this.validateRequest = validateRequest;
    this.validateRequestWithCustomSchema = validateRequestWithCustomSchema;
    this.createLog = createLog;
    this.LogTypes = LogTypes;
    this.HttpError = httpError;
  }

  async register(req, res, next) {
    try {
      const inputData = this.validateRequest(req, {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().min(5).optional(),
        source: Joi.string().min(5).optional(),
        referral: Joi.string().min(5).optional(),
      });

      const data = await this.authService.signup(inputData);

      await this.ResponseBuilder.getResponseHandler(res).onSuccess(
        data,
        'Registration successful.',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const inputData = this.validateRequestWithCustomSchema(
        req,
        Joi.object()
          .keys({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().min(8).required(),
          })
          .error(
            new this.HttpError(
              401,
              'You have entered a wrong email or password.'
            )
          )
      );

      const data = await this.authService.login(inputData);

      // Log action
      req.user = { _id: data.user._id };

      this.createLog(req, this.LogTypes.USER_LOGIN);

      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
