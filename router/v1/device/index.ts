const express = require("express");
const controller = require("./device.controller");
const authenticatUser = require("../../../middlewares/auth");
const sercretChecker = require("../../../middlewares/secret");
const router = express.Router();

router.patch(
  "/ping",
  sercretChecker(process.env.DEVICE_AUTH_SECRET),
  controller.updateDevicePing
);
router.patch("/connect", authenticatUser, controller.connectWithUser);
router.patch("/:id", authenticatUser, controller.updateDeviceInfo);
router.get("/:macAddress", authenticatUser, controller.getDevicePing);

module.exports = router;
