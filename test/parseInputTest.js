const {
    extractOptionAndCount,
    extractFiles,
    filterOptionAndCount,
    parseInput,
    parseCount,
    isOnlyOption,
    isOnlyCount,
    isOptionWithCount,
} = require('../src/parseInput.js');

const {
    deepEqual,
    deepStrictEqual
} = require('assert');

describe('extractOptionAndCount', function () {

    it("should return maximum first two element if first element includes - and its length is equals to 2", function () {
        let inputArgs = ['-n', 'file.txt', 'hello world', '12'];
        deepEqual(extractOptionAndCount(inputArgs), ['n', 'file.txt']);
    });

    it('should return an array whose first element is n and second is 5', function () {
        let inputArgs = ['-n5', 'file.txt', 'hello world', '12'];
        deepEqual(extractOptionAndCount(inputArgs), ['n', '5']);
    });

    it('should return first element as n and second -5', function () {
        let inputArgs = ['-n', '-5', 'file.txt', 'hello world', '12'];
        deepEqual(extractOptionAndCount(inputArgs), ['n', '-5']);
    });

    it('should return first element as c and second as 5', function () {
        let inputArgs = ['-c5', 'file.txt', 'hello world', '12'];
        deepEqual(extractOptionAndCount(inputArgs), ['c', '5']);
    });

    it('should return first element as c and second as 5', function () {
        let inputArgs = ['-c', '5', 'file.txt', 'hello world', '12'];
        deepEqual(extractOptionAndCount(inputArgs), ['c', '5']);
    });

    it('should return the default values of option and count when it is not given', function () {
        let inputArgs = ['file', 'file1'];
        deepStrictEqual(extractOptionAndCount(inputArgs), ['n', '10']);
    });

});

describe('extractFiles', function () {
    it('should return inputArgs elements from index 2 if only option is given as first element', function () {
        let inputArgs = ['-n', '-c', 'file1', 'file2', 'file3.txt'];
        let expectedOutput = ['file1', 'file2', 'file3.txt'];
        deepEqual(extractFiles(inputArgs), expectedOutput);
    });

    it('should return files from 3rd place to end if first element is a valid option and it does not count portion', function () {
        let inputArgs = ['-n', 'file1', 'file2', 'file3.txt']
        let expectedOutput = ['file2', 'file3.txt'];
        deepEqual(extractFiles(inputArgs), expectedOutput);
    });

    it('should return all elements as file if it does not contain any valid option and count', function () {
        let inputArgs = ['file1', 'file2', 'file3.txt'];
        let expectedOutput = ['file1', 'file2', 'file3.txt'];
        deepEqual(extractFiles(inputArgs), expectedOutput);
    });

    it('should return elements from index 1 of inputArgs if the first element is valid option and it also includes count  in it', function () {
        let inputArgs = ['-n7', '-n5', '5', 'file.txt', 'file4.js'];
        let expectedOutput = ['-n5', '5', 'file.txt', 'file4.js'];
        deepEqual(extractFiles(inputArgs), expectedOutput);
    });

    it('should return all elements if options are not given in inputArgs', function () {
        let inputArgs = ['file.txt', 'file4.js'];
        let expectedOutput = ['file.txt', 'file4.js'];
        deepEqual(extractFiles(inputArgs), expectedOutput);
    });

    it('should return the files if count is given whereas option is not given', function () {
        let inputArgs = ['-12', 'file.txt', 'file4.js']
        let expectedOutput = ['file.txt', 'file4.js'];
        deepEqual(extractFiles(inputArgs), expectedOutput);
    });

});

describe('parseInput', function () {
    it('should return object which contains two keys options and files', function () {
        let inputArgs = ['-n', '5', 'fileContent', 'file1Content'];
        let expectedOutput = {
            files: ['fileContent', 'file1Content'],
            option: 'n',
            count: '5'
        };
        deepStrictEqual(parseInput(inputArgs), expectedOutput);
    });
    it('should return as -n as option and -5 as count and an array of other elements as files', function () {
        let inputArgs = ['-n', '-5', 'fileContent', 'file1Content'];
        let expectedOutput = {
            files: ['fileContent', 'file1Content'],
            option: 'n',
            count: '-5'
        };
        deepStrictEqual(parseInput(inputArgs), expectedOutput);
    });
    it('should return -n as option and 5 as count and it should take 5 as a file', function () {
        let inputArgs = ['-n5', '5', 'fileContent', 'file1Content'];
        let expectedOutput = {
            files: ['5', 'fileContent', 'file1Content'],
            option: 'n',
            count: '5'
        };
        deepStrictEqual(parseInput(inputArgs), expectedOutput);
    });
    it('should return -a as option and 5 as count ,from second element to last as files', function () {
        let inputArgs = ['-a5', '5', 'fileContent', 'file1Content'];
        let expectedOutput = {
            files: ['5', 'fileContent', 'file1Content'],
            option: 'a',
            count: '5'
        };
        deepStrictEqual(parseInput(inputArgs), expectedOutput);
    });
    it('should return -b as option and 6 as count and other elements as files', function () {
        let inputArgs = ['-b', '6', 'fileContent', 'file1Content'];
        let expectedOutput = {
            files: ['fileContent', 'file1Content'],
            option: 'b',
            count: '6'
        };
        deepStrictEqual(parseInput(inputArgs), expectedOutput);
    });
    it('should return n count of lines when option is not given and count as a number not a string', function () {
        let inputArgs = ['fileContent', 'file1Content'];
        let expectedOutput = {
            files: ['fileContent', 'file1Content'],
            option: 'n',
            count: '10'
        };
        deepStrictEqual(parseInput(inputArgs), expectedOutput);
    });
    it('should return all elements from 1 index when only count is given', function () {
        let inputArgs = ['-2', 'file', 'file1', 'file2'];
        let expectedOutput = {
            files: ['file', 'file1', 'file2'],
            option: 'n',
            count: '2'
        };
        deepStrictEqual(parseInput(inputArgs), expectedOutput);
    });
});

describe('filterOptionAndCount', function () {
    it('should return an empty array, when option is not given', () => {
        let options = ['n5', 'file'];
        deepStrictEqual(filterOptionAndCount(options), []);
    });
    it('should return an array of option elements when option is given', () => {
        let options = ['-c5', 'file'];
        deepStrictEqual(filterOptionAndCount(options), ['-c5']);
    });
    it('should return first two elements of options when first element is option and second is count', () => {
        let options = ['-c', '8'];
        deepStrictEqual(filterOptionAndCount(options), ['-c', '8']);
    });
});

describe('parseCount', function () {
    it('should return same count value for command head where count is 4', function () {
        let count = 4;
        let command = 'head';
        let expectedOutput = 4;
        deepEqual(parseCount(count, command), expectedOutput);
    });
    it('should return absolute count even the given count is -3 for command tail', () => {
        let count = -3;
        let command = 'tail';
        let expectedOutput = 3;
        deepEqual(parseCount(count, command), expectedOutput);
    })
});

describe('isOnlyOption', function () {
    it('should return true when inputArgs is n', function () {
        deepEqual(isOnlyOption('n'), true);
    });
    it('should return false when inputArgs is a3', function () {
        deepEqual(isOnlyOption('a3'), false);
    });
    it('should return false when inputArgs is 3c', function () {
        deepEqual(isOnlyOption('3c'), false);
    });
});

describe('isOnlyCount', function () {
    it('should return true when inputArgs is 34 ', function () {
        deepEqual(isOnlyCount('34'), true);
    });
    it('should return false when inputArgs is 4n ', function () {
        deepEqual(isOnlyCount('4n'), true);
    });
    it('should return false when inputArgs is n', function () {
        deepEqual(isOnlyCount('n'), false);
    });
});

describe('isOptionWithCount', function () {
    it('should return true for inputArgs n3 ', function () {
        deepEqual(isOptionWithCount('n3'), true);
    });
    it('should return false for inputArgs 4', function () {
        deepEqual(isOptionWithCount('4'), false);
    });
    it('should return false for inputArgs c', function () {
        deepEqual(isOptionWithCount('c'), false);
    });
    it('should return false for inputArgs 8n', function () {
        deepEqual(isOptionWithCount('8n'), false);
    });
});