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
  return  filesContents.map((file)=>{
    if(filesContents.length > 1){
      return createFileHeader(fileNames.shift()) + '\n' 
        + getHead(file,outputType,number) + '\n';
    }
    return getHead(file,outputType,number);
  });
}

const extractFiles = function(input) {
 let options = getOptions(input);
  if(options[0].length + 1 == input[0].length)
    return input.slice(2);
return input.slice(1) ;
}

const filterOptions = function(parameters) {
let {options,validCode} = parameters;

 options = options.filter(function(element,index){
    let result = options[0].includes('-') &&  
      validCode.includes(options[0].charCodeAt(1))
    if(result && index == 1 && options[0].length > 2)
      result = false;
    return result;
  });

  return options;
}

const getOptions = function(input) {
  let options = input.slice(0,2);
  let validCode = [48,49,50,51,52,53,54,55,56,57,99,110];

  let parameters = {options,validCode};
  let output = filterOptions(parameters);

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
  let outputType = 'n';
  let number = 10;
   if(options[0] != undefined){
    outputType = options[0];
    number = +options[1];
   }
  let filesContents = extractFiles(input) ;
  return {filesContents, outputType, number} ;
}

const output = function(readFile,input) {
  let { filesContents, outputType, number } =
    extractInputs(input.slice(2));

  let parsedInput =  extractInputs(input.slice(2));
  let result = validateInput(parsedInput);

  if(result != true){
    console.log(result);
    return;
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
