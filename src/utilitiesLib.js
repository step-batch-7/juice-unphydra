const isInvalidInput = function(args) {
  return false;
};

const parsingArgsToObject = function(args) {
  this.method = args[0];
  this.empId = args[4];
  this.beverage = args[2];
  this.qty = +args[6];
};

const argsProcesser = function(args) {
  let argsObj = {};
  let objectCreater = parsingArgsToObject.bind(argsObj, args);
  objectCreater();
  return argsObj;
};

const getRecord = function(path, isFileExists, readFile, jsonParse, encoder) {
  if (isFileExists(path)) {
    return jsonParse(readFile(path, encoder));
  }
  return {};
};

const writeRecords = function(path, writeFile, records, jsonString, encoder) {
  let recordString = jsonString(records, null, 2);
  return writeFile(path, recordString, encoder);
};

const generateMessage = function(transDetails) {
  let { empId, beverage, qty, date } = transDetails[0];
  let message = "Transaction Recorded:\n";
  message = message + "Employee ID,Beverage,Quantity,Date\n";
  message = message + empId + "," + beverage + ",";
  message = message + qty + "," + date;
  return message;
};

exports.argsProcesser = argsProcesser;
exports.isInvalidInput = isInvalidInput;
exports.getRecord = getRecord;
exports.writeRecords = writeRecords;
exports.generateMessage = generateMessage;
