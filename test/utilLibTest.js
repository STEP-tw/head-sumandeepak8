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
  it('should return the output like, ==> file.txt <== ',function(){
    equal(createFileHeader('file.txt'),'==> file.txt <==');
  });
  it('should return the output like, ==> file1.txt <== ',function(){
    equal(createFileHeader('file1.txt'),'==> file1.txt <==');
  });
});

describe('readFile',function(){
  it('should return the expectedOutput',function(){
    let expectedOutput = 'fileoutput';
    equal(readFile(readFileSync,'file'),'fileoutput');
  });
  it('should return the expectedOutput',function(){
    let expectedOutput = 'file1output';
    equal(readFile(readFileSync,'file1'),'file1output');
  });
});

describe('errorMessageForMissingFile for head command',function(){
  it('should return error message when the given file is not found',function(){
    let partRef = 'head';
    let fileName = 'file.txt';
    equal(errorMessageForMissingFile('file.txt',partRef),('head: '+'file.txt'+': No such file or directory'));
  });
});

describe('errorMessageForMissingFile for tail command',function(){
  it('should return error message when the given file is not found',function(){
    let partRef = 'tail';
    let fileName = 'file1.txt';
    equal(errorMessageForMissingFile('file1.txt',partRef),('tail: '+'file1.txt'+': No such file or directory'));
  });
});

describe('errorMessageForOption',function(){
  it('should return an error message with an given option for head command',function(){
    let expectedOutput =  'head: illegal option -- ' + 'a' +
      '\n' + 'usage: head [-n lines | -c bytes] [file ...]';
    equal(errorMessageForOption('a','head'),expectedOutput);
  });

  it('should return an error message with an given option for tail command',function(){
    let expectedOutput =  'tail: illegal option -- ' + 'a' + '\n' +
     'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    equal(errorMessageForOption('a','tail'),expectedOutput);
  });
});

describe('errorMessageForLinesAndBytes',function(){
  it('should return an error message for line count less than 1',function(){
    equal(errorMessageForLinesAndBytes('-2','n','head'),'head: illegal line count -- -2');
  });
  it('should return an error message for invalid line count 3s',function(){
    equal(errorMessageForLinesAndBytes('3s','n','tail'),'tail: illegal offset -- 3s');
  });
  it('should return an error message for byte count less than 1',function(){
    equal(errorMessageForLinesAndBytes('-2','c','head'),'head: illegal byte count -- -2');
  });
  it('should return an error message for invalid byte count',function(){
    equal(errorMessageForLinesAndBytes('a','c','tail'),'tail: illegal offset -- a');
  });
});


