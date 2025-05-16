const User = require("../models/user");
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getLogin = async (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].split("=")[1] === "true";
  // console.log(isLoggedIn);
  try {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: false,
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findById("67c61174e0bd2092fcac587f");
    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.save((err) => {
      console.log(err);
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postLogout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
