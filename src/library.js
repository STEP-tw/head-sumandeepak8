const {
  createFileHeader,
  selectDelimiter,
  readFile,
  errorMessageForMissingFile,
  errorMessageForOption,
  errorMessageForLinesAndBytes,
} = require('./utilLib.js');

const { parseInput } = require('./parseInput.js');
const { inputValidation } = require('./inputValidation.js');

const take = function (file, option, count = 10) {
  let delimiter = selectDelimiter(option);
  return file.split(delimiter).slice(0, count).join(delimiter);
};

const extractSingleFileData = function (details, commandFunction, command) {
  let {
    files,
    existsSync,
    option,
    count,
    readContent
  } = details;
  if (!existsSync(files[0]))
    return [errorMessageForMissingFile(files[0], command)];
  return [commandFunction(readContent(files[0]), option, count)];
};

const extractMultipleFileData = function (details, commandFunction, command) {
  let {
    files,
    existsSync,
    option,
    count,
    readContent
  } = details;
  let delimiter = selectDelimiter(option);

  return files.map(function (file, index) {
    if (!existsSync(file)) return errorMessageForMissingFile(file, command);
    let fileContent = createFileHeader(file) + '\n' + commandFunction(readContent(file), option, count);
    if (index != files.length - 1) return fileContent + delimiter;
    return fileContent;
  });

};

const hasSingleFile = {
  true: extractSingleFileData,
  false: extractMultipleFileData
};

const head = function (parsedInput) {
  let {
    files
  } = parsedInput;
  let condition = (files.length == 1);
  return hasSingleFile[condition](parsedInput,
    take, 'head');
};

const last = function (file, option, count = 10) {
  let delimiter = selectDelimiter(option);
  return file.split(delimiter).reverse().slice(0, count).reverse().join(delimiter);
};

const tail = function (parsedInput) {
  let {
    files
  } = parsedInput;
  let condition = (files.length == 1);
  return hasSingleFile[condition](parsedInput, last, 'tail');
};

const organizeCommandOutput = function (inputArgs, fs, command) {
  let commands = {
    head: head,
    tail: tail
  };
  let {
    files,
    option,
    count
  } = parseInput(inputArgs);
  if (command == 'tail') count = Math.abs(count);
  let {
    readFileSync,
    existsSync
  } = fs;
  let readContent = readFile.bind(null, readFileSync);

  if (inputValidation(inputArgs, command) != true)
    return inputValidation(inputArgs, command);

  let parsedInput = {
    files,
    readContent,
    existsSync,
    option,
    count
  };
  return commands[command](parsedInput).join('\n');
};

module.exports = {
  take,
  head,
  organizeCommandOutput,
  last,
};