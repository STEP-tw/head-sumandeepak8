const { equal, deepEqual, deepStrictEqual } = require('assert');

const { selectDelimiter, 
  getHead,
  extractOptionAndCount,
  extractFiles,
  extractInputs,
  head,
  filterOptionAndCount,
  validateOption,
  isValidCount
} = require('../src/headLibrary.js');

describe('selectDelimiter',function(){
  it('should return empty string for c(byte) option ',function(){
    equal(selectDelimiter('c'),'');
  });

  it('should return "\n" string for n(lines) option ',function(){
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

describe('extractOptionAndCount',function(){

  it("should return max. first two element if it includes, where second element should be inputArgsnumber - ",function(){
    let inputArgs = ['-n','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['n','file.txt']);

    inputArgs = ['-n5','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['n','5']);

    inputArgs = ['-n','-5','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['n','-5']);

    inputArgs = ['-c5','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['c','5']);

    inputArgs = ['-c','5','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['c','5']);
  });

  it('should return the default values of option and count when it is not given',function(){
    inputArgs = ['file','file1'];
    deepStrictEqual(extractOptionAndCount(inputArgs),['n',10]);
  });

});

describe('extractFiles',function(){
  it('should return inputArgs elements from index 2 if option is given',function(){
    let inputArgs = ['-n','-c','file1','file2','file3.txt']
    deepEqual(extractFiles(inputArgs),['file1','file2','file3.txt']);

    inputArgs = ['-n','file1','file2','file3.txt']
    deepEqual(extractFiles(inputArgs),['file2','file3.txt']);

    inputArgs = ['file1','file2','file3.txt']
    deepEqual(extractFiles(inputArgs),['file1','file2','file3.txt']);
  });

  it('should return elements from index 1 of inputArgs if the first element is valid option and it also includes count  in it',function(){
    let inputArgs = ['-n7','-n5','5','file.txt','file4.js']
    deepEqual(extractFiles(inputArgs),['-n5','5','file.txt','file4.js']);
  });
  
  it('should return the files if options are not given in inputArgs',function(){
    let inputArgs = ['file.txt','file4.js']
    deepEqual(extractFiles(inputArgs),['file.txt','file4.js']);
  });

  it('should return the files if count is given whereas option is not given',function(){
    let inputArgs = ['-12','file.txt','file4.js']
    deepEqual(extractFiles(inputArgs),['file.txt','file4.js']);
  });

});

describe('extractInputs',function(){
  it('should return object which contains two keys options and files',function(){
    let inputArgs = ['-n','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['fileContent','file1Content'], option : 'n', count : 5 });

    inputArgs = ['-n','-5','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['fileContent','file1Content'], option : 'n', count : -5 });

    inputArgs = ['-n5','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['5','fileContent','file1Content'], option : 'n', count : 5 });
  });

  it('should return n count of lines when option is not given',function(){
    let inputArgs = ['fileContent','file1Content'];
    deepStrictEqual(extractInputs(inputArgs), { files : ['fileContent','file1Content'] , option : 'n',count : 10 } );
  });

  it('should return and option n when only count is given',function(){
    let inputArgs = ['-2','file','file1','file2'];
    deepStrictEqual(extractInputs(inputArgs),{ files : ['file','file1','file2'], option : 'n', count : 2 });
  });

});

describe('head',function(){

  describe('single inputArgs file',function(){
    it('should return 5 lines when the option is n and value of count is 5',function(){
      inputArgs = { filesContents : ['hello\n\nworld\ngoodbye\nhii'], option : 'n', count : 5}
      deepStrictEqual(head(inputArgs),['hello\n\nworld\ngoodbye\nhii']);
    });

    it('should return 5 characters ,option is c(byte) and value of count is 5',function(){
      inputArgs = { filesContents : ['hello\n\nworld\ngoodbye'], option : 'c', count : 5}
      deepStrictEqual(head(inputArgs),['hello']);
    });
  });

  describe('mutliple inputArgs file',function(){ 
    it('should return max.10 lines if files has ,when the option and value of count is not given ',function(){
      inputArgs = { filesContents : ['hello\n\nworld','welcome\nback\ngood\nbye\again'],filesName : ['file1','file2']};
      deepStrictEqual(head(inputArgs),['==> file1 <==\nhello\n\n\world\n','==> file2 <==\nwelcome\nback\ngood\nbye\again']);
    });
  });

});

describe('filterOptionAndCount',function(){
  it('should return an array of option elements',function(){
    let parameters = { options : ['n5','file'], validOptions : [48,49,50,51,52,53,54,55,56,57,99,110] }
    deepStrictEqual(filterOptionAndCount(parameters),[]);
  });
});


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
