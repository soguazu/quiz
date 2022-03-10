const mongoose = require('mongoose');

class BaseRepository {
  /**
   * @constructor
   * @param {*} param0
   */
  constructor({ Model, selectOptions = {}, populateOptions = {}, httpError }) {
    this.HttpError = httpError;
    this.Collection = Model;
    this.modelName = this.Collection.modelName;
    this.singleSelectOptions = selectOptions.single
      ? selectOptions.single
      : '-__v';
    this.multiSelectOptions = selectOptions.multiple
      ? selectOptions.multiple
      : '-__v';
    this.singlePopulateOptions = populateOptions.single
      ? populateOptions.single
      : [];
    this.multiPopulateOptions = populateOptions.multiple
      ? populateOptions.multiple
      : [];
  }

  // eslint-disable-next-line class-methods-use-this
  isValidId(documentId) {
    return mongoose.Types.ObjectId.isValid(documentId);
  }

  async count(query = {}) {
    return this.Collection.countDocuments(query);
  }

  async totalCount() {
    return this.Collection.estimatedDocumentCount();
  }

  /* Full list of option - https://mongoosejs.com/docs/api.html#query_Query-setOptions */

  /**
   *
   * @param {*} query
   * @param {*} projection
   * @param {*} options
   * @param {*} multiple
   * @returns {Document}
   * @memberof BaseRepository
   */

  /**
   *
   * @param {*} id
   * @param {*} shouldPopulate
   * @returns {Document}
   * @memberof BaseRepository
   */

  async get(id, shouldPopulate = false) {
    try {
      const entity = await this.Collection.findOne({ _id: id }).select(
        this.singleSelectOptions
      );

      if (!entity) {
        throw new this.HttpError(404, true, `${this.modelName} not found`, {});
      }

      return shouldPopulate
        ? await entity.populate(this.singlePopulateOptions).execPopulate()
        : entity;
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new this.HttpError(404, true, `${this.modelName} not found`, {});
      }
      throw error;
    }
  }

  /**
   *
   * @param {*} filter
   * @param {*} skip
   * @param {*} limit
   * @param {*} sortField
   * @param {*} sortOrder
   * @returns {Document}
   * @memberof BaseRepository
   */

  async getBy(
    filter,
    customSelectionOption = '',
    skip = 0,
    limit = 20,
    sortField = '_id',
    sortOrder = 'desc'
  ) {
    try {
      const sortQuery = {};
      sortQuery[sortField] = sortOrder === 'desc' ? -1 : 1;

      return await this.Collection.find(filter)
        .select(customSelectionOption || this.multiSelectOptions)
        .populate(this.multiPopulateOptions)
        .sort(sortQuery)
        .skip(+skip)
        .limit(+limit);
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return [];
      }
      throw error;
    }
  }

  async getOneBy(filter, shouldPopulate = false) {
    try {
      const entity = await this.Collection.findOne(filter)
        .select(this.singleSelectOptions)
        .exec();

      if (!entity) {
        throw new this.HttpError(404, true, `${this.modelName} not found`, {});
      }

      return shouldPopulate
        ? await entity.populate(this.singlePopulateOptions).execPopulate()
        : entity;
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new this.HttpError(404, true, `${this.modelName} not found`, {});
      }
      throw error;
    }
  }

  /**
   *
   * @param {*} filter
   * @returns {Document}
   * @memberof BaseRepository
   */

  async getIds(filter) {
    try {
      return await this.Collection.find(filter).distinct('_id');
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return [];
      }
      throw error;
    }
  }

  /**
   * @param {*} filter
   * @returns {Document}
   * @memberof BaseRepository
   */

  async countBy(filter) {
    try {
      return await this.Collection.countDocuments(filter);
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return 0;
      }
      throw error;
    }
  }

  /**
   * @param {*} entity
   * @param {*} shouldPopulate
   * @returns {Document}
   * @memberof BaseRepository
   */

  async persist(entity, shouldPopulate = false) {
    try {
      if (entity._id) {
        const updatedEntity = await this.Collection.findByIdAndUpdate(
          entity._id,
          entity,
          { new: true }
        ).select(this.singleSelectOptions);

        return shouldPopulate
          ? await updatedEntity
              .populate(this.singlePopulateOptions)
              .execPopulate()
          : updatedEntity;
      } else {
        const createdEntity = await this.Collection.create(entity);

        return await this.get(createdEntity._id);
      }
    } catch (error) {
      if (error.name && error.name === 'ValidationError') {
        throw new this.HttpError(
          400,
          true,
          error.errors[Object.keys(error.errors)[0]].message,
          error
        );
      }
      throw error;
    }
  }

  /**
   * @param {*} entity
   * @returns {Document}
   * @memberof BaseRepository
   */

  async insertMany(entities) {
    try {
      return await this.Collection.insertMany(entities);
    } catch (error) {
      if (error.name && error.name === 'ValidationError') {
        throw new this.HttpError(
          400,
          true,
          error.errors[Object.keys(error.errors)[0]].message,
          error
        );
      }
      throw error;
    }
  }

  /**
   * @param {*} filter
   * @param {*} update
   * @returns {Document}
   * @memberof BaseRepository
   */
  async updateQuery(filter, update) {
    return this.Collection.updateMany(filter, update);
  }

  /**
   * @param {*} id
   * @returns {Document}
   * @memberof BaseRepository
   */

  async delete(id) {
    try {
      const entity = await this.Collection.findByIdAndDelete(id)
        .select(this.singleSelectOptions)
        .populate(this.singlePopulateOptions);

      if (!entity) {
        throw new this.HttpError(404, true, `${this.modelName} not found`, {});
      }
      return entity;
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new this.HttpError(404, true, `${this.modelName} not found`, {});
      }
      throw error;
    }
  }

  /**
   * @param {*} filter
   * @returns {Document}
   * @memberof BaseRepository
   */

  async deleteQuery(filter) {
    return this.Collection.deleteMany(filter);
  }
}

module.exports = BaseRepository;
