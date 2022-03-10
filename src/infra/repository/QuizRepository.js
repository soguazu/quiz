const BaseRepository = require('./BaseRepository');

class QuizRepository extends BaseRepository {
  constructor({ models: { Quiz } }) {
    super({ Model: Quiz });
  }
}

module.exports = QuizRepository;
