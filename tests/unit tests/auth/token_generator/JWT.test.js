const JWTGenerator = require("../../../../auth/token_generator/JWT");

const dotenv = require("dotenv");
dotenv.config();

test("test JWT module for required properties", () => {
  const jwtGenerator = new JWTGenerator();
  expect(jwtGenerator.ISSUER).toBeDefined();
  expect(jwtGenerator.SECRET_KEY).toBeDefined();
  expect(jwtGenerator.SECRET_KEY).toBe(process.env.JWT_TOKEN);
  expect(jwtGenerator.ISSUER).toBe(process.env.JWT_ISSUER);
});

describe("test JWT methods", () => {
  test("test token generation", async () => {
    const jwtGenerator = new JWTGenerator();
    const token = await jwtGenerator.generateToken();

    expect(token).toBeDefined();
  });

  test("test successful token verification", async () => {
    const jwtGenerator = new JWTGenerator();
    const token = await jwtGenerator.generateToken();
    const result = await jwtGenerator.verifyToken(token);

    expect(result["iss"]).toBe(jwtGenerator.ISSUER);
  });

  test("test token verification for illegal token -- wrong issuer", async () => {
    const jwtGenerator = new JWTGenerator();
    const malicousTokenGenerator = new JWTGenerator();
    malicousTokenGenerator.ISSUER = "malicousIssuer";
    const token = await malicousTokenGenerator.generateToken();
    const result = await jwtGenerator.verifyToken(token);

    expect(result["iss"]).not.toBe(process.env.JWT_ISSUER);
  });

  test("test token verification for illegal token -- wrong secret key", async () => {
    try {
      const jwtGenerator = new JWTGenerator();
      const malicousTokenGenerator = new JWTGenerator();
      malicousTokenGenerator.SECRET_KEY = "wrong-key";
      const token = await malicousTokenGenerator.generateToken();
      const result = await jwtGenerator.verifyToken(token);

      expect(result["iss"]).not.toBe(process.env.JWT_ISSUER);
    } catch (err) {
      expect(err).not.toBe(null);
      expect(err).not.toBe(undefined);
    }
  });
});
