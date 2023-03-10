const nock = require("nock");

const NetwotrkService = require("../../../network/index");

// load env
const dotenv = require("dotenv");
dotenv.config();

const baseURL = "https://example.nerdbug.com";
const networkService = new NetwotrkService(baseURL);

test("check if important properties and methods present", () => {
  expect(networkService.setHeader).toBeDefined();
  expect(networkService.setAuthHeader).toBeDefined();
  expect(networkService.setBasicAuth).toBeDefined();
  expect(networkService.get).toBeDefined();
  expect(networkService.post).toBeDefined();
  expect(networkService.update).toBeDefined();
  expect(networkService.delete).toBeDefined();
  expect(networkService._handleRequest).toBeDefined();
  expect(networkService.onError).toBeDefined();
  expect(networkService.baseUrl).toBe(baseURL);
  expect(networkService.timeout).toBe(20000);
});

describe("test HTTP methods defined in NetworkService", () => {
  test("test successful get request", async () => {
    nock(baseURL).get("/").reply(200, {
      name: "NerdBug",
      success: true,
    });
    const response = await networkService.get("/");

    expect(response).toEqual({
      name: "NerdBug",
      success: true,
    });
  });

  test("test unsuccessful get request", async () => {
    nock(baseURL)
      .get("/")
      .reply(400, {
        error: ["an error occured"],
      });
    const response = await networkService.get("/");

    expect(response).toBe(null);
  });

  test("test successful post request", async () => {
    nock(baseURL)
      .post("/")
      .reply(201, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await networkService.post("/");

    expect(response).toEqual({
      body: { name: "NerdBug" },
      success: true,
    });
  });

  test("test unsuccessful post request", async () => {
    nock(baseURL)
      .post("/")
      .reply(400, {
        error: ["an error occured"],
      });
    const response = await networkService.post("/");

    expect(response).toBe(null);
  });

  test("test successful update request", async () => {
    nock(baseURL)
      .put("/")
      .reply(200, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await networkService.update("/");

    expect(response).toEqual({
      body: { name: "NerdBug" },
      success: true,
    });
  });

  test("test unsuccessful update request", async () => {
    nock(baseURL)
      .put("/")
      .reply(500, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await networkService.update("/");

    expect(response).toBe(null);
  });

  test("test successful delete request", async () => {
    nock(baseURL)
      .delete("/")
      .reply(200, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await networkService.delete("/");

    expect(response).toEqual({
      body: { name: "NerdBug" },
      success: true,
    });
  });

  test("test unsuccessful delete request", async () => {
    nock(baseURL)
      .delete("/")
      .reply(500, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await networkService.update("/");

    expect(response).toEqual(null);
  });
});
