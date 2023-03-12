const CustomLogger = require("./custon_logger");

class Logger extends CustomLogger {}

module.exports = Object.freeze(new Logger());
