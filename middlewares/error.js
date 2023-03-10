const Response = require("../response/response");

const baseErrors = ["ApplicationError", "UserError", "ExternalDependencyError"];

module.exports = (err, req, res, next) => {
  if (baseErrors.includes(err.name)) {
    new Response()
      .setMessage("an error occured")
      .setErrorMessages([err.message])
      .setSuccess(false)
      .setStatusCode(err.statusCode)
      .respond(res);
  } else {
    new Response()
      .setMessage("an error occured")
      .setErrorMessages([err.message])
      .setSuccess(false)
      .setStatusCode(500)
      .respond(res);
  }

  if (err.alert) {
    console.log("alert on sentry");
  }
};
