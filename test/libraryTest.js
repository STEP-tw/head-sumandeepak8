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
} = require('../src/library.js');

const existsSync = function (file) {
  return true;
};

const readFileSync = function (file) {
  return (file + 'output');
};

const readContent = function (file) {
  return file;
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
        files: ['hello\n\nworld\ngoodbye\nhii'],
        option: 'n',
        count: 5,
        existsSync,
        readContent
      };
      let expectedOutput = ['hello\n\nworld\ngoodbye\nhii'];
      deepStrictEqual(head(inputArgs), expectedOutput);
    });
    it('should return 5 characters ,option is c(byte) and value of count is 5', function () {
      let inputArgs = {
        files: ['hello\n\nworld\ngoodbye'],
        option: 'c',
        count: 5,
        existsSync,
        readContent
      };
      deepStrictEqual(head(inputArgs), ['hello']);
    });
  });

  describe('mutliple inputArgs file', function () {
    it('should return max.10 lines if files has ,when the option and value of count is not given ', function () {
      let inputArgs = {
        files: ['file.txt', 'file1.txt', 'file3.txt'],
        existsSync,
        readContent
      };
      let expectedOutput = ['==> file.txt <==\nfile.txt\n', '==> file1.txt <==\nfile1.txt\n', '==> file3.txt <==\nfile3.txt'];
      deepStrictEqual(head(inputArgs),expectedOutput);
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