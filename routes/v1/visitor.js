const { Router } = require("express");
const VisitorController = require("../../app/visitor/controller/visitor");

const router = Router();

router.get("/authenticate", VisitorController.authenticateVistor);

module.exports = router;
