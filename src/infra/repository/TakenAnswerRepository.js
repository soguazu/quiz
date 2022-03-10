const BaseRepository = require('./BaseRepository');

class TakenAnswerRepository extends BaseRepository {
  constructor({ models: { TakenAnswer } }) {
    super({ Model: TakenAnswer });
  }
}

module.exports = TakenAnswerRepository;
