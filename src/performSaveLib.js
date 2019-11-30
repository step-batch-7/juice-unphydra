const performSave = function(records, args, date) {
  let { empId, beverage, qty } = args.options;
  let savedTrans = { empId, beverage, qty, date };
  records.push(savedTrans);
  return [savedTrans];
};

exports.performSave = performSave;
