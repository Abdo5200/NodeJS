const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodeMailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getLogin = async (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].split("=")[1] === "true";
  // console.log(isLoggedIn);
  try {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else message = null;
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: message,
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
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }
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
    if (existUser) {
      req.flash("error", "Email is already existed, pick a another email");
      return res.redirect("/signup");
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPass,
      cart: { items: [] },
    });
    await user.save();
    res.redirect("/login");
    const info = await transporter.sendMail({
      to: email,
      from: "abdelrahman.mamdouh2200@gmail.com",
      subject: "Sign up completed",
      html: "<h1>You successfully signed up!</h1>",
    });
    console.log("Email sent: ", info);
  } catch (err) {
    console.log(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else message = null;
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign up",
    errorMessage: message,
  });
};
