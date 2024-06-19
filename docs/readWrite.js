var fs = require("fs");

function writeSlow() {
  var data = ["name,cost"];

  for (var i = 0; i < 1e8; i++) {
    data.push(`${i},1`);
  }

  fs.writeFileSync("outfile.csv", data.join("\n"));
}

async function writeStream() {
  var writeStream = fs.createWriteStream("out.csv");

  for (var i = 0; i < 1e8; i++) {
    var overWatermark = writeStream.write(`${i},1\n`);

    if (!overWatermark) {
      await new Promise((resolve) => {
        writeStream.once("drain", resolve);
      });
    }
  }

  writeStream.end();
}

function readSlow() {
  var file = fs.readFileSync("outfile.csv", "utf-8");
  var lines = file.trim("\n").split("\n");
  lines.shift();

  var sum = lines.reduce((acc, line) => {
    return acc + parseFloat(line.split(",")[1]);
  }, 0);

  return sum;
}

function readStream() {
  var readstream = fs.createReadStream("outfile.csv");
  var sum = 0;
  var unprocessed = "";

  readstream.on("data", (chunk) => {
    var chunkString = unprocessed + chunk.toString();
    unprocessed = "";

    var startIndex = 0;
    for (var ch = startIndex; ch < chunkString.length; ch++) {
      if (chunkString[ch] === "\n") {
        var line = chunkString.slice(startIndex, ch);
        var idx = line.indexOf(",");
        var cost = line.slice(idx + 1);
        sum += parseFloat(cost);
        startIndex = ch + 1;
      }

      if (chunkString[chunkString.length - 1] !== "\n") {
        unprocessed = chunkString.slice(startIndex);
      }
    }
  });

  readStream.on("end", () => {
    console.log("sum", sum);
  });
}
