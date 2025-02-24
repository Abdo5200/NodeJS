const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const mongoConnection = require("./util/database").mongoConnection;

//?this for sequelize and mysql
// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");
// const { FORCE } = require("sequelize/lib/index-hints");
//?-----------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//!this is the promise based
// app.use((req, res, next) => {
//   User.findById("67b77d80dfea294bc9892f98")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//?this is the async/await approach
app.use(async (req, res, next) => {
  try {
    const user = await User.findById("67b77d80dfea294bc9892f98");
    req.user = new User(user.name, user.email, user.cart, user._id);
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnection(() => {
  app.listen(3000);
});

//!this was for mysql connection
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);

// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       console.log("the user is ", User.findByPk(1));
//       return User.create({ name: "Abdelrahman", email: "test123@test.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     return user.createCart();
//   })
//   .then(() => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
