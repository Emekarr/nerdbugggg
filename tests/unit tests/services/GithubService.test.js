const GithubService = require("../../../services/GithubService");

// load env
const dotenv = require("dotenv");
dotenv.config();

describe("test for properties present in the GithubService", () => {
  test("fetchUserRepositories method shoud exist", () => {
    expect(GithubService.fetchUserRepositories).toBeDefined();
    expect(typeof GithubService.fetchUserRepositories).toBe("function");
  });

  test("GithubService should use an instance of NetworkService", () => {
    expect(GithubService.network.constructor.name).toBe("NetworkService");
  });
});

describe("test GithubService methods", () => {
  test("fetch repository information from Github", async () => {
    const repo = await GithubService.fetchUserRepositories("emekarr");

    expect(repo).not.toBeFalsy();
    expect(repo.length).not.toBeFalsy();
    if (repo[0]) {
      expect(repo[0].owner.login.toLowerCase()).toBe("emekarr");
    }
  });

  test("return empty array if unknown Github handle is searched", async () => {
    const unknownGithubHandle = "!user--" + Date.now();
    const repos = await GithubService.fetchUserRepositories(
      unknownGithubHandle
    );

    expect(repos).toBeFalsy();
  });
});
