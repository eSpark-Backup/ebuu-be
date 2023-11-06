const express = require("express");
const controller = require("./user.controller");
const router = express.Router();
router.post("/login", controller.login);
router.post("/login-auth", controller.loginWithAuth);
router.post("/signup", controller.signup);
router.post("/signup-auth", controller.signupWithAuth);
module.exports = router;