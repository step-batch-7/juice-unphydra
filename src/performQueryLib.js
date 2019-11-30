const performQuery = function(records, args) {
  let { empId, beverage, date } = args.options;
  let matchedWithEmpId = matchedWith(empId, "empId");
  let matchedWithBeverage = matchedWith(beverage, "beverage");
  let isDateMatched = matchedDate(date);
  let reqOrders = (empId && filterReq(records, matchedWithEmpId)) || records;
  reqOrders =
    (beverage && filterReq(reqOrders, matchedWithBeverage)) || reqOrders;
  reqOrders = (date && filterReq(reqOrders, isDateMatched)) || reqOrders;
  return reqOrders;
};

const matchedWith = function(value, key) {
  return function(orders) {
    return orders[key] === value;
  };
};

const matchedDate = function(value) {
  return function(orders) {
    return orders.date.slice(0, 10) === value;
  };
};

const filterReq = function(records, action) {
  return records.filter(action);
};

module.exports = { performQuery, filterReq };
