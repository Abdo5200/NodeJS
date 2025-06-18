const { query } = require("express");
const Product = require("../models/product");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
let errorCall = (err, next) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    product: { title: "", imageUrl: "", price: undefined, description: "" },
    hasError: false,
    editing: false,
    errorMessage: null,
    validationErrors: [],
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

exports.postAddProduct = async (req, res, next) => {
  try {
    //take the product details from request body
    const title = req.body.title;
    const imageUrl = req.file;
    const price = req.body.price;
    const description = req.body.description;
    console.log(imageUrl);
    //create a new product object from Product Schema
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("admin/edit-product", {
        path: "/admin/add-product",
        pageTitle: "Add Product",
        product: {
          title: title,
          imageUrl: imageUrl,
          price: price,
          description: description,
        },
        hasError: true,
        editing: false,
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      });
    }
    const product = new Product({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
      userId: req.user,
    });
    await product.save();
    console.log("Created Product");
    res.redirect("/admin/products");
  } catch (err) {
    errorCall(err, next);
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
      hasError: false,
      errorMessage: null,
      validationErrors: [],
      productId: prodId,
    });
  } catch (err) {
    errorCall(err, next);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Add Product",
        product: {
          title: updatedTitle,
          imageUrl: updatedImgUrl,
          price: updatedPrice,
          description: updatedDescription,
          _id: prodId,
        },
        hasError: true,
        editing: true,
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
        productId: prodId,
      });
    }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImgUrl;
    product.save();
    res.redirect("/admin/products");
  } catch (err) {
    errorCall(err, next);
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
    errorCall(err, next);
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
    errorCall(err, next);
  }
};
