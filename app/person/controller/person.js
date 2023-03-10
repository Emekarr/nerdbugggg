const Response = require("../../../response/response");
const FetchProfileUseCase = require("../usecases/FetchProfileUseCase");

const fetchProfile = async (req, res, next) => {
  try {
    const profile = await FetchProfileUseCase.execute();
    new Response()
      .setMessage("profile fetched")
      .setData(profile)
      .setStatusCode(200)
      .respond(res);
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchProfile };
