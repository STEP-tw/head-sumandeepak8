const { deepEqual } = require('assert');

const { 
  isValidOption,
  isValidNumber,
} = require('../src/util.js');


describe('isValidOption',function(){

  it('should return true for -n and -c',function(){
    deepEqual(isValidOption('-n'),true);
    deepEqual(isValidOption('-c'),true);
  });

  it('should return false value for input other than -n and -c',function(){
    deepEqual(isValidOption('-s'),'head: illegal option -- s\nusage: head [-n lines | -c bytes] [file ...]');
    deepEqual(isValidOption('-u'),'head: illegal option -- u\nusage: head [-n lines | -c bytes] [file ...]');
  });

});

describe('isValidNumber',function(){

  it('should show an error message on screen as expected output',function(){
    let number = 0;
    let expectedOutput = 'head: illegal line count -- ' + number;
    deepEqual(isValidNumber(number),expectedOutput);
  });

});
