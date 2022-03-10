const BaseRepository = require('./BaseRepository');
const bcrypt = require('bcryptjs');

class UserRepository extends BaseRepository {
  constructor({ models: { User }, httpError }) {
    const selectOptions = {
      single: '-__v -referrals -newUser',
      multiple: '-__v -referrals -newUser',
    };
    super({ Model: User, selectOptions });
    this.HttpError = httpError;
  }
  async persist(user) {
    if (user.clearPassword) {
      user.password = bcrypt.hashSync(user.clearPassword);
      delete user.clearPassword;
    }

    return super.persist(user);
  }

  async getOneBy(filter, includePassword = false) {
    const omitPassword = includePassword ? '+password' : '';
    const user = await super.getBy(filter, `-__v ${omitPassword}`);

    if (!user) {
      throw new this.HttpError(404, true, 'User not found', {});
    }

    return user;
  }
}

module.exports = UserRepository;
