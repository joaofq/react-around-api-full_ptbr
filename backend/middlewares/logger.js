const winston = require('winston');
const expressWinston = require('express-winston');
const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const logsDir = './logs';

if (!existsSync(logsDir)) {
  mkdirSync(logsDir);
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: join(logsDir, '/request.log'),
    }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: join(logsDir, '/error.log'),
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
