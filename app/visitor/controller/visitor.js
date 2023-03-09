const response = require("../../../response/response");
const AuthenticateVisitorUseCase = require("../usecases/AuthenticateVisitorUseCase");

const authenticateVistor = async (req, res, next) => {
  try {
    const token = await AuthenticateVisitorUseCase.execute();
    response
      .setMessage("authentication success")
      .setData({
        next_step: `visit ${process.env.BASE_URL}/api/v1/person/fetch and set this token as a query parameter called token to get access`,
        token,
      })
      .setStatusCode(200)
      .respond(res);
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateVistor };
