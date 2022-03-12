class TakenAnswer {
  constructor({ userRepository, token, httpError }) {
    this.userRepository = userRepository;
    this.tokenService = token;
    this.HttpError = httpError;
  }
}

module.exports = TakenAnswer;
