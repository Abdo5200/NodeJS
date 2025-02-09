const cart = require("./cart");
const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,price,description,imageUrl) VALUES(? ,? ,? ,? )",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }
  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }
  static findById(id) {
    return db.execute("select * from products where products.id = ?", [id]);
  }
};
