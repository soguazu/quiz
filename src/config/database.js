const db = {
  host: {
    doc: 'The database host',
    format: '*',
    default: '',
    env: 'MONGO_HOST',
    sensitive: false,
  },
  name: {
    doc: 'The database name',
    format: '*',
    default: 'quiz',
    env: 'MONGO_NAME',
    sensitive: false,
  },
  port: {
    doc: 'The database port',
    format: '*',
    default: 27017,
    env: 'MONGO_PORT',
    sensitive: false,
  },
  user: {
    doc: 'The database username',
    format: '*',
    default: '',
    env: encodeURIComponent('MONGO_USERNAME'),
    sensitive: true,
  },
  password: {
    doc: 'The database password',
    format: '*',
    default: '',
    env: encodeURIComponent('MONGO_PASSWORD'),
    sensitive: true,
  },
  auth: {
    doc: 'The database auth',
    format: '*',
    default: '',
    env: 'MONGO_AUTH',
    sensitive: false,
  },
};

module.exports = db;
