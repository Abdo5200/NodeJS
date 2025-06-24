const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const addUserRoutes = require("./routes/add-user");
const showUsersRoutes = require("./routes/show-users");
const rootDir = require("./util/path");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", addUserRoutes.routes);
app.use(showUsersRoutes);
app.get((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
app.listen(3000);
