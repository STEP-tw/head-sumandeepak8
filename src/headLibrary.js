const { validateOption, isValidCount } = require('../src/util.js');

const createFileHeader = function(fileName) {
  let header = '==> '+fileName+' <==';
  return header;
}

const selectDelimiter = function(option = 'n') {
  let delimiter = { n:'\n', c:'',} ;
  return delimiter[option] ;
}

const getHead = function(file, option, count = 10) {
  let delimiter = selectDelimiter(option) ;
  return  file.split(delimiter).slice(0, count).join(delimiter); 
}

const head = function(extractedInput) {
  let { filesContents, option, count, filesName } = extractedInput;
  return  filesContents.map( (file, index)=>{
    if(filesContents.length > 1){
      let result = createFileHeader(filesName.shift()) + '\n' 
        + getHead(file, option, count);
      if(index < filesContents.length-1)
        result = result + '\n';
      return result;
    }
    return getHead(file, option, count);
  });
}

const filterOptionAndCount = function(parameters) {
  let { options, validOptions, onlyOption } = parameters;

  return options.filter(function(element, index){
    let result = options[0].includes('-') &&  
      validOptions.includes( options[0][1] )
    if(result && index == 1 && 
      (options[0].length > 2 || !onlyOption.includes(options[0][1])))
      result = false;
    return result;
  });

}

const extractOptions = function(inputArgs) {
  let options = inputArgs.slice(0,2);
  let validOptions = ['0','1','2','3','4','5','6','7','8','9','n','c'];
  let onlyOption = ['n','c'];
  let parameters = {options, validOptions, onlyOption};
  return filterOptionAndCount(parameters);
}

const extractFiles = function(inputArgs) {
  return inputArgs.slice( extractOptions(inputArgs).length );
}

const extractOptionAndCount = function(inputArgs) {
  let output = extractOptions(inputArgs);
  if(output[0] != undefined && output[0][1] != 'n' && output[0][1] != 'c'){
    output[1] = output[0].slice(1);
    output[0] = '-n';
  }

  if(output[0] == undefined){
    output[0] = '-n';
    output[1] = 10;
  }

  output[0] = output[0].slice(1);
  let length = output[0].length;

  if(length > 1){
    output[1] = output[0].slice(1);
    output[0] = output[0][0];
  }

  return output;
}

const extractInputs = function(inputArgs) {
  let options  = extractOptionAndCount(inputArgs);
  let option = options[0];
  let count = +options[1];
  let files = extractFiles(inputArgs); 
  return {files, option, count};
}

const output = function(readFile,inputArgs) {
  let { files, option, count } =
    extractInputs(inputArgs.slice(2));

  let filesName = files.slice();
  let filesContents = files.map(readFile);

  let extractedInput = { filesContents, option, count, filesName };
  return head(extractedInput).join('\n');
}






module.exports = {
  selectDelimiter,
  getHead,
  extractOptionAndCount,
  extractFiles,
  extractInputs,
  head,
  createFileHeader,
  output,
  filterOptionAndCount
}
