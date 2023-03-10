const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = require("../../middlewares/auth");
const tokenGenerator = require("../../auth/token_generator");

describe("test auth middleware", () => {
  test("authentication failure -- no token", async () => {
    const req = {};
    authMiddleware(req, {}, (err) => {
      expect(err).not.toBe(undefined);
    });
  });

  test("authentication failure -- bad token", async () => {
    const token = (await tokenGenerator.generateToken()) + "123";
    const req = { query: { token } };
    authMiddleware(req, {}, (err) => {
      expect(err).not.toBe(undefined);
    });
  });

  test("authentication success", async () => {
    const token = await tokenGenerator.generateToken();
    const req = { query: { token } };
    authMiddleware(req, {}, (err) => {
      expect(err).toBe(undefined);
    });
  });
});
