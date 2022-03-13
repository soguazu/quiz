class Taken {
  constructor({
    takenRepository,
    takenAnswerRepository,
    optionRepository,
    httpError,
  }) {
    this.takenRepository = takenRepository;
    this.takenAnswerRepository = takenAnswerRepository;
    this.optionRepository = optionRepository;
    this.HttpError = httpError;
  }

  async create(inputData) {
    const { quiz, user } = inputData;
    let score = 0;

    for (let i = 0; i < inputData.taken.length; i++) {
      let { answer } = inputData.taken[i];

      const option = await this.optionRepository.getBy({ _id: answer });

      if (option[0].correct) score++;
    }

    const takenPayload = {
      score,
      quiz,
      user,
    };

    const taken = await this.takenRepository.persist(takenPayload);

    const takenAnswer = inputData.taken.map(({ question, answer }) => ({
      question,
      answer,
      taken: taken._id,
    }));

    return await this.takenAnswerRepository.insertMany(takenAnswer);
  }

  async getById(inputData) {
    return await this.takenAnswerRepository.getBy({ taken: inputData.id });
  }
}

module.exports = Taken;
