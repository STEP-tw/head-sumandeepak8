const { deepEqual } = require('assert');

const { 
  isOutputType,
  isValidNumber,
} = require('../src/util.js');


describe('isOutputType',function(){

  it('should return true for -n and -c',function(){
    deepEqual(isOutputType('-n'),true);
    deepEqual(isOutputType('-c'),true);
  });

  it('should return false value for input other than -n and -c',function(){
    deepEqual(isOutputType('-s'),'head: illegal option -- s\nusage: head [-n lines | -c bytes] [file ...]');
    deepEqual(isOutputType('-u'),'head: illegal option -- u\nusage: head [-n lines | -c bytes] [file ...]');
  });

});

describe('isValidNumber',function(){

  it('should show an error message on screen as expected output',function(){
    let number = 0;
    let expectedOutput = 'head: illegal line count -- ' + number;
    deepEqual(isValidNumber(number),expectedOutput);
  });

});
