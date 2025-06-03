const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
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
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else message = null;
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

exports.postReset = async (req, res, next) => {
  try {
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString("hex");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", "No account match the provided email");
      return res.redirect("/reset");
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; //1 hour from now
    user.save();
    res.redirect("/");
    const info = await transporter.sendMail({
      from: "abdelrahman.mamdouh2200@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `
      <p>You requested password reset</p>
      <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
      `,
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

exports.getNewPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      req.flash("error", "Reset link Expire, Request the reset link Again");
      return res.redirect("/reset");
    }
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else message = null;
    res.render("auth/new-password", {
      path: "/new-password",
      pageTitle: "New Password",
      errorMessage: message,
      userId: user._id.toString(),
      passwordToken: token,
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postNewPassword = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const newPassword = req.body.password;
    const passwordToken = req.body.passwordToken;
    const user = await User.findOne({
      _id: userId,
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      req.flash("error", "Password Request Timed Out");
      return res.redirect("/reset");
    }
    const hashedPass = await bcrypt.hash(newPassword, 12);
    user.password = hashedPass;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};
