const {
  InjectionMode,
  Lifetime,
  asClass,
  asValue,
  createContainer,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');

// import HttpError from '@interfaces/http/common/HttpError';
// import MongoDB from '@infra/databases/MongoDBManger';
const config = require('./config/index');
const httpServer = require('./interface/server');
// import mongodbModels from '@src/infrastructure/databases/Mongodb/models';
// import Encrypt from '@common/encryption';
// import routes from '@interfaces/http/routes/router';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  // db: asClass(MongoDB).singleton(),
  // models: asValue(mongodbModels),
  // logger: asValue(logger),
  // containerMiddleware: asValue(scopePerRequest(container)),
  // routes: asFunction(routes),
  httpServer: asClass(httpServer),
  // morganOption: asValue(morganOption),
  // HttpError: asValue(HttpError),
  // ResponseBuilder: asValue(ResponseBuilder),
  // encrypt: asClass(Encrypt),
  // LogTypes: asValue(LogTypes),
  // createLog: asValue(createLog),
});

// container.loadModules(
//   [
//     [
//       './infra/repositories/**/*.js',
//       {
//         lifetime: Lifetime.SCOPED,
//         register: asClass,
//       },
//     ],
//   ],
//   {
//     formatName: 'camelCase',
//     resolverOptions: {},
//     cwd: __dirname,
//   }
// );

// container.loadModules(
//   [
//     [
//       './app/*.js',
//       {
//         lifetime: Lifetime.SCOPED,
//         register: asClass,
//       },
//     ],
//   ],
//   {
//     formatName: 'camelCase',
//     resolverOptions: {},
//     cwd: __dirname,
//   }
// );

module.exports = container;
