const { equal, deepEqual, deepStrictEqual } = require('assert');

const { 
  getHead,
  extractFiles,
  extractInputs,
  filterOptionAndCount,
  extractOptionAndCount,
  validateOption,
  isValidCount,
  head,
} = require('../src/library.js');

const readContent = function(file) {
  return file;
};

const existsSync = function(file) {
  return true;
};

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

    inputArgs = ['-a5','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['5','fileContent','file1Content'], option : 'a', count : 5 });

    inputArgs = ['-b','6','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['fileContent','file1Content'], option : 'b', count : 6 });
  });

  it('should return n count of lines when option is not given',function(){
    let inputArgs = ['fileContent','file1Content'];
    deepStrictEqual(extractInputs(inputArgs), { files : ['fileContent','file1Content'] , option : 'n',count : 10 });

  });

  it('should return and option n when only count is given',function(){
    let inputArgs = ['-2','file','file1','file2'];
    deepStrictEqual(extractInputs(inputArgs),{ files : ['file','file1','file2'], option : 'n', count : 2 });
  });

});

describe('filterOptionAndCount',function(){
  it('should return an empty array for the given options',function(){
    let options = ['n5','file'];
    deepStrictEqual(filterOptionAndCount(options),[]);
  });

  it('should return an array of option elements',function(){
    let options = ['-c5','file',23];
    deepStrictEqual(filterOptionAndCount(options),['-c5']);

    options = ['-c','8','file',23];
    deepStrictEqual(filterOptionAndCount(options),['-c','8']);
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
    let count = 0;
    let expectedOutput = { isValid : false, error_message : 'head: illegal line count -- ' + count};
    deepEqual(isValidCount(count),expectedOutput);
  });

  it('should return expectedOutput if option is -c',function(){
    let count = -2;
    let expectedOutput = { isValid : false, error_message : 'head: illegal byte count -- ' + count};
    deepEqual(isValidCount(count,'-c'),expectedOutput);
  });
});

describe('head',function(){
  describe('single inputArgs file',function(){
    it('should return 5 lines when the option is n and value of count is 5',function(){
      let inputArgs = { files : ['hello\n\nworld\ngoodbye\nhii'], option : 'n', count : 5 ,existsSync, readContent };
      deepStrictEqual(head(inputArgs),['hello\n\nworld\ngoodbye\nhii']);
    });

    it('should return 5 characters ,option is c(byte) and value of count is 5',function(){
      inputArgs = { files : ['hello\n\nworld\ngoodbye'], option : 'c', count : 5, existsSync, readContent };
      deepStrictEqual(head(inputArgs),['hello']);
    });
  });

  describe('mutliple inputArgs file',function(){ 
    it('should return max.10 lines if files has ,when the option and value of count is not given ',function(){
      inputArgs = { files : ['file.txt','file1.txt','file3.txt'], existsSync, readContent };
      deepStrictEqual(head(inputArgs),['==> file.txt <==\nfile.txt\n','==> file1.txt <==\nfile1.txt\n','==> file3.txt <==\nfile3.txt']);
    });
  });
});

describe('validateOption',function(){
  it('should return { isvalid : true, error_message : undefined } for -n and -c ',function(){
    let expectedOutput = { isValid : true, error_message : undefined };
    deepEqual(validateOption('-n'),expectedOutput);
    deepEqual(validateOption('-c'),expectedOutput);
  });

  it('should return { isvalid : false, error_message : some error message } for other than -n and -c ',function(){
    let expectedOutput = { isValid : false, 
      error_message : 'head: illegal option -- a\nusage: head [-n lines | -c bytes] [file ...]' };
    deepEqual(validateOption('-a'),expectedOutput);

    expectedOutput = { isValid : false, 
      error_message : 'head: illegal option -- s\nusage: head [-n lines | -c bytes] [file ...]' };
    deepEqual(validateOption('-s'),expectedOutput);
  });
});
