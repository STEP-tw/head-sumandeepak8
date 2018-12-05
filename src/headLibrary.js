const { isOutputType } = require('../src/util.js');

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

const filterOptions = function(input) {
  return input.filter((element)=>
    (element.includes('-') || 
      (element.charCodeAt(0) >= 48 && element.charCodeAt(0) <= 57)
    ));
}

const extractFiles = function(input) {
  let initialIndex = filterOptions(input).length ;
  return input.slice(initialIndex) ;
}

const extractInputs = function(input) {
  let options  = filterOptions(input) ;
  let outputType = options[0][1];
  let numbers = +options[0].slice(2);
  if(options.length > 1){
    numbers = +options[1] ;
  }
  let filesContents = extractFiles(input) ;
  return {filesContents,outputType,numbers} ;
}

const head = function(extractedInput) {
  let {filesContents, outputType, numbers,fileNames} = extractedInput;
  return  filesContents.map((file)=>{
    if(filesContents.length > 1){
        return createFileHeader(fileNames.shift()) + '\n' 
        + getHead(file,outputType,numbers) + '\n';
    }
    return getHead(file,outputType,numbers);
  });
}

const output = function(readFile,input) {
  let {filesContents, outputType, numbers} = extractInputs(input.slice(2));
  let fileNames = filesContents.slice();
  filesContents = filesContents.map(readFile);
  let extractedInput = { filesContents,outputType,numbers ,fileNames}
  return head(extractedInput).join('\n');
}

const isValidInput = function(input) {
  let inputToProcess = input.slice();
  inputToProcess.map((element)=>{
    
  })
  
}

module.exports = {
  selectDelimiter,
  getHead,
  filterOptions,
  extractFiles,
  extractInputs,
  head,
  createFileHeader,
  output
}
