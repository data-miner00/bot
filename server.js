var http = require("http");
var https = require("https");
var url = require("url");
var fs = require("fs");

var server = http.createServer();

// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -subj "/"
var httpsServer = https.createServer({
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
});
httpsServer.listen(443);

server.on("request", (request, response) => {
  console.log("this is an incoming request");
  http.STATUS_CODES[404];
  var parsedUrl = url.parse(request.url, true);
  if (request.method === "GET" && parsedUrl.pathname === "/metadata") {
    const { id } = parsedUrl.query;
    console.log(id);
    console.log(request.headers);
  }

  var body = [];
  request
    .on("data", (chunk) => {
      console.log("this is a chunk \n");
      console.log(chunk.toString());
      body.push(chunk);
    })
    .on("end", () => {
      var parsedJSON = JSON.parse(Buffer.concat(body));
      var username = parsedJSON[0]["userName"];
      // do something with info
    });
  response.write(JSON.stringify({ hello: "world" }));
  //   response.statusCode = 404;
  //   response.setHeader("X-Powered-By", "Node.js");
  response.writeHead(404, {
    "x-dns-prefetch-control": "helllo",
  });
  response.end("Ended!");

  // redirect to page
  fs.createReadStream("notfound.html").pipe(response);
});

server.listen(8080);
