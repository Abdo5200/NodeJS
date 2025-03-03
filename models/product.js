const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    rquired: true,
  },
  price: {
    type: Number,
    rquired: true,
  },
  description: {
    type: String,
    rquired: true,
  },
  imageUrl: {
    type: String,
    rquired: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema);
// const mongodb = require("mongodb");

// /** @param{express.Request} req */
// const getDB = require("../util/database").getDB;
// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }
//   async save() {
//     try {
//       const db = getDB();
//       let savedProduct;
//       if (this._id) {
//         //update
//         savedProduct = await db
//           .collection("products")
//           .updateOne({ _id: this._id }, { $set: this });
//       } else {
//         //create
//         savedProduct = await db.collection("products").insertOne(this);
//       }
//       return savedProduct;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   static async fetchAll() {
//     const db = getDB();
//     const products = await db.collection("products").find().toArray();
//     // console.log(products);
//     return products;
//   }
//   static async fetchProduct(prodId) {
//     try {
//       const db = getDB();
//       const product = await db
//         .collection("products")
//         .find({ _id: new mongodb.ObjectId(prodId) })
//         .next();
//       return product;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   static async deleteById(prodId) {
//     try {
//       const db = getDB();
//       const product = await db
//         .collection("products")
//         .deleteOne({ _id: new mongodb.ObjectId(prodId) });
//       console.log("Deleted");
//       return product;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// module.exports = Product;
