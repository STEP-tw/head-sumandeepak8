const filterOptionAndCount = function (inputArgs) {
    let index = 0;

    return inputArgs.filter(() => {
        let result = (inputArgs[0][0] == '-');
        let isFirstElementNumber = (index == 1 &&
            (inputArgs[0].length > 2 || isFinite(inputArgs[0])));
        if (result && isFirstElementNumber) result = false;
        index++;
        return result;
    });
};

const isOnlyCount = function (inputArgs) {
    return isFinite(inputArgs[0]);
};

const isOnlyOption = function (inputArgs) {
    return isNaN(inputArgs) && inputArgs.length == 1;
};

const isOptionWithCount = function (inputArgs) {
    return isNaN(inputArgs[0]) && inputArgs.length > 1;
};

const extractOptionAndCount = function (inputArgs) {
    if (inputArgs[0].match(/^-/) == null) {
        return ['n', '10'];
    };

    let firstElement = inputArgs[0].slice(1);
    if (isOnlyCount(firstElement)) {
      return ['n',firstElement];
    };
    
    if(isOnlyOption(firstElement)){
        return [ firstElement ,inputArgs[1]];
    };

    if(isOptionWithCount(firstElement)){
        return [firstElement.slice(0,1),firstElement.slice(1)]
    }
};

const extractFiles = function (inputArgs) {
    let filesStartIndex = filterOptionAndCount(inputArgs.slice(0, 2)).length;
    return inputArgs.slice(filesStartIndex);
};

const parseCount = function (count, command) {
    let parsedCount = {
        'head': count,
        'tail': Math.abs(count)
    };
    return parsedCount[command];
};

const parseInput = function (inputArgs) {
    let optionAndCount = extractOptionAndCount(inputArgs);
    let option = optionAndCount[0];
    let count = optionAndCount[1];
    let files = extractFiles(inputArgs);
    return { files, option, count };
};

module.exports = {
    filterOptionAndCount,
    extractFiles,
    extractOptionAndCount,
    parseInput,
    parseCount,
    isOnlyOption,
    isOnlyCount,
    isOptionWithCount,
};