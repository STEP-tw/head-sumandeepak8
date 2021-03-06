const {
    equal,
    deepEqual
} = require('assert');

const {
    validateOption,
    validateCount,
    isValidCount,
    errorMessageForMissingFile,
    errorMessageForLinesAndBytes,
    errorMessageForOption,
    validateCountAndOption,
    optionErrorMessage,
    countErrorMessage,
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
    it('should return  undefined error_message for n', function () {
        let expectedOutput = {
          isValid : true,  
          message : undefined
        };
        deepEqual(validateOption('n', 'head'), expectedOutput);
    });
    it('should return  undefined error_message for c', function () {
        let expectedOutput = {
            isValid : true,  
            message : undefined
          };
        deepEqual(validateOption('c', 'head'), expectedOutput);
    });
    it('should return an error message for s option', function () {
        let expectedOutput = {
            isValid : false,
            message : 'head: illegal option -- s\nusage: head [-n lines | -c bytes] [file ...]'
        };
        deepEqual(validateOption('s', 'head'), expectedOutput);
    });
    it('should return error message for illegal u option', function () {
        let expectedOutput = { isValid : false, 
            message : 'head: illegal option -- u\nusage: head [-n lines | -c bytes] [file ...]'
        };
        deepEqual(validateOption('u', 'head'), expectedOutput);
    });
});

describe('validateOption for tail command', function () {
    it('should return undefined error_message when option is n and command is tail', function () {
        let expectedOutput = { 
            isValid : true,
            message : undefined
        };
        deepEqual(validateOption('n', 'tail'), expectedOutput);
    });
    it('should return undefined error message when option is c and command is tail', function () {
        let expectedOutput = {
            isValid : true,
            message : undefined
        };
        deepEqual(validateOption('c', 'tail'), expectedOutput);
    });
});

describe('validateCount for command head', function () {
    it('should show an error message on screen as expected output', function () {
        let expectedOutput = {
            isValid : false,
            message : `head: illegal line count -- -2`
        };
        deepEqual(validateCount(-2, 'n', 'head'), expectedOutput);
    });
    it('should return an error message for -5 count as expectedOutput', function () {
        let expectedOutput ={ 
            isValid : false,
            message : `head: illegal byte count -- -5`
        };
        deepEqual(validateCount(-5, 'c', 'head'), expectedOutput);
    });
});

describe('validateCount for command tail', function () {
    it('should return expectedOutput if option is -c', function () {
        let expectedOutput = { 
            isValid : false,
            message : 'tail: illegal offset -- a'
        };
        deepEqual(validateCount('a', '-n', 'tail'), expectedOutput);
    });
    it('should return the given expectedOutput as given below for -2a count', function () {
        let expectedOutput = {
             isValid : false, 
             message : 'tail: illegal offset -- -2a'
            };
        deepEqual(validateCount('-2a', '-c', 'tail'), expectedOutput);
    });
});

describe('isValidCount', function () {
    it('should return true, when command is head and count is 2', function () {
        equal(isValidCount(2, 'head'), true);
    });
    it('should return false when count is 0 and command is head', function () {
        equal(isValidCount(0, 'head'), false);
    });
    it('should return true when count is 5 and command is tail', function () {
        equal(isValidCount(5, 'tail'), true);
    });
    it('should return true when count is negative value like -1 and command is tail', function () {
        equal(isValidCount(-1, 'tail'), true);
    });
    it('should return false for any non-numeric count value and command is head', function () {
        equal(isValidCount('s', 'head'), false);
    });
    it('should return false for any non numeric count when command is tail', function () {
        equal(isValidCount('p', 'tail'), false);
    });
});

describe('validateCountAndOption', function () {
    describe('for count only',()=>{
    it("should return true for input ['-n','3','file'] where command is head", function () {
        let input = ['-n', '3'];
        equal(validateCountAndOption(input, 'head'), true);
    });
    it("should return true for input ['-c','-2']", function () {
        let input = ['-c', '-2'];
        equal(validateCountAndOption(input, 'tail'), true);
    });
    it("should return error message for input ['-c','0']", function () {
        let input = ['-c', '0'];
        let expectedOutput = 'head: illegal byte count -- 0';
        equal(validateCountAndOption(input, 'head'), expectedOutput);
    });
    it("should return true for input ['-n','0']", function () {
        let input = ['-n', '12'];
        equal(validateCountAndOption(input, 'tail'), true);
    });
    it("should return error message for input ['-c','5a']", function () {
        let input = ['-c', '5a'];
        let expectedOutput = 'tail: illegal offset -- 5a';
        equal(validateCountAndOption(input, 'tail'), expectedOutput);
    });
   });
   describe('for option only',function(){
   it('should return an error message for invalid option for head command and given option is a',function(){
       let input = ['-a', '5a'];
       let expectedOutput = `head: illegal option -- a\nusage: head [-n lines | -c bytes] [file ...]`;
        equal(validateCountAndOption(input, 'head'),expectedOutput); 
    });
   });
   it('should return error message when command is tail and option is b',()=>{
       let input = ['-b', '12'];
       let expectedOutput = `tail: illegal option -- b\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`; 
       equal(validateCountAndOption(input,'tail'),expectedOutput);    
    });
});
describe('optionErrorMessage',function(){
    it('should return an undefined error for option n when command is head',function(){
        equal(optionErrorMessage('true', 'n', 'head'), undefined);
    });
    it('should return undefined for option c when command is tail',function(){
        equal(optionErrorMessage('true', 'c', 'tail'), undefined);
    });
    it('should return an error message for option n when value of first arguement is false',function(){
        let expectedOutput = 'head: illegal option -- n\nusage: head [-n lines | -c bytes] [file ...]';
        equal(optionErrorMessage('false', 'n', 'head'),expectedOutput);
    });
});

describe('countErrorMessage',function(){
    it('should return an undefined error for option n when first input arguement is true, command is head',function(){
        equal(countErrorMessage('true', 2, 'n', 'head'), undefined);
    });
    it('should return an error message, first args is false and second is 0 where command is head',function(){
        let expectedOutput = 'head: illegal line count -- 0';
        equal(countErrorMessage('false', 0, 'n', 'head'),expectedOutput);
    });
    it('should return undefined error for option n or c when first args is true and second is 0 for tail command',function(){
        equal(countErrorMessage('true', 0, 'c', 'tail'),undefined);
    });
});