const express = require("express");
const controller = require("./device.controller");
const authenticateUser = require("../../../middlewares/auth");
const sercretChecker = require("../../../middlewares/secret");
const router = express.Router();

router.patch(
  "/ping",
  sercretChecker(process.env.DEVICE_AUTH_SECRET),
  controller.updateDevicePing
);
router.patch("/connect", authenticateUser, controller.connectWithUser);
router.get("/ping/:macAddress", authenticateUser, controller.getDevicePing);
router.patch("/:id", authenticateUser, controller.updateDeviceInfo);
router.get("/:id", authenticateUser, controller.getDeviceByID);

module.exports = router;
