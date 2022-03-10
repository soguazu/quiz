const {
  InjectionMode,
  Lifetime,
  asClass,
  asValue,
  createContainer,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');

const HttpError = require('./interface/error/HttpError');
const MongoDB = require('./infra/database/MongoDBManager');
const config = require('./config/index');
const httpServer = require('./interface/server');
const mongodbModels = require('./infra/database/models/');

import routes from '@interfaces/http/routes/router';

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
  HttpError: asValue(HttpError),
  ResponseBuilder: asValue(ResponseBuilder),
  LogTypes: asValue(LogTypes),
  createLog: asValue(createLog),
});

container.loadModules(
  [
    [
      './infra/repositories/**/*.js',
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
