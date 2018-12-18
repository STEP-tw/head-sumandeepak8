const { equal } = require('assert');

const {
  selectDelimiter,
  createFileHeader,
  readFile,
  errorMessageForMissingFile,
  errorMessageForOption,
  errorMessageForLinesAndBytes,
} = require('../src/utilLib.js');


const readFileSync = function (file) {
  return (file + 'output');
}

describe('selectDelimiter', function () {
  it('should return empty string for c(byte) option ', function () {
    equal(selectDelimiter('c'), '');
  });

  it('should return "\n" string for n(lines) option ', function () {
    equal(selectDelimiter('n'), '\n');
  });
});

describe('createFileHeader', function () {
  it('should return the output like, ==> file.txt <== ', function () {
    let expectedOutput = "==> file.txt <==";
    equal(createFileHeader('file.txt'), expectedOutput);
  });
  it('should return the output like, ==> file1.txt <== ', function () {
    let expectedOutput = '==> file1.txt <==';
    equal(createFileHeader('file1.txt'), expectedOutput);
  });
});

describe('readFile', function () {
  it('should return the expectedOutput as fileoutput', function () {
    let expectedOutput = 'fileoutput';
    equal(readFile(readFileSync, 'file'), expectedOutput);
  });
  it('should return the expectedOutput as file1output', function () {
    let expectedOutput = 'file1output';
    equal(readFile(readFileSync, 'file1'), expectedOutput);
  });
});

describe('errorMessageForMissingFile for head command', function () {
  it('should return error message when the given file is not found', function () {
    let context = 'head';
    let fileName = 'file.txt';
    let expectedOutput = `head: ${fileName}: No such file or directory`;

    equal(errorMessageForMissingFile(fileName, context), expectedOutput);
  });
});

describe('errorMessageForMissingFile for tail command', function () {
  it('should return error message when the given file is not found', function () {
    let context = 'tail';
    let fileName = 'file1.txt';
    let expectedOutput = `tail: ${fileName}: No such file or directory`;

    equal(errorMessageForMissingFile(fileName, context), expectedOutput);
  });
});

describe('errorMessageForOption', function () {
  it('should return an error message with an given option for head command', function () {
    let expectedOutput = `head: illegal option -- a\nusage: head [-n lines | -c bytes] [file ...]`;
    equal(errorMessageForOption('a', 'head'), expectedOutput);
  });

  it('should return an error message when option is a, for tail command', function () {
    let expectedOutput = `tail: illegal option -- a\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
    equal(errorMessageForOption('a', 'tail'), expectedOutput);
  });
});

describe('errorMessageForLinesAndBytes', function () {
  it('should return an error message for line count less than 1', function () {
    let expectedOutput = 'head: illegal line count -- -2';
    equal(errorMessageForLinesAndBytes('-2', 'n', 'head'), expectedOutput);
  });
  it('should return an error message for invalid line count 3s', function () {
   let expectedOutput = 'tail: illegal offset -- 3s';
     equal(errorMessageForLinesAndBytes('3s', 'n', 'tail'), expectedOutput);
  });
  it('should return an error message for byte count less than 1', function () {
   let expectedOutput = 'head: illegal byte count -- -2';
    equal(errorMessageForLinesAndBytes('-2', 'c', 'head'), expectedOutput);
  });
  it('should return an error message for invalid byte count', function () {
    let expectedOutput = 'tail: illegal offset -- a';
    equal(errorMessageForLinesAndBytes('a', 'c', 'tail'), expectedOutput);
  });
});