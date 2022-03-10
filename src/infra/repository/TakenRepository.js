const BaseRepository = require('./BaseRepository');

class TakenRepository extends BaseRepository {
  constructor({ models: { Taken } }) {
    super({ Model: Taken });
  }
}

module.exports = TakenRepository;
