const { deepEqual } = require('assert');

const { 
  validateOption,
  isValidCount,
} = require('../src/util.js');


describe('validateOption',function(){

  it('should return true for -n and -c',function(){
    deepEqual(validateOption('-n'),{ isValid : true,error_message : undefined });
    deepEqual(validateOption('-c'),{ isValid : true,error_message : undefined });
  });

  it('should return false value for input other than -n and -c',function(){
    deepEqual(validateOption('-s'),{ isValid : false, error_message : 'head: illegal option -- s\nusage: head [-n lines | -c bytes] [file ...]'});
    deepEqual(validateOption('-u'),{isValid : false, error_message : 'head: illegal option -- u\nusage: head [-n lines | -c bytes] [file ...]'});
  });

});

describe('isValidCount',function(){

  it('should show an error message on screen as expected output',function(){
    let number = 0;
    let expectedOutput = { isValid : false, error_message : 'head: illegal line count -- ' + number};
    deepEqual(isValidCount(number),expectedOutput);
  });

});
