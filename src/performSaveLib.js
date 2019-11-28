const performSave = function(records, args, date) {
  let { empId, beverage, qty } = args;
  let savedTrans = { empId, beverage, qty, date };
  records.push(savedTrans);
  return [savedTrans];
};

exports.performSave = performSave;
