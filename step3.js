const fs = require("fs");
const axios = require("axios");

function cat(path, printToFile, outFile) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    if (printToFile) {
      fs.writeFile(outFile, JSON.stringify(data) + "\n", function () {});
    } else {
      console.log(`file contents:${data}`);
    }
  });
}

async function webCat(URL, printToFile, outFile) {
  const result = await axios.get(URL);

  if (printToFile) {
    fs.writeFile(outFile, JSON.stringify(result.data) + "\n", function () {});
  } else {
    console.log(result);
  }
}

let fileOrUrl = process.argv[2];
let printToFile = process.argv[3];
let outFile = process.argv[4];

if (printToFile === "--out") {
  printToFile = true;
} else {
  printToFile = false;
}

if (fileOrUrl.includes("http") | fileOrUrl.includes("https")) {
  webCat(fileOrUrl, printToFile, outFile);
} else {
  cat(fileOrUrl, printToFile, outFile);
}

//cat(fileOrUrl);
