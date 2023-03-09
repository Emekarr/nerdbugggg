const jwt = require("jsonwebtoken");

class JWTGenerator {
  constructor() {
    this.jwt = jwt;
    this.SECRET_KEY = process.env.JWT_TOKEN;
    this.ISSUER = process.env.JWT_ISSUER;
  }

  async generateToken() {
    return this.jwt.sign({}, this.SECRET_KEY, {
      expiresIn: 60 * 720 * 60,
      issuer: this.ISSUER,
    });
  }

  async verifyToken(token) {
    return this.jwt.verify(token, this.SECRET_KEY);
  }
}
