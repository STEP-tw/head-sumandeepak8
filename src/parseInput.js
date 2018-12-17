const filterOptionAndCount = function (inputArgs) {
    let options = inputArgs.slice(0, 2);
    let index = 0;
    return options.filter(() => {
        let result = options[0].includes('-');
        if (result && index == 1 && (options[0].length > 2 || !isNaN(+options[0])))
            result = false;
        index++;
        return result;
    });
};

const extractFiles = function (inputArgs) {
    return inputArgs.slice(filterOptionAndCount(inputArgs).length);
};

const optionCountMethod = function (optionAndCount) {
    let options = { 
        '1' : [optionAndCount[0][1], optionAndCount[0].slice(2)],
        '2' : [optionAndCount[0][1],optionAndCount[1]],
    };
    return options[optionAndCount.length];
}

const extractOptionAndCount = function (inputArgs) {
    let optionAndCount = filterOptionAndCount(inputArgs);
   optionAndCount[0] == undefined && optionAndCount.push('-n10');
    if (isFinite(optionAndCount[0][1]))
        return ['n', optionAndCount[0].slice(1)];
    return optionCountMethod(optionAndCount);
};

const parseInput = function (inputArgs) {
    let options = extractOptionAndCount(inputArgs);
    let option = options[0];
    let count = options[1];
    let files = extractFiles(inputArgs);
    return {
        files,
        option,
        count
    };
};

module.exports = {
    filterOptionAndCount,
    extractFiles,
    extractOptionAndCount,
    parseInput,
    optionCountMethod,
};