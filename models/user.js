const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  resetToken: String,
  resetTokenExpiration: Date,
});
userSchema.methods.addToCart = async function (product) {
  try {
    //get the product index in the cart array if it exists
    const cartProductIndex = this.cart.items.findIndex((cartPro) => {
      return cartPro.productId.toString() === product._id.toString();
    });
    let newQty = 1;
    //get an array of products in the existing cart
    const updatedCartItems = [...this.cart.items];
    //if not -1 (not exist)
    if (cartProductIndex >= 0) {
      //increase the quantity of the product
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      //this means that it doesn't exist so we add the new product
      updatedCartItems.push({
        productId: product._id,
        quantity: newQty,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
  } catch (err) {
    console.log(err);
  }
};
userSchema.methods.deleteCartItem = async function (prodId) {
  //this will return a cart items array without the specified product in it
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== prodId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};
userSchema.methods.clearCart = async function () {
  this.cart = { items: [] };
  return this.save();
};
module.exports = mongoose.model("User", userSchema);

//!this is was for mongodb
// const getDB = require("../util/database").getDB;
// const mongodb = require("mongodb");
// const { get } = require("../routes/admin");
// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }
//   async save() {
//     try {
//       const db = getDB();
//       const user = await db.collection("users").insertOne(this);
//       return user;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   static async findById(userId) {
//     try {
//       const db = getDB();
//       const user = await db
//         .collection("users")
//         .findOne({ _id: new mongodb.ObjectId(userId) });
//       return user;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   async addToCart(product) {
// try {
//   const cartProductIndex = this.cart.items.findIndex((cartPro) => {
//     return cartPro.productId.toString() === product._id.toString();
//   });
//   let newQty = 1;
//   const updatedCartItems = [...this.cart.items];
//   if (cartProductIndex >= 0) {
//     newQty = this.cart.items[cartProductIndex].quantity + 1;
//     updatedCartItems[cartProductIndex].quantity = newQty;
//   } else {
//     updatedCartItems.push({
//       productId: new mongodb.ObjectId(product._id),
//       quantity: newQty,
//     });
//   }
//   const updatedCart = {
//     items: updatedCartItems,
//   };
//   const db = getDB();
//   let newCart = await db
//     .collection("users")
//     .updateOne(
//       { _id: new mongodb.ObjectId(this._id) },
//       { $set: { cart: updatedCart } }
//     );
//   return newCart;
// } catch (err) {
//   console.log(err);
// }
//   }
//   async getCart() {
//     try {
//       const db = getDB();
//       const productIds = this.cart.items.map((items) => {
//         return items.productId;
//       });
//       //ws
//       const cartProduct = await db
//         .collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray();
//       const products = cartProduct.map((prod) => {
//         return {
//           ...prod,
//           quantity: this.cart.items.find((item) => {
//             return item.productId.toString() === prod._id.toString();
//           }).quantity,
//         };
//       });
//       return products;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   async deleteCartItem(prodId) {
//     try {
//       const db = getDB();
//       const updatedCartItems = this.cart.items.filter((item) => {
//         return item.productId.toString() !== prodId.toString();
//       });
//       const newCart = db
//         .collection("users")
//         .updateOne(
//           { _id: new mongodb.ObjectId(this._id) },
//           { $set: { cart: { items: updatedCartItems } } }
//         );
//       return newCart;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   async addOrder() {
//     try {
//       const db = getDB();
//       let cartProducts = await this.getCart();
//       let order = {
//         items: cartProducts,
//         user: { _id: new mongodb.ObjectId(this._id), name: this.name },
//       };
//       const insertedOrder = await db.collection("orders").insertOne(order);
//       this.cart = { items: [] };
//       const updatedCart = await db
//         .collection("users")
//         .updateOne(
//           { _id: new mongodb.ObjectId(this._id) },
//           { $set: { cart: { items: [] } } }
//         );
//       return updatedCart;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   async getOrders() {
//     const db = getDB();
//     const orders = await db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray();
//     return orders;
//   }
// }
// module.exports = User;
