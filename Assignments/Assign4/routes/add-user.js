const express = require("express");
const router = express.Router();
const users = [];
router.get("/add-user", (req, res, next) => {
  res.render("add-user", { pageTitle: "Add User Page" });
});
router.post("/add-user", (req, res, next) => {
  users.push({ email: req.body.email });
  console.log(req.body.email);
  res.redirect("/");
});
exports.routes = router;
exports.users = users;
