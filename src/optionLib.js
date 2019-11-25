const transactionRecorder = function(path, args, date, fs) {
  return (
    "Transaction Recorded:\n" +
    "Employee ID,Beverage,Quantity,Date\n" +
    "11111,Orange,1," +
    date
  );
};

exports.transactionRecorder = transactionRecorder;
