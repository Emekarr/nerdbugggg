const dotenv = require("dotenv");
dotenv.config();

const Server = require("../../../server");
let app = new Server().app;
const request = require("supertest");

describe("test visitor routes", () => {
  test("/v1/visitor/authenticate GET --  no token", async () => {
    const response = await request(app)
      .get("/api/v1/visitor/authenticate")
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("authentication success");
    expect(response.body.success).toBe(true);
    expect(response.body.errMsgs).toEqual([]);
    expect(response.body.data.next_step).toBe(
      `visit ${process.env.BASE_URL}/api/v1/person/fetch and set this token as a query parameter called token to get access`
    );
    expect(typeof response.body.data.token).toBe('string');
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
