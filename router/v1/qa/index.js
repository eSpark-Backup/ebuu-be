const express = require("express");
const authenticateUser = require("../../../middlewares/auth");
const qaController = require("./qa.controller");
const router = express.Router();

router.post("/", authenticateUser, qaController.addQA);
router.get("/", authenticateUser, qaController.getQAs);
module.exports = router;
