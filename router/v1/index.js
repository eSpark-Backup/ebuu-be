const express = require("express");
const router = express.Router();
const fs = require("fs");


fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    if (file.toLowerCase()) {
      router.use(`/${file}`, require(`./${file}`));
    }
  });

module.exports = router;