const fs = require("fs");
const optionLib = require("./src/optionLib.js");
const transactionRecorder = optionLib.transactionRecorder;

const main = function() {
  const path = "./transactionData.json";
  const args = process.argv.slice(2);
  const date = new Date().toJSON();
  const message = transactionRecorder(path, args, date, fs);
  console.log(message);
  return;
};

main();
