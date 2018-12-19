const { parseInput } = require('./parseInput.js');

const options = { 'n': 'line', 'c': 'byte' };

const errorMessageForMissingFile = function (file, command) {
    return `${command}: ${file}: No such file or directory`;
};

const errorMessageForOption = function (option, command) {
    let messages = {
        head: `head: illegal option -- ${option}\nusage: head [-n lines | -c bytes] [file ...]`,
        tail: `tail: illegal option -- ${option}\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
    };
    return messages[command];
};

const errorMessageForLinesAndBytes = function (count, option, command) {
    let messages = {
        head: `head: illegal ${options[option]} count -- ${count}`,
        tail: `tail: illegal offset -- ${count}`
    };
    return messages[command];
};

const optionErrorMessage = function(isValid, option, command){
  let messages = {
      'true' : undefined,
      'false' : errorMessageForOption(option, command)
  }
  return messages[isValid];
};

const isValidCount = function (count, command) {
    let countObject = {
        head: (count >= 1),
        tail: (isFinite(count))
    };
    return countObject[command];
};

const countErrorMessage = function(isValid, count, option, command){
   let messages = { 
       'true' : undefined,
       'false' : errorMessageForLinesAndBytes(count, option, command)
   };
   return messages[isValid];
};

const validateOption = function (option, command) {
    let isValid = (option == 'n' || option == 'c');
    let message = optionErrorMessage(isValid, option, command);
    return { isValid, message };
}

const validateCount = function (count, option, command) {
    let isValid = isValidCount(count, command);
    let message = countErrorMessage(isValid, count, option, command);
    return { isValid, message };
};

const validateCountAndOption = function (input, command) {
    let { count, option } = parseInput(input);
    let isValidOptionResult = validateOption(option, command);
    let validateCountResult = validateCount(count, option, command);
    if (!isValidOptionResult['isValid'])
       return isValidOptionResult['message'];
    if (!validateCountResult['isValid'])
       return validateCountResult['message'];
    return true;
};

module.exports = {
    validateCountAndOption,
    validateCount,
    validateOption,
    isValidCount,
    errorMessageForMissingFile,
    errorMessageForOption,
    errorMessageForLinesAndBytes,
    validateCountAndOption,
    optionErrorMessage,
    countErrorMessage,
};