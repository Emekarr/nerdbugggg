const NetworkService = require("../network");

class GithubService {
  constructor() {
    this.network = new NetworkService("https://api.github.com");
  }

  async fetchUserRepositories(username) {
    return await this.network.get(`/users/${username}/repos`);
  }
}

module.exports = Object.freeze(new GithubService());
