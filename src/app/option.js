class Option {
  constructor({ optionRepository, httpError }) {
    this.optionRepository = optionRepository;
    this.HttpError = httpError;
  }

  async create(inputData) {
    const { question } = inputData;
    const options = inputData.options.map(({ correct, answer }) => ({
      question,
      correct,
      answer,
    }));
    return await this.optionRepository.insertMany(options);
  }
  async getById(inputData) {
    return await this.optionRepository.getBy({ _id: inputData.id });
  }
}

module.exports = Option;
