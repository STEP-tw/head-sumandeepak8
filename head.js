const fs = require('fs');
const { output , extractInputs } = require('./src/headLibrary.js');

const readFile = function(file) {
  return fs.readFileSync(file,'utf-8');
}

const main = function() {
  let input = process.argv;
  console.log(output(readFile,input));
}

main();

