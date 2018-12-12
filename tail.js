const fs = require('fs');
const { tailOutput } = require('./src/library.js');

const main = function() {
  let input = process.argv;
  console.log(tailOutput(fs, input));
};

main();

