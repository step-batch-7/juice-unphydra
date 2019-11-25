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

exports.argsProcesser = argsProcesser;
exports.isInvalidInput = isInvalidInput;
