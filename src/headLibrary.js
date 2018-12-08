const { isOutputType, isValidNumber } = require('../src/util.js');

const createFileHeader = function(fileName) {
  let header = '==> '+fileName+' <==';
  return header;
}

const selectDelimiter = function(outputType = 'n') {
  let delimiter = { n:'\n', c:'',} ;
  return delimiter[outputType] ;
}

const getHead = function(file,outputType,number = 10) {
  let delimiter = selectDelimiter(outputType) ;
  return  file.split(delimiter).slice(0,number).join(delimiter) ; 
}

const head = function(extractedInput) {
  let {filesContents, outputType, number,fileNames} = extractedInput;
  return  filesContents.map((file,index)=>{
    if(filesContents.length > 1){
      let result = createFileHeader(fileNames.shift()) + '\n' 
        + getHead(file,outputType,number);
      if(index < filesContents.length-1)
        result = result + '\n';
      return result;
    }
    return getHead(file,outputType,number);
  });
}

const filterOptions = function(parameters) {
  let {options,validOptions,onlyOption} = parameters;

  return options.filter(function(element,index){
    let result = options[0].includes('-') &&  
      validOptions.includes(options[0][1])
    if(result && index == 1 && 
      (options[0].length > 2 || !onlyOption.includes(options[0][1])))
      result = false;
    return result;
  });

}

const extractOptions = function(input) {
  let options = input.slice(0,2);
  let validOptions = ['0','1','2','3','4','5','6','7','8','9','n','c'];
  let onlyOption = ['n','c'];
  let parameters = {options,validOptions,onlyOption};
  return filterOptions(parameters);
}

const extractFiles = function(input) {
  let options = extractOptions(input);
  let length = options.length;

  if(options[0] != undefined && options[0][1] != 'n' && options[0][1] != 'c'){
    options[1] = options[0].slice(1);
    options[0] = '-n';
  }

  return input.slice(length);
}

const getOptions = function(input) {
  let output = extractOptions(input);
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

const extractInputs = function(input) {
  let options  = getOptions(input) ;
  let outputType = options[0];
  let number = +options[1];
  let filesContents = extractFiles(input) ;
  return {filesContents, outputType, number} ;
}

const output = function(readFile,input) {
  let { filesContents, outputType, number } =
    extractInputs(input.slice(2));

  let parsedInput =  extractInputs(input.slice(2));
  let result = validateInput(parsedInput);

  if(result != true){
    return result;
  }

  let fileNames = filesContents.slice();
  filesContents = filesContents.map(readFile);

  let extractedInput = { filesContents,outputType,number ,fileNames}
  return head(extractedInput).join('\n');
}

const validateInput = function(parsedInput) {
  let { filesContents, outputType , number } = parsedInput;
  let result = isOutputType(outputType) && isValidNumber(number);
  return result;
}

module.exports = {
  selectDelimiter,
  getHead,
  getOptions,
  extractFiles,
  extractInputs,
  head,
  createFileHeader,
  output,
  filterOptions
}
