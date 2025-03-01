const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");
console.log(uri);
const client = new MongoClient(uri);
const dbname = "node-course";
const connectToDatebase = async () => {
  try {
    await client.connect();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.log("Error connecting to the database: ", err);
  }
};
const main = async () => {
  try {
    await connectToDatebase();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
main();
