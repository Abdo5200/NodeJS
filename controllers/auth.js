const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) return res.redirect("/login");
    const matchPass = await bcrypt.compare(password, user.password);
    console.log("match val ", matchPass);
    if (!matchPass) return res.redirect("/login");
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
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) return res.redirect("/signup");
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPass,
      cart: { items: [] },
    });
    user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign up",
    isAuthenticated: false,
  });
};
