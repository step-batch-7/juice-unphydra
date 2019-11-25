const isInvalidInput = function(args) {
  return false;
};

const parsingArgsToObject = function(args) {
  this.method = args[0];
  this.empId = args[4];
  this.beverage = args[2];
  this.qty = args[6];
};

const argsProcesser = function(args) {
  let argsObj = {};
  let objectCreater = parsingArgsToObject.bind(argsObj, args);
  objectCreater();
  return argsObj;
};

const getRecord = function(path, isFileExists, readFile, jsonParse) {
  if (isFileExists(path)) {
    return jsonParse(readFile(path, "utf8"));
  }
  return {};
};

exports.argsProcesser = argsProcesser;
exports.isInvalidInput = isInvalidInput;
exports.getRecord = getRecord;
