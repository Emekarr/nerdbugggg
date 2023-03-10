const dotenv = require("dotenv");
dotenv.config();

const Server = require("../../../server");
let app = new Server().app;
const request = require("supertest");

const profile = require("../../../about_me");

describe("test perosn routes", () => {
  test("/v1/person/fetch GET --  no token", async () => {
    const response = await request(app).get("/api/v1/person/fetch").send();

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({
      message: "an error occured",
      data: null,
      success: false,
      errMsgs: [["an access token is required for this route"]],
    });
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  test("/v1/person/fetch GET", async () => {
    const tokenResponse = await request(app)
      .get("/api/v1/visitor/authenticate")
      .send();
    const token = tokenResponse.body.data.token;

    const response = await request(app)
      .get(`/api/v1/person/fetch?token=${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("profile fetched");
    expect(response.body.success).toBe(true);
    expect(response.body.errMsgs).toEqual([]);
    expect(response.body.data.profile).toEqual(profile);
    expect(typeof response.body.data.githubProfile).toBe("object");
    expect(typeof response.body.data.githubProfile.numberOfRepos).toBe(
      "number"
    );
    expect(Array.isArray(response.body.data.githubProfile.repos)).toBe(true);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});
