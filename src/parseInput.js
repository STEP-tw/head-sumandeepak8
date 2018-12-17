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

const extractOptionAndCount = function (inputArgs) {
    let optionAndCount = filterOptionAndCount(inputArgs);

    let isOnlyNumber = (optionAndCount[0] != undefined &&
        optionAndCount[0][1].match('n|c') == null &&
        isFinite(optionAndCount[0][1]));

    if (isOnlyNumber) {
        optionAndCount[1] = optionAndCount[0].slice(1);
        optionAndCount[0] = '-n';
    }

    if (optionAndCount[0] == undefined) {
        optionAndCount[0] = '-n';
        optionAndCount[1] = 10;
    }

    optionAndCount[0] = optionAndCount[0].slice(1);
    let length = optionAndCount[0].length;

    if (length > 1) {
        optionAndCount[1] = optionAndCount[0].slice(1);
        optionAndCount[0] = optionAndCount[0][0];
    }

    return optionAndCount;
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
};