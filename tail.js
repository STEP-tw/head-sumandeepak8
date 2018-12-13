const fs = require('fs');
const { output } = require('./src/library.js');

const main = function() {
  let input = process.argv.slice(2);
  console.log(output(input, fs, 'tail'));
};

main();
