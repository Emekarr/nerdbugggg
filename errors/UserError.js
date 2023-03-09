const BaseError = require("./BaseError");

module.exports = class UserError extends BaseError {
  constructor(statusCode, message) {
    super("UserError", statusCode, message, false);
  }
};
