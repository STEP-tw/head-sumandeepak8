const selectDelimiter = function(outputType) {
  let delimiter = { n:'\n', c:'',};
  return delimiter[outputType];
}

module.exports = {
  selectDelimiter,
}
