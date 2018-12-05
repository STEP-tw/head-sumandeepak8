const fs = require('fs');
const { head,
  extractInputs,
} = require('./src/headLibrary.js');

const readFile = function(file) {
  return fs.readFileSync(file,'utf8');
}

const main = function() {
  let input = process.argv.slice(2);
  let { filesContents, outputType, numbers  } = extractInputs(input);
  filesContents = filesContents.map(readFile);
  let extractedInput = { filesContents,outputType,numbers }
  return head(extractedInput).join('\n');
}


