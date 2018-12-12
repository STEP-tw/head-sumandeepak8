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


module.exports = {
  selectDelimiter,
  createFileHeader,
  readFile,
  errorMessageForFileInTail,
  errorMessageForFileInHead,
};
