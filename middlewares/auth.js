const response = require("../response/response");
const TokenGenerator = require("../auth/token_generator");
const UserError = require("../errors/UserError");

module.exports = async (req, res, next) => {
  try {
    const token = req.query.token;
    if (!token)
      throw new UserError(401, "an access token is required for this route");
    const result = await TokenGenerator.verifyToken(token);
    if (result["iss"] !== process.env.JWT_ISSUER)
      throw new UserError(403, "corrupted token provided");

    next();
  } catch (err) {
    next(new UserError(403, err.message));
  }
};
