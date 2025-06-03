const { query } = require("express");
const Product = require("../models/product");
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postAddProduct = async (req, res, next) => {
  //take the product details from request body
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //create a new product object from Product Schema
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: req.user,
  });
  try {
    await product.save();
    console.log("Created Product");
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getEditProduct = async (req, res, next) => {
  //checks first if it was called with correct way or someone typed a query
  const editMode = Boolean(req.query.edit);
  //if someone forced it return to main page
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  try {
    //get the product object
    const product = await Product.findOne({
      _id: prodId,
      userId: req.user._id,
    });
    //if it does not exist then someone called edit in the url and added a fake id
    if (!product) return res.redirect("/");
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImgUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const product = await Product.findOne({
      _id: prodId,
      userId: req.user._id,
    });
    if (!product) {
      return res.redirect("/");
    }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImgUrl;
    product.save();
    console.log("Updated Product");
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    await Product.deleteOne({
      _id: prodId,
      userId: req.user._id,
    });
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    //?use select to choose some of the incoming data and '-' to exclude some data
    // .select("title price imageUrl description -_id")
    // .populate("userId");
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    console.log(err);
  }
};
