const BaseRepository = require('./BaseRepository');

class QuestionRepository extends BaseRepository {
  constructor({ models: { Question } }) {
    const selectOptions = {
      single: '-__v',
    };
    const populateOptions = {
      single: [{ path: 'quiz', select: '-__v' }],
    };
    super({ Model: Question, selectOptions, populateOptions });
  }
}

module.exports = QuestionRepository;
