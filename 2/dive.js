const R = require("ramda");
const fs = require('fs')

// const data = fs.readFileSync('./example.txt', 'utf8')
const data = fs.readFileSync('./input.txt', 'utf8')
const transformed = R.pipe(
  R.trim,
  R.split('\n'),
  R.map(R.split(' ')),
  R.groupBy(R.head),
  R.map(R.pluck(1)),
  R.map(R.map(Number)),
  R.map(R.sum),
  R.tap(console.log)
)(data)

const depth = R.pathOr(0, ['down'], transformed) - R.pathOr(0, ['up'], transformed)

console.log('Depth ', depth);
console.log('Result ', depth * R.pathOr(0, ['forward'], transformed))
