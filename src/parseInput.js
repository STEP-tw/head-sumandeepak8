const isOnlyCount = function (inputArgs) {
    return isFinite(inputArgs[0]);
};

const isOnlyOption = function (inputArgs) {
    return isNaN(inputArgs) && inputArgs.length == 1;
};

const isOptionWithCount = function (inputArgs) {
    return isNaN(inputArgs[0]) && inputArgs.length > 1;
};

const parseInput = function (inputArgs) {
    if (inputArgs[0].match(/^-/) == null) {
        return {
            option: 'n',
            count: '10',
            files: inputArgs
        };
    };

    let firstElement = inputArgs[0].slice(1);
    if (isOnlyCount(firstElement)) {
        return {
            option: 'n',
            count: firstElement,
            files: inputArgs.slice(1)
        };
    };

    if (isOnlyOption(firstElement)) {
        return {
            option: firstElement,
            count: inputArgs[1],
            files: inputArgs.slice(2)
        };
    };

    if (isOptionWithCount(firstElement)) {
        return {
            option: firstElement.slice(0, 1),
            count: firstElement.slice(1),
            files: inputArgs.slice(1)
        };
    };
};

const parseCount = function (count, command) {
    let parsedCount = {
        'head': count,
        'tail': Math.abs(count)
    };
    return parsedCount[command];
};

module.exports = {
    parseInput,
    parseCount,
    isOnlyOption,
    isOnlyCount,
    isOptionWithCount,
};