const {
    equal,
    deepEqual
} = require('assert');

const {
    validateOption,
    validateCount,
    errorMessageForMissingFile,
    errorMessageForLinesAndBytes,
    errorMessageForOption,
} = require('../src/inputValidation.js');


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

describe('validateOption for head command', function () {
    it('should return object whose isValid contain true value and error_message as undefined for n', function () {
        let expectedOutput = {
            isValid: true,
            error_message: undefined
        };
        deepEqual(validateOption('n', 'head'), expectedOutput);
    });
    it('should return object whose isValid contain true value and error_message as undefined for c', function () {
        let expectedOutput = {
            isValid: true,
            error_message: undefined
        };
        deepEqual(validateOption('c', 'head'), expectedOutput);
    });
    it('should return object whose isValid key should contain false value and error_message should contain an error message for s option', function () {
        let expectedOutput = {
            isValid: false,
            error_message: 'head: illegal option -- s\nusage: head [-n lines | -c bytes] [file ...]'
        };
        deepEqual(validateOption('s', 'head'), expectedOutput);
    });
    it('should return object whose isValid key should contain false value and error_message should contain an error message for u option', function () {
        let expectedOutput = {
            isValid: false,
            error_message: 'head: illegal option -- u\nusage: head [-n lines | -c bytes] [file ...]'
        };
        deepEqual(validateOption('u', 'head'), expectedOutput);
    });
});

describe('validateOption for tail command', function () {
    it('should return true value for isValid key and undefined error_message', function () {
        let expectedOutput = {
            isValid: true,
            error_message: undefined
        };
        deepEqual(validateOption('n', 'tail'), expectedOutput);
    });
    it('should return true value for isValid and undefined message', function () {
        let expectedOutput = {
            isValid: true,
            error_message: undefined
        };
        deepEqual(validateOption('c', 'tail'), expectedOutput);
    });
});

describe('validateCount for command head', function () {
    it('should show an error message on screen as expected output', function () {
        let expectedOutput = {
            isValid: {
                head: false,
                tail: true
            },
            error_message: 'head: illegal line count -- ' + -2
        };
        deepEqual(validateCount(-2, 'n', 'head'), expectedOutput);
    });
    it('should return an error message for -5 count as expectedOutput', function () {
        let expectedOutput = {
            isValid: {
                head: false,
                tail: true
            },
            error_message: 'head: illegal byte count -- ' + -5
        };
        deepEqual(validateCount(-5, 'c', 'head'), expectedOutput);
    });
});

describe('validateCount for command tail', function () {
    it('should return expectedOutput if option is -c', function () {
        let expectedOutput = {
            isValid: {
                head: false,
                tail: false
            },
            error_message: 'tail: illegal offset -- a'
        };
        deepEqual(validateCount('a', '-n', 'tail'), expectedOutput);
    });
    it('should return the given expectedOutput as given below for -2a count', function () {
        let expectedOutput = {
            isValid: {
                head: false,
                tail: false
            },
            error_message: 'tail: illegal offset -- -2a'
        };
        deepEqual(validateCount('-2a', '-c', 'tail'), expectedOutput);
    });
});