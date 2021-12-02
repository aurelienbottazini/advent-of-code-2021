const R = require("ramda");
const fs = require('fs')

const data = R.pipe(
  R.trim,
  R.split('\n'),
  R.map(R.split(' ')),
  R.map(R.adjust(1, Number)),
)(fs.readFileSync('./input.txt', 'utf8'))

const part1 = R.pipe(
  R.groupBy(R.head),
  R.map(R.pluck(1)),
  R.map(R.sum),
  R.tap(console.log)
)(data)

const depth = R.pathOr(0, ['down'], part1) - R.pathOr(0, ['up'], part1)

console.log('Depth ', depth);
console.log('Result ', depth * R.pathOr(0, ['forward'], part1))

console.log(data);
const part2 = R.reduce(
  (acc, cur) => {
    const move = cur[0];
    const val = cur[1];
    if(move === 'down') {
      return R.assoc('aim', acc['aim'] + val, acc);
    }
    if(move === 'up') {
      return R.assoc('aim', acc['aim'] - val, acc);
    }
    if(move === 'forward') {
      return R.pipe(
       R.assoc('position', acc['position'] + val),
       R.assoc('depth', acc['depth'] + acc['aim'] * val),
      )(acc)
    }

    return acc;
  },
  { aim: 0, position: 0, depth: 0 }
)(data)

console.log(part2['position'] * part2['depth']);
