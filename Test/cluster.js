const cluster = require("cluster");
const http = require("http");
const OS = require("os");
console.log(OS.cpus().length);
if (cluster.isMaster) {
  console.log("Master Proces ", process.pid, " is running");
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker Proces ", process.pid, " started");
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
}
