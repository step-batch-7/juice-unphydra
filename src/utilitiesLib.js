const getRecord = function(
  path,
  isFileExists,
  readFile,
  jsonParse,
  encoder
) {
  if (isFileExists(path)) {
    const parsed = jsonParse(readFile(path, encoder));
    return parsed.map(maper);
  }
  return [];
};

const maper = function(orders) {
  orders.date = new Date(orders.date);
  return orders;
};

const writeRecords = function(
  path,
  writeFile,
  records,
  jsonString,
  encoder
) {
  let recordString = jsonString(records, null, 2);
  return writeFile(path, recordString, encoder);
};

const generateString = function(orders) {
  const { empId, beverage, qty, date } = orders;
  const stDate = date.toJSON();
  let message = `${empId},${beverage},${qty},${stDate}`;
  return message;
};

const generateMessage = function(transDetails) {
  let heading = "Employee ID,Beverage,Quantity,Date\n";
  let entries = transDetails.map(generateString).join("\n");
  return heading + entries;
};

const addQty = function(total, orders) {
  return orders.qty + total;
};

const getTotalJuices = function(records) {
  return records.reduce(addQty, 0);
};

const getErrorMsg = function() {
  let message = "please give a valid input\n";
  message =
    message +
    "for save:\n--save --empId [EMPID] --beverage [BEV NAME] --qty [QUANTITY]\n";
  message =
    message +
    "for query:\n--query --empId [EMPID]\n--beverage [BEV NAME]\n--date [dd-mm-yyyy]\n";
  message =
    message +
    "--empId [EMPID] --beverage [BEV NAME]\n--beverage [BEV NAME] --date [dd-mm-yyyy]\n";
  message = message + "--empId [EMPID] --date [dd-mm-yyyy]\n";
  return message;
};

module.exports = {
  getRecord,
  writeRecords,
  generateMessage,
  getTotalJuices,
  getErrorMsg
};
