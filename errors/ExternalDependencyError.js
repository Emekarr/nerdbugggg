const BaseError = require("./BaseError");

module.exports = class ExternalDependencyError extends BaseError {
  constructor(statusCode, message) {
    super("ExternalDependencyError", statusCode, message, true);
  }
};
