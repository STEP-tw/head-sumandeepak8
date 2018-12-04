const { equal, deepEqual } = require('assert');

const { selectDelimiter , 
  getRequiredData ,
  getHead,
} = require('../src/headLibrary.js');


describe('Test for selectDelimiter function',function(){

  it('should return empty string for c(byte)  outputType ',function(){
    equal(selectDelimiter('c'),'');
  });

  it('should return "\n" string for n(lines)  outputType ',function(){
    equal(selectDelimiter('n'),'\n');
  });

});


describe('Test for getRequiredData function',function(){

  it('should return 4 element of fileContent ',function(){
    let fileContent = ['h','e','l','m','e','t'];
    let expectedOutput = ['h','e','l','m'];
    deepEqual(getRequiredData(fileContent,4),expectedOutput);
  });

  it('should return 2 element of fileContent ',function(){

    let fileContent = ['hello world', 'your welcome','\n','good bye'];
    let expectedOutput = ['hello world','your welcome'];
    deepEqual(getRequiredData(fileContent,2),expectedOutput);

  });

});


describe('Test for getHead()',function(){

  let fileContent = "hello world\nyour welcome\ngood bye";
  let expectedOutput = "hello world";

  it('should return one line of fileContent',function(){
    deepEqual(getHead(fileContent,1,'n'),expectedOutput);
  });

  it('should return two line of fileContent',function(){
     expectedOutput = "hello world\nyour welcome";
    deepEqual(getHead(fileContent,2,'n'),expectedOutput);
  });

  it('should return one character of fileContent',function(){
     expectedOutput ='he';
    deepEqual(getHead(fileContent,2,'c'),expectedOutput);
  });

  it('should return 7 character of fileContent',function(){
     expectedOutput = 'hello w';
    deepEqual(getHead(fileContent,7,'c'),expectedOutput);
  });

});
