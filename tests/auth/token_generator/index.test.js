const dotenv = require("dotenv");
dotenv.config();

const tokenGenerator = require("../../../auth/token_generator/index");

describe("test tokenGenerator methods", () => {
  test("test token generation", async () => {
    const token = await tokenGenerator.generateToken();

    expect(token).toBeDefined();
    expect(typeof token).toBeDefined("string");
  });

  test("test successful token verification", async () => {
    const token = await tokenGenerator.generateToken();
    const result = await tokenGenerator.verifyToken(token);

    expect(result["iss"]).toBe(tokenGenerator.ISSUER);
  });
});
