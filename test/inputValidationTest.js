const {
    deepEqual
} = require('assert');

const {
    validateOption,
    validateCount,
} = require('../src/inputValidation.js');

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
        let expectedOutput =  {
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