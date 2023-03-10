const profile = require("../../../about_me");
const GithubService = require("../../../services/GithubService");

class FetchProfileUseCase {
  constructor() {
    this.profile = profile;
    this.githubService = GithubService;
  }

  async execute() {
    const githubProfile = await this.__getPersonGithubProfile();
    return { profile, githubProfile };
  }

  async __getPersonGithubProfile() {
    let repos = await this.githubService.fetchUserRepositories("emekarr");
    repos = repos.map((repo) => {
      return {
        name: repo.name,
        private: repo.private,
        url: repo.html_url,
        description: repo.description,
        languages: repo.languages_url,
      };
    });
    const payload = {
      numberOfRepos: repos.length,
      repos,
    };
    return payload;
  }
}

module.exports = Object.freeze(new FetchProfileUseCase());
