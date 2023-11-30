const express = require("express");
const controller = require("./device.controller");
const authenticateUser = require("../../../middlewares/auth");
const sercretChecker = require("../../../middlewares/secret");
const router = express.Router();

router.post("/", authenticateUser, controller.addDevice);
router.get("/", authenticateUser, controller.getDevicesByUser);
router.patch("/connect", authenticateUser, controller.connectWithUser);
router.get("/ping/:id", authenticateUser, controller.getDevicePing);
router.patch(
  "/ping",
  sercretChecker(process.env.DEVICE_AUTH_SECRET),
  controller.updateDevicePing
);
router.patch("/:id", authenticateUser, controller.updateDeviceInfo);
router.get("/:id", authenticateUser, controller.getDeviceByUser);

module.exports = router;
