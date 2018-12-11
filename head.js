const fs = require('fs');
const { output } = require('./src/headLibrary.js');

const main = function() {
  let input = process.argv.slice(2);
  console.log(output(fs, input));
};

main();

