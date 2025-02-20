const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");
class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
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
}
module.exports = User;
