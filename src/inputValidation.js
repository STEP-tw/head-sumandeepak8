const {
    parseInput
} = require('./parseInput.js');

const { errorMessageForOption,
    errorMessageForLinesAndBytes,
 } = require('./utilLib.js'); 

const validateOption = function (option, command) {
    let error_message;
    let isValid = (option == 'n' || option == 'c');
    if (!isValid)
        error_message = errorMessageForOption(option, command);
    return {
        isValid,
        error_message
    };
};

const validateCount = function (count, option, command) {
    let error_message;
    let isValid = {
        head: (count >= 1),
        tail: (isFinite(count))
    };
    if (!isValid[command])
        error_message = errorMessageForLinesAndBytes(count, option, command);
    return {
        isValid,
        error_message
    };
};

const inputValidation = function (input, command) {
    let {
        count,
        option
    } = parseInput(input);
    let isValidOptionResult = validateOption(option, command);
    if (isValidOptionResult['isValid'] == false)
        return isValidOptionResult['error_message'];
    let validateCountResult = validateCount(count, option, command);
    if (validateCountResult['isValid'][command] == false)
        return validateCountResult['error_message'];
    return true;
};
module.exports = {
    inputValidation,
    validateCount,
    validateOption
};