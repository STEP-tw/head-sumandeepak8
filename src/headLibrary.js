const selectDelimiter = function(outputType) {
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
      (element.charCodeAt(0) <= 57)
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
  let files = extractFiles(input) ;
  return {files,outputType,numbers} ;
}

const head = function(input) {
  let {files, outputType, numbers} = extractInputs(input);
 return  files.map((file)=>{
    return getHead(file,outputType,numbers);
  });
}


module.exports = {
  selectDelimiter,
  getHead,
  filterOptions,
  extractFiles,
  extractInputs,
  head,
}
