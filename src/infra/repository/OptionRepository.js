const BaseRepository = require('./BaseRepository');

class OptionRepository extends BaseRepository {
  constructor({ models: { Option } }) {
    const selectOptions = {
      single: '-__v',
    };

    super({ Model: Option, selectOptions });
  }
}

module.exports = OptionRepository;
