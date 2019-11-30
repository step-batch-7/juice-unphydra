const getRecord = function(path, isFileExists, readFile, jsonParse, encoder) {
  if (isFileExists(path)) {
    return jsonParse(readFile(path, encoder));
  }
  return [];
};

const writeRecords = function(path, writeFile, records, jsonString, encoder) {
  let recordString = jsonString(records, null, 2);
  return writeFile(path, recordString, encoder);
};

const generateString = function(orders) {
  let { empId, beverage, qty, date } = orders;
  let message = `${empId},${beverage},${qty},${date}\n`;
  return message;
};

const generateMessage = function(transDetails) {
  let heading = "Employee ID,Beverage,Quantity,Date\n";
  let entries = transDetails.map(generateString);
  return heading + entries;
};

const addQty = function(total, orders) {
  return orders.qty + total;
};

const getTotalJuices = function(records) {
  return records.reduce(addQty, 0);
};

module.exports = { getRecord, writeRecords, generateMessage, getTotalJuices };
