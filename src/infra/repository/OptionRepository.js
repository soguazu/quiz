const BaseRepository = require('./BaseRepository');

class OptionRepository extends BaseRepository {
  constructor({ models: { Option } }) {
    super({ Model: Option });
  }
}

module.exports = OptionRepository;
