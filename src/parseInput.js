const filterOptionAndCount = function (inputArgs) {
    let options = inputArgs.slice(0, 2);
    let index = 0;
    return options.filter(() => {
        let result = (options[0][0] == '-');
        let isFirstElementNumber = (index == 1 &&
            (options[0].length > 2 || isFinite(options[0])));
        if (result && isFirstElementNumber)
            result = false;
        index++;
        return result;
    });
};

const optionCountMethod = function (optionAndCount) {
    let options = {
        '1': [optionAndCount[0][1], optionAndCount[0].slice(2)],
        '2': [optionAndCount[0][1], optionAndCount[1]],
    };
    return options[optionAndCount.length];
}

const extractOptionAndCount = function (inputArgs) {
    let optionAndCount = filterOptionAndCount(inputArgs);
    optionAndCount.length == 0 && optionAndCount.push('-n10');
    if (isFinite(optionAndCount[0][1]))
        return ['n', optionAndCount[0].slice(1)];
    return optionCountMethod(optionAndCount);
};

const extractFiles = function (inputArgs) {
    return inputArgs.slice(filterOptionAndCount(inputArgs).length);
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
    optionCountMethod,
    parseCount,
};