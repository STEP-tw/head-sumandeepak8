const fs = require('fs');
const { headOutput } = require('./src/library.js');

const main = function() {
  let input = process.argv.slice(2);
  console.log(headOutput(fs, input));
};

main();

