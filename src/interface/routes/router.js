const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const v1Routes = require('./v1');

/**
 * Configures express middlewares
 */
module.exports = ({ config, containerMiddleware, morganOption, logger }) => {
  const router = express.Router();
  router.use(helmet());
  const NODE_ENV = config.get('app.env');
  router.use(
    morgan('combined', NODE_ENV === 'production' ? 'combined' : morganOption)
  );

  const bodyLimit = config.get('app.bodyLimit');
  router.use(
    express.json({
      limit: bodyLimit,
    })
  );
  router.use(express.urlencoded({ extended: false, limit: bodyLimit }));

  // Setup CORS
  const allowedOrigins = config.get('app.allowedOrigins');
  router.use(
    cors({
      origin: (origin, cb) => {
        if (allowedOrigins.trim() === '*') {
          cb(null, true);
        } else {
          const origins = allowedOrigins.split(',');
          if (origins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
          } else {
            cb(new Error(`Origin('${origin}') not allowed`));
          }
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );

  // https://www.npmjs.com/package/awilix-express
  router.use(containerMiddleware);

  router.get('/', (req, res) =>
    res.json({
      message: 'Sample API template using Clean Architecture',
    })
  );

  router.use('/v1', v1Routes);
  router.use((err, req, res, next) => {
    logger.error(err, undefined, false, req);

    if (err.name === 'HttpError') {
      return err.getErrorResponse(res);
    }

    res.status(500).json({ success: false, error: 'An error occurred' });
  });

  return router;
};
