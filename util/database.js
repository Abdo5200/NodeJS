const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-course",
  password: "AmdRyzen32200g",
});

module.exports = pool.promise();
