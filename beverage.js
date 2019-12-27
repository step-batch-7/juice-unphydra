const fs = require("fs");
const { getPath, getDate } = require("./src/config.js");
const optionLib = require("./src/optionLib.js");
const transactionRecorder = optionLib.transactionRecorder;

const main = function() {
  const path = getPath(process.env);
  const args = process.argv.slice(2);
  const date = getDate(process.env);
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
