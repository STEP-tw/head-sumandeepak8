const { equal, deepEqual } = require('assert');

const { selectDelimiter , 
} = require('../src/headLibrary.js');


describe('Test for selectDelimiter function',function(){

  it('should return empty string for c(byte)  outputType ',function(){
    equal(selectDelimiter('c'),'');
  });

});
