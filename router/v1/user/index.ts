const express = require("express");
const controller = require("./user.controller");
const sercretChecker = require("../../../middlewares/secret");
const router = express.Router();
router.post("/login", controller.login);
router.post(
  "/login-auth",
  sercretChecker(process.env.USER_AUTH_SECRET),
  controller.loginWithAuth
);
router.post("/signup", controller.signup);
router.post(
  "/signup-auth",
  sercretChecker(process.env.USER_AUTH_SECRET),
  controller.signupWithAuth
);
module.exports = router;
