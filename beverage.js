const fs = require("fs");
const optionLib = require("./src/optionLib.js");
const transactionRecorder = optionLib.transactionRecorder;

const main = function() {
  const path = "./transactionData.json";
  const args = process.argv.slice(2);
  const date = new Date();
  const fsi = {
    readFileSync: fs.readFileSync,
    writeFileSync: fs.writeFileSync,
    existsSync: fs.existsSync
  };
  const message = transactionRecorder(path, args, date, fsi);
  console.log(message);
  return;
};

main();
