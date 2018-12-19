const { errorMessageForMissingFile } = require('./inputValidation.js');
const { parseInput, parseCount } = require('./parseInput.js');
const { inputValidation } = require('./inputValidation.js');

const createFileHeader = function (fileName, filesLength) {
  if (filesLength > 1)
    return `==> ${fileName} <==\n`;
  return '';
};

const selectDelimiter = function (option) {
  let delimiter = { n : '\n', c : '' };
  return delimiter[option];
};

const readFile = function (reader, file) {
  return reader(file, 'utf-8');
};

const take = function (file, option, count) {
  let delimiter = selectDelimiter(option);
  return file.split(delimiter).slice(0, count).join(delimiter);
};

const last = function (file, option, count) {
  let delimiter = selectDelimiter(option);
  return file.split(delimiter).reverse().slice(0, count).reverse().join(delimiter);
};

const extractFileData = function (parsedInput, commandFunction, command) {
  let { files, existsSync, option, count, readContent } = parsedInput;
  let delimiter = selectDelimiter(option); 

  return files.map(function (file, index) {
    if (!existsSync(file)) return errorMessageForMissingFile(file, command);
    let fileContent = createFileHeader(file, files.length) +
      commandFunction(readContent(file), option, count);
    if (index != files.length - 1) return fileContent + delimiter;
    return fileContent;
  });

};

const head = function (parsedInput) {
  return extractFileData(parsedInput, take, 'head');
};

const tail = function (parsedInput) {
  return extractFileData(parsedInput, last, 'tail');
};

const organizeCommandOutput = function (inputArgs, fs, command) {
  let { files, option, count } = parseInput(inputArgs, command);
  const commands = { 'head': head, 'tail': tail };
  count = parseCount(count, command);
  let { readFileSync, existsSync } = fs;
  let readContent = readFile.bind(null, readFileSync);
  let parsedInput = { files, readContent, existsSync, option, count };
  if (inputValidation(inputArgs, command) != true)
    return inputValidation(inputArgs, command);

  if(count == 0)
    return '';

  return commands[command](parsedInput).join('\n');
};

module.exports = {
  take,
  head,
  tail,
  last,
  readFile,
  selectDelimiter,
  createFileHeader,
  organizeCommandOutput,
};