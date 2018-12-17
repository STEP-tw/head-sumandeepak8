const {
  equal,
  deepEqual,
  deepStrictEqual
} = require('assert');

const {
  take,
  head,
  last,
} = require('../src/library.js');

const readContent = function (file) {
  return file;
};

const existsSync = function (file) {
  return true;
};

describe('take', function () {
  let fileContent = "hello world\nyour welcome\ngood bye";
  let expectedOutput = "hello world";

  it('should return one line', function () {
    deepEqual(take(fileContent, 'n', 1), expectedOutput);
  });

  it('should return two lines', function () {
    expectedOutput = "hello world\nyour welcome";
    deepEqual(take(fileContent, 'n', 2), expectedOutput);
  });

  it('should return first 2 character of fileContent', function () {
    expectedOutput = 'he';
    deepEqual(take(fileContent, 'c', 2), expectedOutput);
  });

  it('should return first 7 character of fileContent', function () {
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
      inputArgs = {
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
      inputArgs = {
        files: ['file.txt', 'file1.txt', 'file3.txt'],
        existsSync,
        readContent
      };
      deepStrictEqual(head(inputArgs), ['==> file.txt <==\nfile.txt\n', '==> file1.txt <==\nfile1.txt\n', '==> file3.txt <==\nfile3.txt']);
    });
  });
});

describe('take', function () {
  it('should return the lines or characters based on option input', function () {
    let fileContent = 'hello\nworld\nwelcome\n';
    let expectedOutput = 'hello\nworld';
    equal(take(fileContent, 'n', 2), expectedOutput);
  });
  it('should return first 7 characters includind \n', function () {
    let fileContent = 'hello\nworld\nwelcome\n';
    let expectedOutput = 'hello\nw';
    equal(take(fileContent, 'c', 7), expectedOutput);
  });
});

describe('last', function () {
  it('should return last two lines from the bottom of file', function () {
    let fileContent = 'hello\nworld\nwelcome';
    let expectedOutput = 'world\nwelcome';
    equal(last(fileContent, 'n', 2), expectedOutput);
  });
  it('should return last five characters', function () {
    let fileContent = 'hello\nworld\nwelcome';
    let expectedOutput = 'lcome';
    equal(last(fileContent, 'c', 5), expectedOutput);
  });
});