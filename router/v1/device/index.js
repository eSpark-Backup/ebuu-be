const express = require("express");
const controller = require("./device.controller");
const authenticatUser = require("../../../middlewares/auth");
const router = express.Router();

router.use(authenticatUser);
router.post("/", controller.create);

module.exports = router;
