const selectDelimiter = function(outputType) {
  let delimiter = { n:'\n', c:'',} ;
  return delimiter[outputType] ;
}

const getHead = function(file,number = 10,outputType) {
  let delimiter = selectDelimiter(outputType) ;
  return  file.split(delimiter).slice(0,number).join(delimiter); 
}

const getNumbersNType = function(input) {
  return input.filter((element)=>
    +(element.includes('-') || 
      (element.charCodeAt(0) <= 57)
    ));
}
a = ['-n','file','file1','12'];
console.log(getNumbersNType(a));


module.exports = {
  selectDelimiter,
  getHead,
  getNumbersNType,
}
