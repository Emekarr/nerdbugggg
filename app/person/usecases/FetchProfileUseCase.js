const profile = require("../../../about_me");

class FetchProfileUseCase {
  constructor() {
    this.profile = profile;
  }

  execute() {
    return profile;
  }
}

module.exports = Object.freeze(new FetchProfileUseCase());
