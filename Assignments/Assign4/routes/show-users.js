const express = require("express");
const userData = require("./add-user");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("show-users", {
    pageTitle: "Show Users",
    users: userData.users,
  });
});
module.exports = router;
