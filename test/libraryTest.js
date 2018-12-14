const { equal, deepEqual, deepStrictEqual } = require('assert');

const { 
  getHead,
  extractFiles,
  extractInputs,
  filterOptionAndCount,
  extractOptionAndCount,
  validateOption,
  validateCount,
  head,
  getTail,
} = require('../src/library.js');

const readContent = function(file) {
  return file;
};

const existsSync = function(file) {
  return true;
};

const selectDelimiter = function (option = 'n') {
  let delimiter = { n: '\n', c: '' };
  return delimiter[option];
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
  });

  it('should give return an array whose first element is n and second is 5',function(){
    inputArgs = ['-n5','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['n','5']);
  });

  it('should return first element as n and second -5',function(){
    inputArgs = ['-n','-5','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['n','-5']);
  });

  it('should return first element as c and second as 5',function(){
    inputArgs = ['-c5','file.txt','hello world','12'];
    deepEqual(extractOptionAndCount(inputArgs),['c','5']);
  });

  it('should return first element as c and second as 5 , even input is different than previous one',function(){
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
  });

  it('should return files from 3rd place to end if first element is a valid option and it does not count portion',function(){
    inputArgs = ['-n','file1','file2','file3.txt']
    deepEqual(extractFiles(inputArgs),['file2','file3.txt']);
  });

  it('should return all elements as file if it does not contain any valid option and count',function(){
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
  });
  it('should return as -n as option and -5 as count and an array of other elements as files',function(){
    inputArgs = ['-n','-5','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['fileContent','file1Content'], option : 'n', count : -5 });
  });
  it('should return -n as option and 5 as count and it should take 5 as a file',function(){
    inputArgs = ['-n5','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['5','fileContent','file1Content'], option : 'n', count : 5 });
  });
  it('should return -a as option and 5 as count ,from second element to last as files',function(){
    inputArgs = ['-a5','5','fileContent','file1Content']
    deepStrictEqual(extractInputs(inputArgs),{ files : ['5','fileContent','file1Content'], option : 'a', count : 5 });
  });
  it('should return -b as option and 6 as count and other elements as files',function(){
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
  });
  it('should return first two elements of options',function(){
    options = ['-c','8','file',23];
    deepStrictEqual(filterOptionAndCount(options),['-c','8']);
  });
});


describe('validateOption for head command',function(){
  it('should return object whose isValid contain true value and error_message as undefined for -n',function(){
    deepEqual(validateOption('-n','head'),{ isValid : true, error_message : undefined });
  });
  it('should return object whose isValid contain true value and error_message as undefined for -c',function(){
    deepEqual(validateOption('-c','head'),{ isValid : true, error_message : undefined });
  });
  it('should return object whose isValid key should contain false value and error_message should contain an error message for -s option',function(){
    deepEqual(validateOption('-s','head'),{ isValid : false, error_message : 'head: illegal option -- s\nusage: head [-n lines | -c bytes] [file ...]'});
  });
  it('should return object whose isValid key should contain false value and error_message should contain an error message for -u option',function(){
    deepEqual(validateOption('-u','head'),{isValid : false, error_message : 'head: illegal option -- u\nusage: head [-n lines | -c bytes] [file ...]'});
  });
});

describe('validateOption for tail command',function(){
  it('should return true value for isValid key and undefined error_message',function(){ 
    deepEqual(validateOption('-n','tail'),{ isValid : true, error_message : undefined}); 
  });
  it('should return true value for isValid and undefined message',function(){
    deepEqual(validateOption('-c','tail'),{ isValid : true, error_message : undefined});
  });
});

describe('validateCount for command head',function(){
  it('should show an error message on screen as expected output',function(){
    let expectedOutput = { isValid : { head : false, tail : true }, error_message : 'head: illegal line count -- ' + -2};
    deepEqual(validateCount(-2,'-n','head'),expectedOutput);
  });
  it('should return an error message for -5 count as expectedOutput',function(){
    expectedOutput = { isValid : { head : false, tail : true }, error_message : 'head: illegal byte count -- ' + -5};
    deepEqual(validateCount(-5,'-c','head'),expectedOutput);
  });
});

describe('validateCount for command tail',function(){
  it('should return expectedOutput if option is -c',function(){
    let expectedOutput = { isValid : { head : false, tail : false }, error_message : 'tail: illegal offset -- a' };
    deepEqual(validateCount('a','-n','tail'),expectedOutput);
  });
  it('should return the given expectedOutput as given below for -2a count',function(){
    expectedOutput = { isValid : { head : false, tail : false }, error_message : 'tail: illegal offset -- -2a'};
    deepEqual(validateCount('-2a','-c','tail'),expectedOutput);
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

describe('getHead',function(){
  it('should return the lines or characters based on option input',function(){
    let fileContent = 'hello\nworld\nwelcome\n';   
    let expectedOutput = 'hello\nworld';
    equal(getHead(fileContent,'n',2),expectedOutput);
  });
  it('should return first 7 characters includind \n',function(){
    let fileContent = 'hello\nworld\nwelcome\n';   
    let expectedOutput = 'hello\nworld';
    expectedOutput = 'hello\nw';
    equal(getHead(fileContent,'c',7),expectedOutput);
  });
});

describe('getTail',function(){
  it('should return last two lines from the bottom of file',function(){
    let fileContent = 'hello\nworld\nwelcome';
    let expectedOutput = 'world\nwelcome';
    equal(getTail(fileContent,'n',2),expectedOutput);
  });
  it('should return last five characters',function(){
    let fileContent = 'hello\nworld\nwelcome';
    let expectedOutput = 'world\nwelcome';
    expectedOutput = 'lcome';
    equal(getTail(fileContent,'c',5),expectedOutput);  
  });
});
