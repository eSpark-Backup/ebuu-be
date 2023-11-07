const express = require("express");
const controller = require("./device.controller");
const authenticatUser = require("../../../middlewares/auth");
const router = express.Router();

router.post("/ping", controller.create);
router.patch("/connect", authenticatUser, controller.connectWithUser);
router.get("/:macAddress", authenticatUser, controller.getDevice);

module.exports = router;
