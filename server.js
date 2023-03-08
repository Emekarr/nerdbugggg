const express = require("express");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const bodyParser = require("body-parser");

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

    // parse request body
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
  }

  listen(){
    const PORT = process.env.PORT || "3000"
    this.app.listen(PORT, () => {
        console.log(`SERVER RUNNING ON PORT ${PORT}`)
    } )
  }
}

module.exports = new NerdBugServer().listen()
