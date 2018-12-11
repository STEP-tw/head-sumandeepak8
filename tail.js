const fs = require('fs');
const { tailOutput } = require('./src/headLibrary.js');

const main = function() {
  let input = process.argv.slice(2);
  console.log(tailOutput(fs, input));
};

main();

