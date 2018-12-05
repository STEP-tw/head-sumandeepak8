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
  let number = +options[0].slice(2);
  if(options.length > 1){
    number = +options[1] ;
  }
  let filesContents = extractFiles(input) ;
  return {filesContents,outputType,number} ;
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

const output = function(readFile,input) {
  let {filesContents, outputType, number} = extractInputs(input.slice(2));
  let fileNames = filesContents.slice();
  filesContents = filesContents.map(readFile);
  let extractedInput = { filesContents,outputType,number ,fileNames}
  return head(extractedInput).join('\n');
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
