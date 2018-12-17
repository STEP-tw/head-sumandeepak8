const {
  createFileHeader,
  selectDelimiter,
  readFile,
  errorMessageForMissingFile,
  errorMessageForOption,
  errorMessageForLinesAndBytes,
} = require('./utilLib.js');

const sliceFromTop = function (file, option, count = 10) {
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

  if( output[0] != undefined && output[0][1] != 'n' && output[0][1] != 'c' && !isNaN(+output[0][1]) ){
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
  let count = options[1];
  let files = extractFiles(inputArgs);
  return { files, option, count };
};

const extractSingleFileData = function (details, funcRef, context) {
  let { files, existsSync, option, count, readContent } = details;
  if (!existsSync(files[0]))
    return [errorMessageForMissingFile(files[0],context)];
  return [funcRef(readContent(files[0]), option, count)];
};

const extractMultipleFileData = function (details, funcRef, context) {
  let { files, existsSync, option, count, readContent } = details;
  let delimiter = selectDelimiter(option);
   
  return files.map(function (file, index) {
    if (!existsSync(file)) return errorMessageForMissingFile(file,context);
    let fileContent = createFileHeader(file) + '\n' + funcRef(readContent(file), option, count);
    if (index != files.length - 1) return fileContent + delimiter;
    return fileContent;
  });

};

const filesDataExtractingFunctions = { 'true' : extractSingleFileData, 'false' : extractMultipleFileData };

const head = function (parsedInput) {
  let { files } = parsedInput;
  let isSingleFile  = (files.length == 1);
   return filesDataExtractingFunctions[isSingleFile](parsedInput, 
  sliceFromTop, 'head');
};

const sliceFromBottom = function (file, option, count = 10) {
  let delimiter = selectDelimiter(option);
  return file.split(delimiter).reverse().slice(0, count).reverse().join(delimiter);
};

const tail = function (parsedInput) {
  let { files } = parsedInput;
  let isSingleFile = (files.length == 1);
  return filesDataExtractingFunctions[isSingleFile](parsedInput, sliceFromBottom
, 'tail');
};

const output = function (inputArgs, fs, context) {
  let parts = { head: head, tail: tail };
  let { files, option, count } = extractInputs(inputArgs);
  if(context == 'tail') count = Math.abs(count);
  let { readFileSync, existsSync } = fs;
  let readContent = readFile.bind(null, readFileSync);

  if (checkValidation(inputArgs, context) != true)
    return checkValidation(inputArgs, context);

  let parsedInput = { files, readContent, existsSync, option, count };
  return parts[context](parsedInput).join('\n');
};

const validateOption = function (option, context) {
  let error_message;
  let isValid = ( option == 'n' || option == 'c' );
  if ( !isValid ) 
    error_message = errorMessageForOption(option, context);
  return { isValid, error_message };
};

const validateCount = function (count, option ,context) {
  let error_message;
  let isValid = { head : (count >= 1), tail : (!isNaN(+count)) };
  if ( !isValid[context] ) 
    error_message = errorMessageForLinesAndBytes(count, option, context);
  return { isValid, error_message };
};

const checkValidation = function (input, context) {
  let { count , option } = extractInputs(input);
  let isValidOptionResult = validateOption(option, context);
  if ( isValidOptionResult['isValid'] == false )
    return isValidOptionResult['error_message'];
  let validateCountResult = validateCount(count, option, context);
  if ( validateCountResult['isValid'][context] == false ) 
    return validateCountResult['error_message'];
  return true;
};

module.exports = {
  
sliceFromTop,
  extractOptionAndCount,
  extractFiles,
  extractInputs,
  head,
  output,
  filterOptionAndCount,
  validateOption,
  validateCount,
  sliceFromBottom,
};
