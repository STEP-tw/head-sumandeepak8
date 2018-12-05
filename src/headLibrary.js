const selectDelimiter = function(outputType) {
  let delimiter = { n:'\n', c:'',} ;
  return delimiter[outputType] ;
}

const getHead = function(file,number = 10,outputType) {
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
  let files = extractFiles(input) ;
  return {files, options} 
}



module.exports = {
  selectDelimiter,
  getHead,
  filterOptions,
  extractFiles,
  extractInputs,
}
