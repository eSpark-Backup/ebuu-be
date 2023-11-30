const express = require("express");
const authenticateUser = require("../../../middlewares/auth");
const qaController = require("./qa.controller");
const router = express.Router();

router.post("/:id", authenticateUser, qaController.addQA);
router.get("/:id", authenticateUser, qaController.getQAs);
module.exports = router;
