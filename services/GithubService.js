const logger = require("../logger");
const NetworkService = require("../network");

class GithubService {
  constructor() {
    this.network = new NetworkService("https://api.github.com");
  }

  async fetchUserRepositories(username) {
    logger.info(`fetching user github profile - ${username}`);
    return await this.network.get(`/users/${username}/repos`, {
      headers: { "User-Agent": "request" },
      OAUth: process.env.ç,
    });
  }
}

module.exports = Object.freeze(new GithubService());
