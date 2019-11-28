const utils = require("../src/utilitiesLib.js");
const performSave = require("./performSaveLib.js").performSave;

const transactionRecorder = function(path, args, date, fs) {
  let message = "";
  //if (utils.isInvalidInput(args)) {
  //  message = "invalid input";
  //  return message;
  //}
  const processedArgs = utils.argsProcesser(args);
  const records = utils.getRecord(
    path,
    fs.existsSync,
    fs.readFileSync,
    JSON.parse,
    "utf8"
  );
  if (processedArgs.method == "--save") {
    let transactionDetails = performSave(records, processedArgs, date);
    utils.writeRecords(path, fs.writeFileSync, records, JSON.stringify, "utf8");
    message = utils.generateMessage(transactionDetails);
    return message;
  }
  return (
    "Transaction Recorded:\n" +
    "Employee ID,Beverage,Quantity,Date\n" +
    "11111,Orange,1," +
    date
  );
};

exports.transactionRecorder = transactionRecorder;
