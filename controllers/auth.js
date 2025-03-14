exports.getLogin = async (req, res, next) => {
  try {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.postLogin = async (req, res, next) => {
  try {
    req.isLoggedIn = true;
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
