const express = require("express");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const Response = require("./response/response");
const ErrorMiddleware = require("./middlewares/error");
const routes = require("./routes");

class NerdBugServer {
  constructor() {
    this.app = express();

    // rate limit the api
    this.app.use(
      rateLimiter({
        windowMs: 1 * 60 * 1000, // 1 minute
        max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      })
    );

    // set up cors
    this.app.use(
      cors({
        origin: "*",
      })
    );

    // log requets
    this.app.use(morgan("combined"));

    // parse request body
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

    this.app.use("/api", routes);

    this.app.get("/health", (req, res) => {
      new Response().setMessage("server is alive").respond(res);
    });

    this.app.use("*", (req, res) => {
      new Response()
        .setMessage(`the route ${req.method} ${req.originalUrl} does not exist`)
        .setStatusCode(404)
        .setSuccess(false)
        .respond(res);
    });

    this.app.use(ErrorMiddleware);
  }

  listen() {
    const PORT = process.env.PORT || "3000";
    this.app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON PORT ${PORT}`);
    });
    return this;
  }
}

module.exports = NerdBugServer;
