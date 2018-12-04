const selectDelimiter = function(outputType) {
  let delimiter = { n:'\n', c:'',} ;
  return delimiter[outputType] ;
}

const getHead = function(file,number = 10,outputType) {
  let delimiter = selectDelimiter(outputType) ;
   return  file.split(delimiter).slice(0,number).join(delimiter); 
}


module.exports = {
  selectDelimiter,
  getHead,
}
