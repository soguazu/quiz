const {
  InjectionMode,
  Lifetime,
  asClass,
  asValue,
  asFunction,
  createContainer,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');
const { logger, morganOption, createLog, LogTypes } = require('./infra/logger');
const ResponseBuilder = require('./interface/util/ResponseBuilder');
const encryption = require('./interface/util/encryption');
const {
  validateRequest,
  validateRequestWithCustomSchema,
} = require('./interface/util/validation');
const MongoDB = require('./infra/database/MongoDBManager');
const config = require('./config/index');
const httpServer = require('./interface/server');
const HttpError = require('./interface/error/HttpError');
const mongodbModels = require('./infra/database/models/');
const routes = require('./interface/routes/router');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  db: asClass(MongoDB).singleton(),
  models: asValue(mongodbModels),
  logger: asValue(logger),
  containerMiddleware: asValue(scopePerRequest(container)),
  routes: asFunction(routes),
  httpServer: asClass(httpServer),
  morganOption: asValue(morganOption),
  ResponseBuilder: asValue(ResponseBuilder),
  encryption: asClass(encryption),
  httpError: asValue(HttpError),
  LogTypes: asValue(LogTypes),
  createLog: asValue(createLog),
  validateRequest: asValue(validateRequest),
  validateRequestWithCustomSchema: asValue(validateRequestWithCustomSchema),
});

container.loadModules(
  [
    [
      './infra/repository/**/*.js',
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {},
    cwd: __dirname,
  }
);

container.loadModules(
  [
    [
      './app/*.js',
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {},
    cwd: __dirname,
  }
);

module.exports = container;
