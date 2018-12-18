const {
    parseInput
} = require('./parseInput.js');

const options = {
    'n': 'line',
    'c': 'byte'
};

const errorMessageForMissingFile = function (file, context) {
    return context + ': ' + file + ': No such file or directory';
};

const errorMessageForOption = function (option, context) {
    let messages = {
        head: 'head: illegal option -- ' + option + '\n' +
            'usage: head [-n lines | -c bytes] [file ...]',
        tail: 'tail: illegal option -- ' + option + '\n' +
            'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    };
    return messages[context];
};

const errorMessageForLinesAndBytes = function (count, option, context) {
    let messages = {
        head: 'head: illegal ' + options[option] + ' count -- ' + count,
        tail: 'tail: illegal offset -- ' + count
    };
    return messages[context];
};

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

const isValidCount = function (count, command) {
    let countObject = {
        head: (count >= 1),
        tail: (isFinite(count))
    };
    return countObject[command];
}

const validateCount = function (count, option, command) {
    let error_message;
    let isValid = isValidCount(count, command);
    if (!isValid)
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
    validateOption,
    isValidCount,
    errorMessageForMissingFile,
    errorMessageForOption,
    errorMessageForLinesAndBytes,
};