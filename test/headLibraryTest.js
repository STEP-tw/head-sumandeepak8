const { equal, deepEqual, deepStrictEqual } = require('assert');

const { selectDelimiter, 
  getHead,
  getOptions,
  extractFiles,
  extractInputs,
  head,
  filterOptions
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

describe('getOptions',function(){

  it("should return max. first two element if it includes, where second element should be inputnumber - ",function(){
    let input = ['-n','file.txt','hello world','12'];
    deepEqual(getOptions(input),['n','file.txt']);

    input = ['-n5','file.txt','hello world','12'];
    deepEqual(getOptions(input),['n','5']);

    input = ['-n','-5','file.txt','hello world','12'];
    deepEqual(getOptions(input),['n','-5']);

    input = ['-c5','file.txt','hello world','12'];
    deepEqual(getOptions(input),['c','5']);

    input = ['-c','5','file.txt','hello world','12'];
    deepEqual(getOptions(input),['c','5']);
  });

  it('should return the default values of option and count when it is not given',function(){
    input = ['file','file1'];
    deepStrictEqual(getOptions(input),['n',10]);
  });

});

describe('extractFiles',function(){
  it('should return input elements from index 2 if option is given',function(){
    let input = ['-n','-c','file1','file2','file3.txt']
    deepEqual(extractFiles(input),['file1','file2','file3.txt']);

    input = ['-n','file1','file2','file3.txt']
    deepEqual(extractFiles(input),['file2','file3.txt']);

    input = ['file1','file2','file3.txt']
    deepEqual(extractFiles(input),['file1','file2','file3.txt']);
  });

  it('should return elements from index 1 of input if the first element is valid option and it also includes count  in it',function(){
    let input = ['-n7','-n5','5','file.txt','file4.js']
    deepEqual(extractFiles(input),['-n5','5','file.txt','file4.js']);
  });
  
  it('should return the files if options are not given in input',function(){
    let input = ['file.txt','file4.js']
    deepEqual(extractFiles(input),['file.txt','file4.js']);
  });

  it('should return the files if count is given whereas option is not given',function(){
    let input = ['-12','file.txt','file4.js']
    deepEqual(extractFiles(input),['file.txt','file4.js']);
  });

});

describe('extractInputs',function(){
  it('should return object which contains two keys options and files',function(){
    let input = ['-n','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(input),{ filesContents : ['fileContent','file1Content'], outputType : 'n', number : 5 });

    input = ['-n','-5','fileContent','file1Content']
    deepStrictEqual(extractInputs(input),{ filesContents : ['fileContent','file1Content'], outputType : 'n', number : -5 });

    input = ['-n5','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(input),{ filesContents : ['5','fileContent','file1Content'], outputType : 'n', number : 5 });
  });

  it('should return n number of lines when option is not given',function(){
    let input = ['fileContent','file1Content'];
    deepStrictEqual(extractInputs(input), { filesContents : ['fileContent','file1Content'] , outputType : 'n',number : 10 } );
  });

  it('should return and option n when only count is given',function(){
    let input = ['-2','file','file1','file2'];
    deepStrictEqual(extractInputs(input),{ filesContents : ['file','file1','file2'], outputType : 'n', number : 2 });
  });

});

describe('head',function(){

  describe('single input file',function(){
    it('should return 5 lines when the outputType is n and value of number is 5',function(){
      input = { filesContents : ['hello\n\nworld\ngoodbye\nhii'], outputType : 'n', number : 5}
      deepStrictEqual(head(input),['hello\n\nworld\ngoodbye\nhii']);
    });

    it('should return 5 characters ,outputType is c(byte) and value of number is 5',function(){
      input = { filesContents : ['hello\n\nworld\ngoodbye'], outputType : 'c', number : 5}
      deepStrictEqual(head(input),['hello']);
    });
  });

  describe('mutliple input file',function(){ 
    it('should return max.10 lines if files has ,when the outputType and value of number is not given ',function(){
      input = { filesContents : ['hello\n\nworld','welcome\nback\ngood\nbye\again'],fileNames : ['file1','file2']};
      deepStrictEqual(head(input),['==> file1 <==\nhello\n\n\world\n','==> file2 <==\nwelcome\nback\ngood\nbye\again']);
    });
  });

});

describe('filterOptions',function(){
  it('should return an array of outputType elements',function(){
    let parameters = { options : ['n5','file'], validCode : [48,49,50,51,52,53,54,55,56,57,99,110] }
    deepStrictEqual(filterOptions(parameters),[]);
  });
});

