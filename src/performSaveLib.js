const performSave = function(records, args, date) {
  let { empId, beverage, qty } = args;
  let transDetails = { beverage, qty, date };
  if (records.hasOwnProperty(empId)) {
    records[empId].transaction.push(transDetails);
    let prevQty = records[empId].totalQty;
    records[empId].totalQty = prevQty + qty;
    let savedTrans = { empId, beverage, qty, date };
    return [savedTrans];
  }
  records[empId] = {};
  records[empId].transaction = [transDetails];
  records[empId].totalQty = qty;
  savedTrans = { empId, beverage, qty, date };
  return [savedTrans];
};

exports.performSave = performSave;
