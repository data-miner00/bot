// Source: https://app.pluralsight.com/library/courses/node-dot-js-introduction-node-dot-js-events-streams/table-of-contents
var http = require("http");

http
  .createServer(function (request, response) {
    response.writeHead(200);
    response.write("Hello as parameter");
    setTimeout(function () {
      response.write("I'm done");
      response.end();
    }, 5000);
  })
  .listen(8080);

console.log("Listening on port 8080");

/*
 JavaScript has certain characteristics that make it very different than other dynamic languages,
 namely that is has no concept of threads. Its model of concurrency is completely based around events.
 - Ryah Dahl
 */
// =========================================================================
// Another way of writing as event

var server = http.createServer().listen(8081);

server.on("request", function (request, response) {
  response.writeHead(200);
  response.write("Hello as event");
  setTimeout(function () {
    response.write("I'm done");
    response.end();
  }, 5000);
});

server.on("close", function () {
  console.log("Server shutting down");
});

// =====================================================================
// Readable stream

// Reading and writing directly
function readWriteHttpStreamWithChunks() {
  http
    .createServer(function (request, response) {
      response.writeHead(200);
      request.on("readable", function () {
        var chunk = null;
        while (null !== (chunk = request.read())) {
          console.log(chunk.toString());
          response.write(chunk);
        }
      });

      request.on("end", function () {
        response.end();
      });
    })
    .listen(8082);
}

function readWriteHttpStreamUsingPipe() {
  http
    .createServer(function (request, response) {
      response.writeHead(200);
      request.pipe(response);
    })
    .listen(8083);
}

// Uploads
// Streams works for different types
// Example of uploading file to a server storage
var fs = require("fs");
function uploadFileUsingPipe() {
  http
    .createServer(function (request, response) {
      var newFile = fs.createWriteStream("upload.jpg");
      request.pipe(newFile);

      request.on("end", function () {
        response.end("uploaded!");
      });
    })
    .listen(8084);
}

function uploadFileWithProgress() {
  http
    .createServer(function (request, response) {
      var newFile = fs.createWriteStream("image.png");
      var fileBytes = request.headers["content-length"];
      var uploadedBytes = 0;

      request.on("readable", function () {
        var chunk = null;
        while (null !== (chunk = request.read())) {
          uploadedBytes += chunk.length;
          var progress = (uploadedBytes / fileBytes) * 100;
          response.write("progress: " + parseInt(progress, 10) + "%\n");
        }
      });

      request.pipe(newFile);
    })
    .listen(8085);
}
