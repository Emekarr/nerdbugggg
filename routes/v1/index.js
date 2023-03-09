const { Router } = require("express");
const perosnRoutes = require("./person");

const router = Router();

router.use("/person", perosnRoutes);

module.exports = router;
