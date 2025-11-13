const http = require("http");
const fs = require("fs");
const server = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  if (req.url === "/") {
    res.write("Welcome to Node.js by using HTTP web server");
  } else if (req.url === "/about") {
    res.write("Created using Node.js");
  }
    else if(req.url=== "/rfile"){
        fs.readFile("indexPromise.js","utf8",(error,data)=>{
            if (error){
                console.log(error)
            }
            else{
                res.write(`<pre>${data}</pre>`);
            }
        })
        return;
    }
 else {
    res.write("Page not found!");
  }

  res.end();
};

http.createServer(server).listen(3000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Running on port http://localhost:3000");
  }
});
