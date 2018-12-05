const { deepEqual } = require('assert');

const { isOutputType,
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

