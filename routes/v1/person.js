const { Router } = require("express");
const PersonController = require("../../app/person/controller/person");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/fetch", auth, PersonController.fetchProfile);

module.exports = router;
