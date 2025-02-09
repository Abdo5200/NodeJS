const express = require("express");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error.js");
const bodyParser = require("body-parser");
const rootDir = require("./util/path.js");
const app = express();

// const expressHBS = require("express-handlebars");

//?we tell express to use handleBars as our default view engine
//!we used expressHBS() to initialize it and the first field is the name which we want use and we can change it
/*app.engine(
  "hbs",
  expressHBS({
    layoutDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
*/
app.set("view engine", "ejs");

//*we tell express to use pug as our default view engine
//!it's integrated into express so we don't have to import it
// app.set("view engine", "pug");

//we tell the rendering engine where to find views in the second argument
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes.routes);

app.use(shopRoutes);

app.use(errorController.getErrorPage);

app.listen(3000);

//npm install --save express-handlebars@3.0
