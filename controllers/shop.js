const { CURSOR_FLAGS } = require("mongodb");
const Product = require("../models/product");
// const Order = require("../models/order");
const express = require("express");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = async (req, res, next) => {
  //? we can use findAll to return an array of products that meets some criteria
  //? but in this case it will return one item
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       //product is an array with one object with a unique id and we want to return one object so [0]
  //       product: products[0],
  //       pageTitle: products[0].pageTitle,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));
  //!this is using sequelize and mysql
  // try {
  //   const product = await Product.findByPk(prodId);
  // res.render("shop/product-detail", {
  //   //product is an array with one object with a unique id and we want to return one object so [0]
  //   product: product,
  //   pageTitle: product.pageTitle,
  //   path: "/products",
  // });
  // } catch (err) {
  //   console.log(err);
  // }
  //*this is with mongo
  try {
    const product = await Product.fetchProduct(prodId);
    res.render("shop/product-detail", {
      //product is an array with one object with a unique id and we want to return one object so [0]
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (err) {
    console.log(err);
  }
};
// exports.getCart = async (req, res, next) => {
//   try {
//     const cart = await req.user.getCart();
//     const products = await cart.getProducts();
//     res.render("shop/cart", {
//       path: "/cart",
//       pageTitle: "Your Cart",
//       products: products,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.postCart = async (req, res, next) => {
//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQty = 1;
//   try {
//     fetchedCart = await req.user.getCart();
//     const products = await fetchedCart.getProducts({ where: { id: prodId } });
//     let product;
//     if (products.length > 0) product = products[0];
//     if (product) {
//       product = products[0];
//       let oldQty = product.cartItem.quantity;
//       newQty = oldQty + 1;
//     } else product = await Product.findByPk(prodId);
//     await fetchedCart.addProduct(product, { through: { quantity: newQty } });
//     res.redirect("/cart");
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.postCartDelteItem = async (req, res, next) => {
//   const prodId = req.body.productId;
//   try {
//     const cart = await req.user.getCart();
//     const products = await cart.getProducts({ where: { id: prodId } });
//     const product = products[0];
//     await product.cartItem.destroy();
//     res.redirect("/cart");
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.postOrder = async (req, res, next) => {
//   try {
//     const cart = await req.user.getCart();
//     let fetchedCart = cart;
//     const products = await cart.getProducts();
//     const order = await req.user.createOrder();
//     await order.addProducts(
//       products.map((product) => {
//         product.orderItemn = { quantity: product.cartItem.quantity };
//         return product;
//       })
//     );
//     await fetchedCart.setProducts(null);
//     res.redirect("/orders");
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.getOrders = async (req, res, next) => {
//   try {
//     const orders = await req.user.getOrders({ include: ["products"] });
//     res.render("shop/orders", {
//       path: "/orders",
//       pageTitle: "Your Orders",
//       orders: orders,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
