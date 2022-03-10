const BaseRepository = require('./BaseRepository');

class TokenRepository extends BaseRepository {
  constructor({ models: { Token } }) {
    super({ Model: Token });
  }
}

module.exports = TokenRepository;
