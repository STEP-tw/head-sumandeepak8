const fs = require('fs');
const { output } = require('./src/headLibrary.js');

const isExist = function(file) {
  return fs.existsSync(file);
}

const readFile = function(file) {
   return fs.readFileSync(file,'utf-8');
}

const main = function() {
  let input = process.argv;
  console.log(output(readFile, isExist, input));
}

main();

