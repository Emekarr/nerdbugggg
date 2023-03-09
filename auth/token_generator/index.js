const JWTGenerator = require("./JWT");

class TokenGenerator extends JWTGenerator {}

module.exports = Object.freeze(new TokenGenerator());
