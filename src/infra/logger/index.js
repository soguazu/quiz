const buildDevLogger = require('./logger');

function getIpAddress(req) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  );
}

function generateLogType(
  title,
  logType,
  objectType = undefined,
  description = undefined
) {
  return {
    title,
    logType,
    objectType,
    description,
  };
}

const LogTypes = {
  USER_LOGIN: generateLogType(
    'User Logged in',
    'USER_LOGIN',
    undefined,
    'User logged in successfully'
  ),
};

function createLog(
  request,
  type,
  objectId,
  userId = undefined,
  description = undefined,
  extraData = undefined
) {
  logger.info({
    logType: type.logType,
    title: type.title,
    user: userId || request.user._id,
    objectType: type.objectType,
    object: objectId,
    description: description || type.description,
    ipAddress: getIpAddress(request),
    userAgent: request.get('User-Agent'),
    extraData,
  });
}

/*
  * sample on how to use it destructure the   *
  *  function createLog and LogType from      *
  *  your constructor or just import if can't *
  * 
  const logType = LogTypes.USER_LOGIN
  createUserLog(req, logType, inputData.id);
*/

function init() {
  let logger = null;
  if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger();
  }
  return logger;
}

const logger = init();

const morganOption = {
  stream: {
    write(message) {
      logger.info(message.trim());
    },
  },
};

module.exports = { logger, morganOption, createLog, LogTypes };
