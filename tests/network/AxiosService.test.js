const nock = require("nock");

const AxiosService = require("../../network/Axios");

// load env
const dotenv = require("dotenv");
dotenv.config();

const baseURL = "https://example.nerdbug.com";
const axiosService = new AxiosService(baseURL);

test("check if important properties and methods present", () => {
  const defaultAxiosError = {
    message: "could not successfully complete request to an external server",
    useAsDefault: true,
  };
  expect(axiosService.setHeader).toBeDefined();
  expect(axiosService.setAuthHeader).toBeDefined();
  expect(axiosService.setBasicAuth).toBeDefined();
  expect(axiosService.get).toBeDefined();
  expect(axiosService.post).toBeDefined();
  expect(axiosService.update).toBeDefined();
  expect(axiosService.delete).toBeDefined();
  expect(axiosService._handleRequest).toBeDefined();
  expect(axiosService.onError).toBeDefined();
  expect(axiosService.baseUrl).toBe(baseURL);
  expect(axiosService.timeout).toBe(20000);
  expect(axiosService.__error).toEqual(defaultAxiosError);

  expect(typeof axiosService.setHeader).toBe("function");
  expect(typeof axiosService.setAuthHeader).toBe("function");
  expect(typeof axiosService.setBasicAuth).toBe("function");
  expect(typeof axiosService.get).toBe("function");
  expect(typeof axiosService.post).toBe("function");
  expect(typeof axiosService.update).toBe("function");
  expect(typeof axiosService.delete).toBe("function");
  expect(typeof axiosService._handleRequest).toBe("function");
  expect(typeof axiosService.onError).toBe("function");
  expect(typeof axiosService.baseUrl).toBe("string");
  expect(typeof axiosService.timeout).toBe("number");
  expect(typeof axiosService.__error).toEqual("object");
});

describe("test HTTP methods defined in AxiosService", () => {
  test("test successful get request", async () => {
    nock(baseURL).get("/").reply(200, {
      name: "NerdBug",
      success: true,
    });
    const response = await axiosService.get("/");

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
    const response = await axiosService.get("/");

    expect(response).toBe(null);
  });

  test("test successful post request", async () => {
    nock(baseURL)
      .post("/")
      .reply(201, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await axiosService.post("/");

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
    const response = await axiosService.post("/");

    expect(response).toBe(null);
  });

  test("test successful update request", async () => {
    nock(baseURL)
      .put("/")
      .reply(200, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await axiosService.update("/");

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
    const response = await axiosService.update("/");

    expect(response).toBe(null);
  });

  test("test successful delete request", async () => {
    nock(baseURL)
      .delete("/")
      .reply(200, {
        body: { name: "NerdBug" },
        success: true,
      });
    const response = await axiosService.delete("/");

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
    const response = await axiosService.update("/");

    expect(response).toEqual(null);
  });
});
