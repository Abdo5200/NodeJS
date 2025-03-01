const http = require("http");
const { Worker } = require("worker_threads");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Home Page");
  } else if (req.url === "/slow-page") {
    const worker = new Worker("./Worker-thread.js");
    worker.on("message", (j) => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end(`Slow Page ${j}`);
    });
  }
});
server.listen(8000, () => {
  console.log("server is running");
});
