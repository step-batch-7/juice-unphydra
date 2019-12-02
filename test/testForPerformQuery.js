const assert = require("assert");
const { performQuery, filterReq } = require("../src/performQueryLib.js");

describe("performQuery", () => {
  it("should return empty record for empty args", () => {
    const actual = performQuery([], { options: {} });
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return filtered with date for date as args", () => {
    const testDate1 = new Date();
    const argDate = testDate1.toJSON().slice(0, 10);
    const testDate2 = new Date("2019-11-12");
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: testDate1 },
      { empId: 11111, beverage: "Apple", qty: 1, date: testDate2 },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: testDate1 }
    ];
    const args = { options: { date: argDate } };
    const actual = performQuery(records, args);
    const expected = [
      { empId: 11111, beverage: "Orange", qty: 1, date: testDate1 },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: testDate1 }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return filtered with beverage for beverage as args", () => {
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1234" },
      { empId: 11111, beverage: "Apple", qty: 1, date: "1233" },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: "1234" }
    ];
    const args = { options: { beverage: "Apple" } };
    const actual = performQuery(records, args);
    const expected = [
      { empId: 11111, beverage: "Apple", qty: 1, date: "1233" }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return filtered with empId for empID as args", () => {
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1234" },
      { empId: 11111, beverage: "Apple", qty: 1, date: "1233" },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: "1234" }
    ];
    const args = { options: { empId: 11111 } };
    const actual = performQuery(records, args);
    const expected = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1234" },
      { empId: 11111, beverage: "Apple", qty: 1, date: "1233" }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return filtered with empId date for empID and date as args", () => {
    const testDate1 = new Date();
    const argDate = testDate1.toJSON().slice(0, 10);
    const testDate2 = new Date("2019-11-12");
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: testDate2 },
      { empId: 11111, beverage: "Apple", qty: 1, date: testDate1 },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: testDate2 }
    ];
    const args = { options: { empId: 11111, date: argDate } };
    const actual = performQuery(records, args);
    const expected = [
      { empId: 11111, beverage: "Apple", qty: 1, date: testDate1 }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return filtered with empId beverage for empID and beverage as args", () => {
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1234" },
      { empId: 11111, beverage: "Apple", qty: 1, date: "1233" },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: "1234" }
    ];
    const args = { options: { empId: 11111, beverage: "Apple" } };
    const actual = performQuery(records, args);
    const expected = [
      { empId: 11111, beverage: "Apple", qty: 1, date: "1233" }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return filtered with date beverage for date and beverage as args", () => {
    const testDate1 = new Date();
    const argDate = testDate1.toJSON().slice(0, 10);
    const testDate2 = new Date("2019-11-12");
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: testDate2 },
      { empId: 11111, beverage: "Apple", qty: 1, date: testDate1 },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: testDate2 }
    ];
    const args = { options: { date: argDate, beverage: "Apple" } };
    const actual = performQuery(records, args);
    const expected = [
      { empId: 11111, beverage: "Apple", qty: 1, date: testDate1 }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return filtered with empID date beverage for empID and date and beverage as args", () => {
    const testDate1 = new Date();
    const argDate = testDate1.toJSON().slice(0, 10);
    const testDate2 = new Date("2019-11-12");
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: testDate2 },
      { empId: 11111, beverage: "Apple", qty: 1, date: testDate1 },
      { empId: 11111, beverage: "Pineapple", qty: 2, date: testDate2 }
    ];
    const args = {
      options: { empId: 11111, date: argDate, beverage: "Apple" }
    };
    const actual = performQuery(records, args);
    const expected = [
      { empId: 11111, beverage: "Apple", qty: 1, date: testDate1 }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("filterReq", () => {
  it("should return the same records of one element", () => {
    const records = [{ empId: 1234 }];
    const matchedWithEmpId = function(orders) {
      assert.deepStrictEqual(orders, { empId: 1234 });
      return true;
    };
    const actual = filterReq(records, matchedWithEmpId);
    const expected = [{ empId: 1234 }];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return empty for predicat false", () => {
    const records = [{ empId: 1234 }];
    const matchedWithEmpId = function(orders) {
      assert.deepStrictEqual(orders, { empId: 1234 });
      return false;
    };
    const actual = filterReq(records, matchedWithEmpId);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});
