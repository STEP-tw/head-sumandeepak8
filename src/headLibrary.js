const selectDelimiter = function(outputType) {
  let delimiter = { n:'\n', c:'',} ;
  return delimiter[outputType] ;
}

const getHead = function(file,number = 10,outputType) {
  let delimiter = selectDelimiter(outputType) ;
  return  file.split(delimiter).slice(0,number).join(delimiter); 
}

const filterOptions = function(input) {
  return input.filter((element)=>
    (element.includes('-') || 
      (element.charCodeAt(0) <= 57)
    ));
}


module.exports = {
  selectDelimiter,
  getHead,
  filterOptions,
}
