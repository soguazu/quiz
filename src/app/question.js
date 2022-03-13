class Question {
  constructor({ questionRepository, httpError }) {
    this.questionRepository = questionRepository;
    this.HttpError = httpError;
  }

  async create(inputData) {
    const { quiz } = inputData;
    const questions = inputData.questions.map(({ question, level }) => ({
      question,
      level,
      quiz,
    }));
    return await this.questionRepository.insertMany(questions);
  }

  async getById(inputData) {
    return await this.questionRepository.getBy({ _id: inputData.id });
  }
}

module.exports = Question;
