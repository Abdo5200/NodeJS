const { query } = require("express");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
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
exports.getEditProduct = async (req, res, next) => {
  const editMode = Boolean(req.query.edit);
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);
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

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  try {
    const product = await Product.findByIdAndUpdate(prodId, {
      title: updatedTitle,
      price: updatedPrice,
      description: updatedDescription,
      imageUrl: updatedImgUrl,
    });
    // updatedProduct.save();
    console.log("Updated Product");
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(prodId);
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
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
