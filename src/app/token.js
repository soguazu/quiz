const Joi = require('joi');

class Token {
  constructor({ tokenRepository, httpError, encryption }) {
    this.TokenRepository = tokenRepository;
    this.HttpError = httpError;
    this.encryption = encryption;
  }

  async createToken(email, purpose, userId, userType) {
    // Delete old tokens with the same purpose
    const oldTokens = await this.filterToken(userId, purpose);
    if (oldTokens.length > 0) {
      await this.TokenRepository.deleteQuery({
        _id: { $in: oldTokens.map((x) => x._id) },
      });
    }

    const token = {
      token: await this.generateToken(email),
      purpose,
      user: userId,
      userType,
    };
    this.validateToken(token);

    return this.TokenRepository.persist(token);
  }

  async saveGeneratedToken(purpose, userId, userType, generatedToken) {
    // Delete old tokens with the same purpose
    const oldTokens = await this.filterToken(userId, purpose);

    if (oldTokens.length > 0) {
      await this.TokenRepository.deleteQuery({
        _id: { $in: oldTokens.map((x) => x._id) },
      });
    }

    const token = {
      token: generatedToken,
      purpose,
      user: userId,
      userType,
    };

    this.validateToken(token);
    return this.TokenRepository.persist(token);
  }

  async getToken(token) {
    return this.TokenRepository.getOneBy({ token });
  }

  async filterToken(user, purpose) {
    return this.TokenRepository.getBy({ user: user, purpose: purpose });
  }

  async deleteToken(id) {
    return this.TokenRepository.delete(id);
  }

  async generateToken(email) {
    return this.encryption.encrypt(email);
  }

  async validateToken(token) {
    const schema = Joi.object().keys({
      _id: Joi.alternatives([Joi.object().optional(), Joi.string().optional()]),
      purpose: Joi.string()
        .required()
        .valid('PASSWORD_RESET', 'EMAIL_VERIFICATION', 'LOGIN'),
      token: Joi.string().required(),
      user: Joi.alternatives([Joi.object(), Joi.string()]).required(),
      userType: Joi.string().required(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
    });
    const { error } = schema.validate(token);
    if (error) {
      throw new this.HttpError(400, error.details[0].message);
    }
  }
}

module.exports = Token;
