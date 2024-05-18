var http = require("http");

var request = http.request({ hostname: "www.google.com" }, (response) => {
  console.log(`status code: ${response.statusCode}`);
  console.log(`headers: ${response.headers}`);

  response.on("data", (chunk) => {
    console.log("This is a chunk: \n");
    console.log(chunk.toString());
  });
});

request.on("error", (err) => {
  console.error(error);
});

request.end();

var postOption = {
  hostname: "www.google.com",
  port: 443,
  path: "/search",
  method: "POST",
  headers: {
    "X-Forwarded-For": "192.168.1.1",
    "Content-Type": "application/json",
    Authorization:
      "Basic " + Buffer.from("usename" + ":" + "password").toString("base64"),
  },
};

var postRequest = http.request(postOption, (response) => {
  console.log(response.statusCode);
});

postRequest.write(JSON.stringify({ hello: "world" }));
postRequest.end();
