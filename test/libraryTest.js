const {
  equal,
  deepEqual,
  deepStrictEqual
} = require('assert');

const {
  take,
  head,
  last,
  tail,
  createFileHeader,
  selectDelimiter,
  readFile,
  extractFileData,
  organizeCommandOutput,
} = require('../src/library.js');

const fileData = {
  file : 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl',
  file1 : '1\n2\n3\n4\n5\n',
  file2 : 'hello\nworld\njavascript\npython'
};

const readFileSync = function (file) {
  return fileData[file];
};

const existsSync = function (file) {
  return Object.keys(fileData).includes(file); 
};

const readContent = function (file) {
  return readFileSync(file);
};

describe('selectDelimiter', function () {
  it('should return empty string for c(byte) option ', function () {
    equal(selectDelimiter('c'), '');
  });

  it('should return "\n" string for n(lines) option ', function () {
    equal(selectDelimiter('n'), '\n');
  });
});

describe('createFileHeader', function () {
  it('should return the output like where filesLength is 2, ==> file.txt <== ', function () {
    let expectedOutput = "==> file.txt <==\n";
    equal(createFileHeader('file.txt', 2), expectedOutput);
  });
  it('should return the output like where filesLength is greater the 2, ==> file1.txt <== ', function () {
    let expectedOutput = '==> file1.txt <==\n';
    equal(createFileHeader('file1.txt', 2), expectedOutput);
  });
  it('should return an empty string if filesLength is less then 2', function () {
    deepEqual(createFileHeader('file', 1), '');
  })
});

describe('readFile', function () {
  it('should return the expectedOutput as fileoutput', function () {
    let expectedOutput = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl';
    equal(readFile(readFileSync, 'file'), expectedOutput);
  });
  it('should return the expectedOutput as file1output', function () {
    let expectedOutput = '1\n2\n3\n4\n5\n';
    equal(readFile(readFileSync, 'file1'), expectedOutput);
  });
});

describe('take', function () {
  let fileContent = "hello world\nyour welcome\ngood bye";
  let expectedOutput = "hello world";

  it('should return one line when option is n and count is 1', function () {
    deepEqual(take(fileContent, 'n', 1), expectedOutput);
  });

  it('should return two lines when option is n and count is 2', function () {
    expectedOutput = "hello world\nyour welcome";
    deepEqual(take(fileContent, 'n', 2), expectedOutput);
  });

  it('should return first 2 character of fileContent, when option is c and count is 2', function () {
    expectedOutput = 'he';
    deepEqual(take(fileContent, 'c', 2), expectedOutput);
  });

  it('should return first 7 character of fileContent, when option is c and count is 7', function () {
    expectedOutput = 'hello w';
    deepEqual(take(fileContent, 'c', 7), expectedOutput);
  });

});

describe('head', function () {
  describe('single inputArgs file', function () {
    it('should return 5 lines when the option is n and value of count is 5', function () {
      let inputArgs = {
        files: ['file'],
        option: 'n',
        count: 5,
        existsSync,
        readContent
      };
      let expectedOutput = ['a\nb\nc\nd\ne'];
      deepStrictEqual(head(inputArgs), expectedOutput);
    });
    it('should return 5 characters ,option is c(byte) and value of count is 5', function () {
      let inputArgs = {
        files: ['file'],
        option: 'c',
        count: 5,
        existsSync,
        readContent
      };
      deepStrictEqual(head(inputArgs), ['a\nb\nc']);
    });
  });

  describe('mutliple inputArgs file', function () {
    it('should return 1 line if files has', function () {
      let inputArgs = {
        files: ['file', 'file1', 'file2'],
        option: 'n',
        count: 1,
        existsSync,
        readContent
      };
      let expectedOutput = ['==> file <==\na\n', '==> file1 <==\n1\n', '==> file2 <==\nhello'];
      deepStrictEqual(head(inputArgs), expectedOutput);
    });
  });
});

describe('take', function () {
  it('should return two lines when option is n and count value is 2', function () {
    let fileContent = 'hello\nworld\nwelcome\n';
    let expectedOutput = 'hello\nworld';
    equal(take(fileContent, 'n', 2), expectedOutput);
  });
  it('should return first 7 characters when option is c and count value is 7', function () {
    let fileContent = 'hello\nworld\nwelcome\n';
    let expectedOutput = 'hello\nw';
    equal(take(fileContent, 'c', 7), expectedOutput);
  });
});

describe('last', function () {
  it('should return last two lines from the bottom of file, when option is n and count is 2', function () {
    let fileContent = 'hello\nworld\nwelcome';
    let expectedOutput = 'world\nwelcome';
    equal(last(fileContent, 'n', 2), expectedOutput);
  });
  it('should return last five characters, when option is c and count is 5', function () {
    let fileContent = 'hello\nworld\nwelcome';
    let expectedOutput = 'lcome';
    equal(last(fileContent, 'c', 5), expectedOutput);
  });
});

describe('tail', function () {
  it('should return last 1 line of single file when option is n and count is 1', function () {
    let input = {
      files: ['file'],
      option: 'n',
      count: 3,
      existsSync,
      readContent
    };
    let expectedOutput = ['j\nk\nl'];
    deepEqual(tail(input), expectedOutput);
  })
  it('should return last 1 line of all files when option is n and count is 1', function () {
    let input = {
      files: ['file', 'file1', 'file2'],
      option: 'n',
      count: 2,
      existsSync,
      readContent
    };
    let expectedOutput = ['==> file <==\nk\nl\n', '==> file1 <==\n5\n\n', '==> file2 <==\njavascript\npython'];
    deepEqual(tail(input), expectedOutput);
  });
  it('should return last 2 characters of single file when option is c and count is 2', function () {
    let input = {
      files: ['file'],
      option: 'c',
      count: 5,
      existsSync,
      readContent
    };
    deepEqual(tail(input), ['j\nk\nl']);
  })
  it('should return last 4 characters of multiple file when option is c and count is 4', function () {
    let input = {
      files: ['file', 'file1', 'file2'],
      option: 'n',
      count: 5,
      existsSync,
      readContent
    };
    let expectedOutput = ['==> file <==\nh\ni\nj\nk\nl\n', '==> file1 <==\n2\n3\n4\n5\n\n', '==> file2 <==\nhello\nworld\njavascript\npython']
    deepEqual(tail(input), expectedOutput);
  });
  it('should return one space line for  multiple file when option is c and count is 0', function () {
    let input = {
      files: ['file', 'file1', 'file2'],
      option: 'n',
      count: 0,
      existsSync,
      readContent
    };
    deepEqual(tail(input), '');
  });
});

describe('organizeCommandOutput', function () {
  it('should return an error message for invalid option a', function () {
  let inputArgs = ['-a', '12', 'file1', 'file2'];
  let command = 'head';
  let fs = { readFileSync, existsSync };
  let expectedOutput = `head: illegal option -- a\nusage: head [-n lines | -c bytes] [file ...]`;
  deepEqual(organizeCommandOutput(inputArgs, command, fs), expectedOutput);
  });
  it('should return file content for count 3 and option n',()=>{
    let inputArgs = ['-n', '3', 'file1', 'file2'];
    let command = 'head'; 
    let fs = { readFileSync, existsSync };
    let expectedOutput = `==> file1 <==\n1\n2\n3\n\n==> file2 <==\nhello\nworld\njavascript`;
    deepEqual(organizeCommandOutput(inputArgs, command, fs), expectedOutput);
  });
});

describe('extractFileData',function(){
  it('should return file content for existing file when option is n and count is 2 and command is head',function(){
  let inputArgs = { files : ['file'], existsSync, option : 'n', count : 2, readContent };
  deepEqual(extractFileData(inputArgs, take, 'head'),['a\nb']); 
  });
  it('should return error message for non existing file when option is n and count is 2 and command can be head or tail',function(){
    let inputArgs = { files : ['file.txt'], existsSync, option : 'n', count : 2, readContent };
    deepEqual(extractFileData(inputArgs, last, 'tail'),[ 'tail: file.txt: No such file or directory' ]); 
  });
});