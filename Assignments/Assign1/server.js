const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Greetings!</title></head>");
    res.write("<body><h1>Hello and welcome</h1></body>");
    res.write(
      '<form action = "/create-user" method = "POST"><input type = "text" name = "Username">'
    );
    res.write('<button type = "submit">Send</button>');
    res.write("</form>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users list</title></head>");
    res.write("<body><ul><li>User1</li><li>User2</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      console.log(chunck);
      body.push(chunck);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(parsedBody.split("=")[0]); //will be the name of the input field in the form <input name = "theName">
      console.log(message); // the actual data submitted in the input field
    });
    res.statusCode = 302;
    res.setHeader("Location", "/"); //|>redirecting to page localhost:3000/
    res.end();
  }
});
server.listen(3000);
