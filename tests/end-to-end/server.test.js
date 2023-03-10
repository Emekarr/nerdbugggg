const dotenv = require("dotenv");
dotenv.config();

const Server = require("../../server");
let app = new Server().app;
const request = require("supertest");

describe("test routes in server.js", () => {
  test("test health route", async () => {
    const response = await request(app).get("/health").send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "server is alive",
      data: null,
      success: true,
      errMsgs: [],
    });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("test 404 route", async () => {
    const wrongEndpoint = "/does-not-exist";
    const response = await request(app).get(wrongEndpoint).send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: `the route GET ${wrongEndpoint} does not exist`,
      data: null,
      success: false,
      errMsgs: [],
    });
  });
});
