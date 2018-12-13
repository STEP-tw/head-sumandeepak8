const {
  createFileHeader,
  selectDelimiter,
  readFile,
  errorMessageForFileInHead,
  errorMessageForFileInTail,
  errorMessageForOption,
  errorMessageForLines,
  errorMessageForBytes,
} = require('./utilLib.js');

const getHead = function (file, option, count = 10) {
  let delimiter = selectDelimiter(option);
  return file.split(delimiter).slice(0, count).join(delimiter);
};

const filterOptionAndCount = function (inputArgs) {
  let options = inputArgs.slice(0, 2);
  return options.filter(function (element, index) {
    let result = options[0].includes('-');
    if (result && index == 1 && (options[0].length > 2 || !isNaN(+options[0])))
      result = false;
    return result;
  });
};

const extractFiles = function (inputArgs) {
  return inputArgs.slice(filterOptionAndCount(inputArgs).length);
};

const extractOptionAndCount = function (inputArgs) {
  let output = filterOptionAndCount(inputArgs);

  if (
    output[0] != undefined &&
    output[0][1] != 'n' &&
    output[0][1] != 'c' &&
    !isNaN(+output[0][1])
  ) {
    output[1] = output[0].slice(1);
    output[0] = '-n';
  }

  if (output[0] == undefined) {
    output[0] = '-n';
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

const extractInputs = function (inputArgs) {
  let options = extractOptionAndCount(inputArgs);
  let option = options[0];
  let count = +options[1];
  let files = extractFiles(inputArgs);
  return {
    files,
    option,
    count
  };
};

const extractSingleFileData = function (details, funcRef, errorMessageRef) {
  let {
    files,
    existsSync,
    option,
    count,
    readContent
  } = details;
  if (!existsSync(files[0]))
    return [errorMessageRef(files[0])];
  return [funcRef(readContent(files[0]), option, count)];
};

const extractMultipleFileData = function (details, funcRef, errorMessageRef) {
  let {
    files,
    existsSync,
    option,
    count,
    readContent
  } = details;
  let delimiter = selectDelimiter(option);

  return files.map(function (file, index) {
    if (!existsSync(file)) return errorMessageRef(file);
    let fileContent = createFileHeader(file) + '\n' + funcRef(readContent(file), option, count);
    if (index != files.length - 1) return fileContent + delimiter;
    return fileContent;
  });

};

const head = function (parsedInput) {
  let {
    files
  } = parsedInput;
  if (files.length == 1)
    return extractSingleFileData(parsedInput, getHead, errorMessageForFileInHead);
  return extractMultipleFileData(parsedInput, getHead, errorMessageForFileInHead);
};

const getTail = function (file, option, count = 10) {
  let delimiter = selectDelimiter(option);
  return file.split(delimiter).reverse().slice(0, count).reverse().join(delimiter);
};

const tail = function (parsedInput) {
  let {
    files
  } = parsedInput;
  if (files.length == 1)
    return extractSingleFileData(parsedInput, getTail, errorMessageForFileInTail);
  return extractMultipleFileData(parsedInput, getTail, errorMessageForFileInTail);
};


const output = function (inputArgs, fs, partRef) {
  let parts = {
    head: head,
    tail: tail
  };
  let {
    files,
    option,
    count
  } = extractInputs(inputArgs);
  let {
    readFileSync,
    existsSync
  } = fs;
  let readContent = readFile.bind(null, readFileSync);
  let parsedInput = {
    files,
    readContent,
    existsSync,
    option,
    count
  };
  if (checkValidation(inputArgs) != true) return checkValidation(inputArgs);
  return parts[partRef](parsedInput).join('\n');
};

const validateOption = function (option) {
  let error_message;
  let isValid = option.includes('-') && (option[1] == 'n' || option[1] == 'c');
  if (!isValid) {
    error_message = errorMessageForOption(option);
  }
  return {
    isValid,
    error_message
  };
};

const isValidCount = function (count, option ) {
  let error_message;
  let isValid = (count >= 1);
    if (!isValid) {
    error_message = errorMessageForLines(count);
    if (option == '-c') error_message = errorMessageForBytes(count);
  }
  return {
    isValid,
    error_message
  };
};

const checkValidation = function (input) {
  let optionCount = filterOptionAndCount(input);
  if (optionCount[0] == undefined) optionCount = ['-n', 10];

  if (optionCount[1] == undefined && !isNaN(optionCount[0].slice(0, 2)))
    optionCount = ['-n', optionCount[0].slice(1)];

  if (optionCount[1] == undefined && isNaN(optionCount[0].slice(0, 2))) {
    optionCount[1] = optionCount[0].slice(2);
    optionCount[0] = optionCount[0].slice(0, 2);
  }

  let isValidOptionResult = validateOption(optionCount[0]);
  if (isValidOptionResult['isValid'] == false)
    return isValidOptionResult['error_message'];

  let isValidCountResult = isValidCount(optionCount[1], optionCount[0]);
  if (isValidCountResult['isValid'] == false) 
      return isValidCountResult['error_message'];
  
  return true;
};

module.exports = {
  getHead,
  extractOptionAndCount,
  extractFiles,
  extractInputs,
  head,
  output,
  filterOptionAndCount,
  validateOption,
  isValidCount,
  getTail,
};