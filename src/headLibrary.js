const createFileHeader = function(fileName) {
  let header = "==> " + fileName + " <==";
  return header;
};

const selectDelimiter = function(option = "n") {
  let delimiter = { n: "\n", c: "" };
  return delimiter[option];
};

const getHead = function(file, option, count = 10) {
  let delimiter = selectDelimiter(option);
  return file
    .split(delimiter)
    .slice(0, count)
    .join(delimiter);
};

const head = function(extractedInput) {
  let { filesContents, option, count, filesName ,isExist } = extractedInput;
  return filesContents.map((file, index) => {
    if (filesContents.length > 1) {
      let result =
        createFileHeader(filesName.shift()) +
        "\n" +
        getHead(file, option, count);
      if (index < filesContents.length - 1) result = result + "\n";
      return result;
    }
    return getHead(file, option, count);
  });
};

const filterOptionAndCount = function(inputArgs) {
  let options = inputArgs.slice(0, 2);

  return options.filter(function(element, index) {
    let result = options[0].includes("-");
    if (result && index == 1 && (options[0].length > 2 || !isNaN(+options[0])))
      result = false;
    return result;
  });
};

const extractFiles = function(inputArgs) {
  return inputArgs.slice(filterOptionAndCount(inputArgs).length);
};

const extractOptionAndCount = function(inputArgs) {
  let output = filterOptionAndCount(inputArgs);

  if (
    output[0] != undefined &&
    output[0][1] != "n" &&
    output[0][1] != "c" &&
    !isNaN(+output[0][1])
  ) {
    output[1] = output[0].slice(1);
    output[0] = "-n";
  }

  if (output[0] == undefined) {
    output[0] = "-n";
    output[1] = 10;
  }

  output[0] = output[0].slice(1);
  let length = output[0].length;

  if (length > 1) {
    output[1] = output[0].slice(1);
    output[0] = output[0][0];
  }

  return output;
};

const extractInputs = function(inputArgs) {
  let options = extractOptionAndCount(inputArgs);
  let option = options[0];
  let count = +options[1];
  let files = extractFiles(inputArgs);
  return { files, option, count };
};

const output = function(readFile, isExit, inputArgs) {
  let input = inputArgs.slice(2);
  let { files, option, count } = extractInputs(input);
  if( checkValidation(input) != true)
    return checkValidation(input);
  let filesName = files.slice();
  let filesContents = files.map(readFile);
  let extractedInput = { filesContents, option, count, filesName ,isExit};
  return head(extractedInput).join("\n");
};

const validateOption = function(option) {
  let error_message;
  let isValid = option.includes("-") &&
    (option[1] == 'n' || option[1] == 'c');

  if (!isValid) { error_message = "head: illegal option -- " +
    option[1] + "\n" + "usage: head [-n lines | -c bytes] [file ...]";
  }
  return { isValid, error_message };
};

const isValidCount = function(count,option) {
  let error_message;
  let isValid = count >= 1;
  if (!isValid) {
    error_message = "head: illegal line count -- " + count;
    if(option == '-c')
      error_message = "head: illegal byte count -- " + count;
  }
  return { isValid, error_message };
};

const checkValidation = function(input) {
  let optionCount = filterOptionAndCount(input);
  if(optionCount[0] == undefined) optionCount = ['-n',10];

  if(optionCount[1] == undefined && !isNaN(optionCount[0].slice(0,2)))
    optionCount = ['-n',optionCount[0].slice(1)];

  if(optionCount[1] == undefined && isNaN(optionCount[0].slice(0,2))){
    optionCount[1] = optionCount[0].slice(2);
    optionCount[0] = optionCount[0].slice(0,2);
  }

  let isValidOptionResult = validateOption(optionCount[0]);
  if(isValidOptionResult['isValid'] == false)
    return isValidOptionResult['error_message'];

  let isValidCountResult = isValidCount(optionCount[1],optionCount[0]);
  if(isValidCountResult['isValid'] == false)
    return isValidCountResult['error_message'];
  return true;
}

module.exports = {
  selectDelimiter,
  getHead,
  extractOptionAndCount,
  extractFiles,
  extractInputs,
  head,
  createFileHeader,
  output,
  filterOptionAndCount,
  validateOption,
  isValidCount
};
