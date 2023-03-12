const clogger = require("custom-logger");

module.exports = class CustomLogger {
  constructor() {
    this.logger = clogger.config({ level: 0 });
  }

  info(message) {
    this.logger.info(message);
    return this;
  }

  error(message) {
    this.logger.error(message);
    return this;
  }

  debug(message) {
    this.logger.debug(message);
    return this;
  }

  warn(message) {
    this.logger.warn(message);
    return this;
  }
};
