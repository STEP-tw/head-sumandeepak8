const validateOption = function(option) {
  let error_message;
  let isValid = option.includes('-') && 
    (option.charCodeAt(1) == 99 || option.charCodeAt(1) == 110);

  if(!isValid ){
    error_message = ('head: illegal option -- ' + option[1]) +'\n' +
      ('usage: head [-n lines | -c bytes] [file ...]');
  }
  return { isValid, error_message };
}

const isValidCount = function(count) {
  let error_message;
  let isValid = count >= 1;
  if(!isValid){
    error_message = 'head: illegal line count -- ' + count;
  }
  return { isValid, error_message };
}


module.exports = { 
  validateOption,
  isValidCount,
};
