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


module.exports = {
  selectDelimiter,
  getRequiredData,
}
