const express = require("express");
const app = express();
const path = require("path");
const mainRoutes = require("./routes/index");

app.use(express.static(path.join(__dirname, "public")));
app.use(mainRoutes);

app.listen(3000);
