#!/usr/bin/env node
// const http = require("http");
// const fs = require("fs");
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "content-type": "text/html" });
//   fs.createReadStream("./Test/test.html").pipe(res);
// });
// server.listen(3001);
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Home Page");
  } else if (req.url === "/slow-page") {
    console.log("Slow Page");
    for (let i = 0; i < 6000000000; i++) {}
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Slow Page");
  }
});
server.listen(8000, () => {
  console.log("server is running");
});
