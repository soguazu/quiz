const BaseRepository = require('./BaseRepository');

class QuestionRepository extends BaseRepository {
  constructor({ models: { Question } }) {
    super({ Model: Question });
  }
}

module.exports = QuestionRepository;
