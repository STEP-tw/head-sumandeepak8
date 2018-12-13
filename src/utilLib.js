const options = { '-n' : 'line', '-c' : 'byte' };

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

const errorMessageForMissingFile = function (file,partRef) {
  return partRef + ': ' + file + ': No such file or directory';
};

const errorMessageForOption = function(option) {
  return  'head: illegal option -- ' + option[1] +
    '\n' + 'usage: head [-n lines | -c bytes] [file ...]';
};

const errorMessageForLinesAndBytes = function(count,option,partRef) {
  return partRef + ': illegal '+ options[option] + ' count -- ' + count;
};


module.exports = {
  selectDelimiter,
  createFileHeader,
  readFile,
  errorMessageForMissingFile,
  errorMessageForOption,
  errorMessageForLinesAndBytes,
};
