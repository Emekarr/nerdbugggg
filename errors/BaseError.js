module.exports = class CustomError extends Error {
  constructor(name, statusCode, message, alert) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.alert = alert;
    this.message = message;

    Error.captureStackTrace(this);
  }
};
