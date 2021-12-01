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
  })
    .then(R.map(R.trim))
    .then(R.map(Number));
}

const part1 = R.pipe(
  R.aperture(2),
  R.map(R.apply(R.lt)),
  R.filter(R.equals(true)),
  R.length,
  R.tap(console.log)
);

readFileLines("./1/input.txt").then(part1);
readFileLines("./1/input.txt").then(R.pipe(R.aperture(3), R.map(R.sum), part1));
