const tokenGenerator = require("../../../auth/token_generator");

class AuthenticateVisitorUseCase {
  constructor() {
    this.tokenGenerator = tokenGenerator;
  }

  async execute() {
    return await this.tokenGenerator.generateToken();
  }
}

module.exports = Object.freeze(new AuthenticateVisitorUseCase());
