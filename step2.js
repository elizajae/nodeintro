const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`file contents:${data}`);
  });
}

async function webCat(URL) {
  const result = await axios.get(URL);
  console.log(result);
}

let fileOrUrl = process.argv[2];

if (fileOrUrl.includes("http") | fileOrUrl.includes("https")) {
  webCat(fileOrUrl);
} else {
  cat(fileOrUrl);
}

//cat(fileOrUrl);
