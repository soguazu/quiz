class Quiz {
  constructor({ quizRepository, httpError, optionRepository }) {
    this.quizRepository = quizRepository;
    this.optionRepository = optionRepository;
    this.HttpError = httpError;
  }

  async create(inputData) {
    return await this.quizRepository.persist(inputData);
  }

  async getAll(user) {
    return await this.quizRepository.getBy({ user });
  }

  async getById(inputData) {
    const quizzes = await this.quizRepository.getById(inputData);

    for (let i = 0; i < quizzes[0].questions.length; i++) {
      const question = quizzes[0].questions[i];
      quizzes[0].questions[i]['options'] = await this.optionRepository.getBy({
        question: question._id,
      });
    }

    return quizzes;
  }
}

module.exports = Quiz;
