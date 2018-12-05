const { equal, deepEqual } = require('assert');

const { selectDelimiter , 
  getHead,
 filterOptions,
  extractFiles,
} = require('../src/headLibrary.js');


describe('Test for selectDelimiter function',function(){

  it('should return empty string for c(byte)  outputType ',function(){
    equal(selectDelimiter('c'),'');
  });

  it('should return "\n" string for n(lines)  outputType ',function(){
    equal(selectDelimiter('n'),'\n');
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

  it('should return  character of fileContent',function(){
     expectedOutput = 'hello w';
    deepEqual(getHead(fileContent,7,'c'),expectedOutput);
  });

});


describe('Test for filterOptions() ',function(){

  it("should give only the elements which contains '-' or any number",function(){
    let a = ['-n','file','file1','12'];
    deepEqual(filterOptions(a),['-n','12']);
  });

});

describe('Test for extractFiles () ',function(){

  it('should return the all files names in array ',function(){
    let input = ['-n','-c','file1','file','file.txt']
    deepEqual(extractFiles(input),['file1','file','file.txt']);

    input = ['-n','-c','-n5','5','file1','file.txt']
    deepEqual(extractFiles(input),['file1','file.txt']);
  });

});

