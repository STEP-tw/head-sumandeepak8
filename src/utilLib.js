const options = { 'n' : 'line', 'c' : 'byte' };

const createFileHeader = function (fileName) {
    return '==> ' + fileName + ' <==';
};

const selectDelimiter = function (option = 'n') {
    let delimiter = { n: '\n', c: '' };
    return delimiter[option];
};

const readFile = function (readFileSync, file) {
    return readFileSync(file, 'utf-8');
};

const errorMessageForMissingFile = function (file,context) {
  return context + ': ' + file + ': No such file or directory';
};

const errorMessageForOption = function(option ,context) {
  let messages = { head : 'head: illegal option -- '+ option + '\n' 
    + 'usage: head [-n lines | -c bytes] [file ...]',
    tail : 'tail: illegal option -- '+ option + '\n' 
    + 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]' 
  };
 return messages[context];
};

const errorMessageForLinesAndBytes = function(count,option,context) {
  let messages = { head : 'head: illegal ' + options[option] + ' count -- ' + count,
    tail : 'tail: illegal offset -- ' + count };
  return messages[context];
};


module.exports = {
  selectDelimiter,
  createFileHeader,
  readFile,
  errorMessageForMissingFile,
  errorMessageForOption,
  errorMessageForLinesAndBytes,
};
