const { equal, deepEqual, deepStrictEqual } = require('assert');

const { selectDelimiter, 
  getHead,
  filterOptions,
  extractFiles,
  extractInputs,
  head
} = require('../src/headLibrary.js');

describe('selectDelimiter',function(){

  it('should return empty string for c(byte) outputType ',function(){
    equal(selectDelimiter('c'),'');
  });

  it('should return "\n" string for n(lines) outputType ',function(){
    equal(selectDelimiter('n'),'\n');
  });

});

describe('getHead',function(){

  let fileContent = "hello world\nyour welcome\ngood bye";
  let expectedOutput = "hello world";

  it('should return expectedOutput',function(){
    deepEqual(getHead(fileContent,'n',1),expectedOutput);
  });

  it('should return expectedOutput as given below',function(){
    expectedOutput = "hello world\nyour welcome";
    deepEqual(getHead(fileContent,'n',2),expectedOutput);
  });

  it('should return first 2 character of fileContent',function(){
    expectedOutput ='he';
    deepEqual(getHead(fileContent,'c',2),expectedOutput);
  });

  it('should return first 7 character of fileContent',function(){
    expectedOutput = 'hello w';
    deepEqual(getHead(fileContent,'c',7),expectedOutput);
  });

});

describe('filterOptions',function(){

  it("should give only the elements which contains '-' or any number",function(){
    let a = ['-n','your welcome','hello world','12'];
    deepEqual(filterOptions(a),['-n','12']);
  });

});

describe('extractFiles',function(){

  it('should return the all files names in array ',function(){

    let input = ['-n','-c','welcome back','hii what is going on','hello world']
    deepEqual(extractFiles(input),['welcome back','hii what is going on','hello world']);

    input = ['-n','-c','-n5','5','good bye','take care']
    deepEqual(extractFiles(input),['good bye','take care']);

  });

});

describe('extractInputs',function(){

  it('should return object which contains two keys options and files',function(){
    input = ['-n','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(input),{ filesContents : ['fileContent','file1Content'], outputType : 'n', numbers : 5 });
  });

});

describe('head',function(){

  it('should return 5 lines when the outputType is n and value of numbers is 5',function(){
    input = { filesContents : ['hello\n\nworld\ngoodbye\nhii'], outputType : 'n', numbers : 5}
    deepStrictEqual(head(input),['hello\n\nworld\ngoodbye\nhii']);
  });

  it('should return 5 characters ,outputType is c(byte) and value of numbers is 5',function(){
    input = { filesContents : ['hello\n\nworld\ngoodbye'], outputType : 'c', numbers : 5}
    deepStrictEqual(head(input),['hello']);
  });

});

