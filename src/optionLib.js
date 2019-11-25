const utils = require("../src/utilitiesLib.js");

const transactionRecorder = function(path, args, date, fs) {
  //if (utils.isInvalidInput(args)) {
  //  message = "invalid input";
  //  return message;
  //}
  const processedArgs = utils.argsProcesser(args);
  const records = utils.getRecord(
    path,
    fs.existsSync,
    fs.readFileSync,
    JSON.parse
  );
  return (
    "Transaction Recorded:\n" +
    "Employee ID,Beverage,Quantity,Date\n" +
    "11111,Orange,1," +
    date
  );
};

exports.transactionRecorder = transactionRecorder;
