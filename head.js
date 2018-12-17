const fs = require('fs');
const { organizeCommandOutput } = require('./src/library.js');

const main = function() {
  let input = process.argv.slice(2);
  console.log(organizeCommandOutput(input, fs, 'head'));
};

main();
