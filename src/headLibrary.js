const selectDelimiter = function(outputType) {
  let delimiter = { n:'\n', c:'',} ;
  return delimiter[outputType] ;
}

const getRequiredData = function(fileContent, numbers) {
  let number = 0 ;
  return fileContent.filter(()=>{
    ++number ;
    return (number<=numbers) ;
  });
}

const getHead = function(file,number = 10,outputType) {
  let delimiter = selectDelimiter(outputType) ;
  file = file.split(delimiter) ; 
  return getRequiredData(file,number).join(delimiter) ;
}


module.exports = {
  selectDelimiter,
  getRequiredData,
  getHead,
}
