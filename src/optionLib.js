const {
  getRecord,
  writeRecords,
  generateMessage,
  getTotalJuices
} = require("../src/utilitiesLib.js");
const parser = require("./parser.js").parser;
const performSave = require("./performSaveLib.js").performSave;
const performQuery = require("./performQueryLib.js").performQuery;

const transactionRecorder = function(path, args, date, fs) {
  let message = "";
  const processedArgs = parser(args);
  if (!processedArgs.validation) {
    return "wrong Input";
  }
  const records = getRecord(
    path,
    fs.existsSync,
    fs.readFileSync,
    JSON.parse,
    "utf8"
  );
  if (processedArgs.command == "--save") {
    let transactionDetails = performSave(records, processedArgs, date);
    writeRecords(path, fs.writeFileSync, records, JSON.stringify, "utf8");
    message = generateMessage(transactionDetails);
    return `Transaction Recorded:\n${message}`;
  }
  transactionDetails = performQuery(records, processedArgs);
  message = generateMessage(transactionDetails);
  let totalNoOfJuices = getTotalJuices(transactionDetails);
  return `${message}Total: ${totalNoOfJuices}`;
};

exports.transactionRecorder = transactionRecorder;
