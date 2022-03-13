class Category {
  constructor({ categoryRepository, httpError }) {
    this.categoryRepository = categoryRepository;
    this.HttpError = httpError;
  }

  async create(inputData) {
    return await this.categoryRepository.persist(inputData);
  }

  async getAll(user) {
    return await this.categoryRepository.getBy({ user });
  }

  async getById(inputData) {
    return await this.categoryRepository.getById(inputData);
  }
}

module.exports = Category;
