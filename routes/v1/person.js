const { Router } = require("express");
const PersonController = require("../../app/person/controller/person");

const router = Router();

router.get("/fetch", PersonController.fetchProfile);

module.exports = router;
