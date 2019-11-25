const utils = require("../src/utilitiesLib.js");

const transactionRecorder = function(path, args, date, fs) {
  if (utils.isInvalidInput(args)) {
    message = "invalid input";
    return message;
  }
  const processedArgs = utils.argsProcesser(args);
  return;
};

exports.transactionRecorder = transactionRecorder;
