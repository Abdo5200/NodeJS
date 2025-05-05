const { CURSOR_FLAGS } = require("mongodb");
const Product = require("../models/product");
const Order = require("../models/order");
// const Order = require("../models/order");
const express = require("express");
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getProduct = async (req, res, next) => {
  //? we can use findAll to return an array of products that meets some criteria
  //? but in this case it will return one item
  const prodId = req.params.productId;
  //*this is with mongo/mongoose
  try {
    const product = await Product.findById(prodId);
    res.render("shop/product-detail", {
      //product is an array with one object with a unique id and we want to return one object so [0]
      product: product,
      pageTitle: product.title,
      path: "/products",
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items;
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findById(prodId);
    const addedProduct = await req.user.addToCart(product);
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postCartDelteItem = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    await req.user.deleteCartItem(prodId);
    res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postOrder = async (req, res, next) => {
  try {
    //this takes the productId in the items array
    //then gets the product object using the id and put the object instead of the id
    //this is useful as we not get the product manually
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items.map((item) => {
      return { quantity: item.quantity, product: { ...item.productId._doc } }; //? this will get all product data using _doc and will spread it
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
      products: products,
    });
    order.save();
    req.user.clearCart();
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id });
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};
