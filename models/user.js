const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");
const { get } = require("../routes/admin");
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  async save() {
    try {
      const db = getDB();
      const user = await db.collection("users").insertOne(this);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  static async findById(userId) {
    try {
      const db = getDB();
      const user = await db
        .collection("users")
        .findOne({ _id: new mongodb.ObjectId(userId) });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async addToCart(product) {
    try {
      const cartProductIndex = this.cart.items.findIndex((cartPro) => {
        return cartPro.productId.toString() === product._id.toString();
      });
      let newQty = 1;
      const updatedCartItems = [...this.cart.items];
      if (cartProductIndex >= 0) {
        newQty = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQty;
      } else {
        updatedCartItems.push({
          productId: new mongodb.ObjectId(product._id),
          quantity: newQty,
        });
      }
      const updatedCart = {
        items: updatedCartItems,
      };
      const db = getDB();
      let newCart = await db
        .collection("users")
        .updateOne(
          { _id: new mongodb.ObjectId(this._id) },
          { $set: { cart: updatedCart } }
        );
      return newCart;
    } catch (err) {
      console.log(err);
    }
  }
  async getCart() {
    try {
      const db = getDB();
      const productIds = this.cart.items.map((items) => {
        return items.productId;
      });
      const cartProduct = await db
        .collection("products")
        .find({ _id: { $in: productIds } })
        .toArray();
      const products = cartProduct.map((prod) => {
        return {
          ...prod,
          quantity: this.cart.items.find((item) => {
            return item.productId.toString() === prod._id.toString();
          }).quantity,
        };
      });
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = User;
