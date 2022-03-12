const jwt = require('jsonwebtoken')

const HttpError = require('../error/HttpError')

 async function validateToken (req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw new Error();
      }
  
      const token = req.headers.authorization.substr(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.log(error)
      next(new HttpError(401, true, 'Not authenticated', error));
    }
  }

  module.exports = validateToken
  