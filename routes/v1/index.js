const { Router } = require("express");
const perosnRoutes = require("./person");
const visitorRoutes = require("./visitor");

const router = Router();

router.use("/person", perosnRoutes);

router.use("/visitor", visitorRoutes);

module.exports = router;
