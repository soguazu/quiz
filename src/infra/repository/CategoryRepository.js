const BaseRepository = require('./BaseRepository');

class CategoryRepository extends BaseRepository {
  constructor({ models: { Category } }) {
    super({ Model: Category });
  }

  getById(filter) {
    const join = [
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'quizzes',
          localField: '_id',
          foreignField: 'category',
          as: 'quiz',
        },
      },
    ];

    return this.Collection.aggregate(join);
  }
}

module.exports = CategoryRepository;
