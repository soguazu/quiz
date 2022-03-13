const BaseRepository = require('./BaseRepository');

class QuizRepository extends BaseRepository {
  constructor({ models: { Quiz } }) {
    const selectOptions = {
      multiple: '-__v',
    };
    const populateOptions = {
      single: [{ path: 'category', select: '-__v' }],
    };
    super({ Model: Quiz, selectOptions, populateOptions });
  }

  async getById(filter) {
    const join = [
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'quiz',
          as: 'questions',
        },
      },
    ];
    return this.Collection.aggregate(join);
  }
}

module.exports = QuizRepository;
