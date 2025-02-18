/** @param{express.Request} req */
const getDB = require("../util/database").getDB;
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  async save() {
    try {
      const db = getDB();
      const savedProduct = await db.collection("products").insertOne(this);
      console.log(savedProduct);
      return savedProduct;
    } catch (err) {
      console.log(err);
    }
  }
  static async fetchAll() {
    const db = getDB();
    const products = await db.collection("products").find().toArray();
    console.log(products);
    return products;
  }
}

module.exports = Product;
