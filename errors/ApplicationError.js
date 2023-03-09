const BaseError = require("./BaseError");

module.exports = class ApplicationError extends BaseError {
  constructor(statusCode, message, alert) {
    super("ApplicationError", statusCode, message, alert);
  }
};
