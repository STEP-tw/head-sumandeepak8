const isOutputType = function(element) {
  let result = element.includes('-') && 
    (element.charCodeAt(1) == 99 || element.charCodeAt(1) == 110);

  if(!result ){
    return ('head: illegal option -- ' + element[1]) +'\n' +
      ('usage: head [-n lines | -c bytes] [file ...]');
  }
  return result;
}

module.exports = { 
  isOutputType,
};
