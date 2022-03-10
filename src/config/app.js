const server = {
  serviceName: {
    doc: 'quiz',
    format: '*',
    default: 'quiz',
    env: 'NAME',
    sensitive: false,
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 8080,
    env: 'PORT',
    sensitive: false,
  },
  version: {
    doc: 'The API version',
    format: '*',
    default: 'v1',
    env: 'API_VERSION',
    sensitive: false,
  },
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test', 'qa', 'staging'],
    default: 'development',
    env: 'NODE_ENV',
    sensitive: false,
  },
  bodyLimit: {
    doc: 'The maximum size of request bodies (json)',
    format: '*',
    default: '10mb',
    env: 'BODY_LIMIT',
    sensitive: false,
  },
  allowedOrigins: {
    doc: 'Allowed origins for CORS',
    format: '*',
    default: '*',
    env: 'ALLOWED_ORIGINS',
    sensitive: false,
  },
  encryptionKey: {
    doc: 'Encryption Key',
    format: '*',
    default: '',
    env: encodeURIComponent('ENCRYPTION_KEY'),
    sensitive: true,
  },
  jwtToken: {
    doc: 'JWT Token',
    format: '*',
    default: '',
    env: encodeURIComponent('JWT_SECRET'),
    sensitive: true,
  },
};

module.exports = server;
