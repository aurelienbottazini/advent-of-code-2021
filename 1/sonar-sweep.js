const R = require("ramda");
const fs = require("fs");

function readFileLines(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.split("\n"));
      }
    });
  });
}

// readFileLines('./1/example1.txt')
readFileLines("./1/input.txt")
  .then(R.map(R.trim))
  .then(R.filter(R.identity))
  .then(R.map(Number))
  // .then((x) => R.zip(x, R.drop(1, x)))
  .then(R.aperture(2))
  .then(R.map((a) => a[0] < a[1]))
  .then(R.filter(R.equals(true)))
  .then(R.length)
  .then(R.tap(console.log));

// readFileLines("./1/example1.txt")
readFileLines("./1/input.txt")
  .then(R.map(R.trim))
  .then(R.filter(R.identity))
  .then(R.map(Number))
  .then(R.aperture(3))
  .then(R.map(R.sum))
  .then(R.aperture(2))
  .then(R.map((a) => a[0] < a[1]))
  .then(R.filter(R.equals(true)))
  .then(R.length)
  .then(R.tap(console.log));
