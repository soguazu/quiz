const BaseRepository = require('./BaseRepository');
const bcrypt = require('bcryptjs');

const HttpError = require('../../interfaces/http/common/HttpError');

class UserRepository extends BaseRepository {
  constructor({ models: { User } }) {
    const selectOptions = {
      single: '-__v -referrals -newUser',
      multiple: '-__v -referrals -newUser',
    };
    super({ Model: User, selectOptions });
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
      throw new HttpError(404, true, 'User not found', {});
    }

    return user;
  }
}

module.exports = UserRepository;
