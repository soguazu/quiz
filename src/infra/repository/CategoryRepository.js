const BaseRepository = require('./BaseRepository');

class CategoryRepository extends BaseRepository {
  constructor({ models: { Category } }) {
    super({ Model: Category });
  }
}

module.exports = CategoryRepository;
