const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Auth {
  constructor({ userRepository, token, httpError }) {
    this.userRepository = userRepository;
    this.tokenService = token;
    this.HttpError = httpError;
  }

  async signup(userData) {
    const user = await this.userRepository.persist({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      clearPassword: userData.password,
      username: userData.username,
      newUser: true,
      source: userData.source,
      referral: userData.referral,
      ...(userData.phone && { phone: userData.phone }),
    });

    const token = await this.tokenService.createToken(
      user.email,
      'EMAIL_VERIFICATION',
      user._id,
      'User'
    );

    return { user: user, token: token.token };
  }

  async login(userData) {
    console.log(userData);
    try {
      const user = await this.userRepository.getOneBy(
        { email: userData.email },
        true
      );
      if (user.length === 0) {
        throw new this.HttpError(
          401,
          'You have entered a wrong email or password.'
        );
      }

      if (!bcrypt.compareSync(userData.password, user[0].password)) {
        throw new this.HttpError(
          401,
          'You have entered a wrong email or password.'
        );
      }

      return await this.generateLoginToken(user[0]);
    } catch (error) {
      if (error.status == 404) {
        throw new this.HttpError(
          401,
          'You have entered a wrong email or password.'
        );
      }
      throw error;
    }
  }

  async generateLoginToken(user) {
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '60d',
    });

    user.lastLogin = Date.now();
    await this.userRepository.persist(user);

    return { token: jwtToken, user };
  }
}

module.exports = Auth;
