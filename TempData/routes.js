const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  //if the url is localhost:3000/ this if will be true
  if (url === "/") {
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Enter a Message</title>");
    res.write("</head>");
    res.write("<body>");
    res.write('<form action = "/message" method = "POST">');
    res.write('<input type = "text" name = "message">');
    res.write('<button type = "submit">Submit</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  //after submitting the data the link will be localhost:3000/message and will enter this if
  if (url === "/message" && method === "POST") {
    const body = [];
    //on reciving the data will add the chunks to the body arr
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    //after the data finishes we will add it to the buffer and it will be 'message = somedata'
    //take the data and write it to text file
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //writeFile is asyncronys and takes a callback to excute after finishing
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        //we redirecting to the same input page
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  //if the link neither '/' not '/message' this will excute
  res.setHeader("content-Type", "text/html");
  res.write(
    "<html><head><title>My first Page</title></head><body><h1>Hello from Node js server</h1></body></html>"
  );
  res.end();
};
//?we export the function to be visible to another files
//we can use this as object and package them as one
module.exports = {
  handler: requestHandler,
  hardText: "hello Gentlemen",
};

//?or we can assigns the object separatly
// module.exports.handler = requestHandler;
// module.exports.hardText = "hello mfs";

//?we can also remove the module keyword
// exports.handler = requestHandler;
// exports.hardText = "hello mfs";
