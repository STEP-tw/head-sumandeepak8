const { equal, deepEqual } = require('assert');

const { selectDelimiter,
  createFileHeader,
  readFile,
  errorMessageForMissingFile,
  errorMessageForOption,
  errorMessageForLinesAndBytes,
} = require('../src/utilLib.js');


const readFileSync = function(file) {
  return (file + 'output');
}

describe('selectDelimiter',function(){
  it('should return empty string for c(byte) option ',function(){
    equal(selectDelimiter('c'),'');
  });

  it('should return "\n" string for n(lines) option ',function(){
    equal(selectDelimiter('n'),'\n');
  });
});

describe('createFileHeader',function(){
  it('should return the expected output',function(){
    equal(createFileHeader('file.txt'),'==> file.txt <==');
    equal(createFileHeader('file1.txt'),'==> file1.txt <==');
  });
});

describe('readFile',function(){
  it('should return the expectedOutput',function(){
    let expectedOutput = 'fileoutput';
    equal(readFile(readFileSync,'file'),'fileoutput');

    expectedOutput = 'file1output';
    equal(readFile(readFileSync,'file1'),'file1output');
  });
});

describe('errorMessageForMissingFile',function(){
  it('should return error message when the given file is not found',function(){
    let partRef = 'head';
    let fileName = 'file.txt';
    equal(errorMessageForMissingFile('file.txt',partRef),('head: '+'file.txt'+': No such file or directory'));

    partRef = 'tail';
    fileName = 'file1.txt';
    equal(errorMessageForMissingFile('file1.txt',partRef),('tail: '+'file1.txt'+': No such file or directory'));
  });
});

describe('errorMessageForOption',function(){
  it('should return an error message with an given option',function(){
    let expectedOutput =  'head: illegal option -- ' + 'a' +
      '\n' + 'usage: head [-n lines | -c bytes] [file ...]';
    equal(errorMessageForOption('-a'),expectedOutput);
  });
});

describe('errorMessageForLinesAndBytes',function(){
  it('should return an error message for count less than 1',function(){
    equal(errorMessageForLinesAndBytes(-2,'-n','head'),'head: illegal line count -- -2');
    equal(errorMessageForLinesAndBytes(0,'-n','tail'),'tail: illegal line count -- 0');

    equal(errorMessageForLinesAndBytes(-2,'-c','head'),'head: illegal byte count -- -2');
    equal(errorMessageForLinesAndBytes(0,'-c','tail'),'tail: illegal byte count -- 0');
  });
});

