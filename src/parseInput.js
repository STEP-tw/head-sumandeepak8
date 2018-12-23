const isOnlyCount = function (inputArg) {
    return isFinite(inputArg[0]);
};

const isOnlyOption = function (inputArg) {
    return isNaN(inputArg) && inputArg.length == 1;
};

const isOptionWithCount = function (inputArg) {
    return isNaN(inputArg[0]) && inputArg.length > 1;
};
 
const hasNoDash = function(inputArg){
    return inputArg[0].match(/^-/) == null;
};

const parseInput = function (inputArgs) {
    let firstElement = inputArgs[0].slice(1);

    let object = [
        {   
            result : hasNoDash(inputArgs[0]),
            true : {
                option : 'n',
                count : '10',
                files : inputArgs
            }

        },

        {
            result: isOnlyCount(firstElement),
            true: {
                option: 'n',
                count: firstElement,
                files: inputArgs.slice(1)
            }
        },

        {
            result: isOnlyOption(firstElement),
            true: {
                option: firstElement,
                count: inputArgs[1],
                files: inputArgs.slice(2)
            }

        },

        {
            result: isOptionWithCount(firstElement),
            true: {
                option: firstElement.slice(0, 1),
                count: firstElement.slice(1),
                files: inputArgs.slice(1)
            }
        },
    ];

    let parsedInputResults = object.filter(function (x) {
        return x['result'];
    });

    return parsedInputResults[0]['true'];
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
    hasNoDash,
};