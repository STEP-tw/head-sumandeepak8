const isValidOption = function(option) {
  let result = option.includes('-') && 
    (option.charCodeAt(1) == 99 || option.charCodeAt(1) == 110);

  if(!result ){
    return ('head: illegal option -- ' + option[1]) +'\n' +
      ('usage: head [-n lines | -c bytes] [file ...]');
  }
  return result;
}

const isValidNumber = function(count) {
  if(count < 1){
    return ('head: illegal line count -- ' + count);
  }
  return true;
}


module.exports = { 
  isValidOption,
  isValidNumber,
};
