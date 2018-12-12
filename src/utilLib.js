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

const errorMessageForFileInHead = function (file) {
  return 'head: ' + file + ': No such file or directory';
};

const errorMessageForFileInTail = function (file) {
  return 'tail: ' + file + ': No such file or directory';
};

const errorMessageForOption = function(option) {
  return  'head: illegal option -- ' + option[1] +
    '\n' + 'usage: head [-n lines | -c bytes] [file ...]';
};

const errorMessageForBytes = function(count){
  return 'head: illegal byte count -- ' + count;
};

const errorMessageForLines = function(count) {
  return 'head: illegal line count -- ' + count;
};


module.exports = {
  selectDelimiter,
  createFileHeader,
  readFile,
  errorMessageForFileInTail,
  errorMessageForFileInHead,
  errorMessageForOption,
  errorMessageForBytes,
  errorMessageForLines,
};
