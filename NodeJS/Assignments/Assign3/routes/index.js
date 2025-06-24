const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/users", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "input.html"));
});
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "homePage.html"));
});
module.exports = router;
