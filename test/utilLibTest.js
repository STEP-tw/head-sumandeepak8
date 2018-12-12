const { equal, deepEqual } = require('assert');

const { selectDelimiter,
  createFileHeader,
  readFile,
  errorMessageForFileInHead,
  errorMessageForFileInTail,
  errorMessageForOption,
  errorMessageForBytes,
  errorMessageForLines,
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

describe('errorMessageForFileInHead',function(){
  it('should return error message when the given file is not found',function(){
    equal(errorMessageForFileInHead('file.txt'),('head: '+'file.txt'+': No such file or directory'));
    equal(errorMessageForFileInHead('file1.txt'),('head: '+'file1.txt'+': No such file or directory'));
  });
});

describe('errorMessageForFileInTail',function(){
  it('should return error message when the given file is not found',function(){
    equal(errorMessageForFileInTail('file.txt'),('tail: '+'file.txt'+': No such file or directory'));
    equal(errorMessageForFileInTail('file1.txt'),('tail: '+'file1.txt'+': No such file or directory'));
  });
});

describe('errorMessageForOption',function(){
  it('should return an error message with an given option',function(){
    let expectedOutput =  'head: illegal option -- ' + 'a' +
      '\n' + 'usage: head [-n lines | -c bytes] [file ...]';
    equal(errorMessageForOption('-a'),expectedOutput);
  });
});

describe('errorMessageForLines',function(){
  it('should return an error message for count less than 1',function(){
    let expectedOutput = 'head: illegal line count -- ';
      equal(errorMessageForLines(-2),expectedOutput + -2);
      equal(errorMessageForLines(0),expectedOutput + 0);
  });
});

describe('errorMessageForBytes',function(){
  it('should return an error message for count less than 1',function(){
    let expectedOutput = 'head: illegal byte count -- ';
      equal(errorMessageForBytes(-2),expectedOutput + -2);
      equal(errorMessageForBytes(0),expectedOutput + 0);
  });
});
