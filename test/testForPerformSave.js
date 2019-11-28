const assert = require("assert");
const performSave = require("../src/performSaveLib").performSave;

describe("performSave", () => {
  it("should return list of undefined records of orders ", () => {
    const actual = performSave([], {}, "1234");
    const expected = [
      { empId: undefined, beverage: undefined, qty: undefined, date: "1234" }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return list of orders and update records", () => {
    const records = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1234" },
      { empId: 11111, beverage: "Apple", qty: 1, date: "1235" },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: "1236" }
    ];
    const args = { method: "--save", empId: 11111, beverage: "Orange", qty: 1 };
    const actual = performSave(records, args, "1233");
    const expected = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1233" }
    ];
    assert.deepStrictEqual(actual, expected);
    const expectedRecords = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1234" },
      { empId: 11111, beverage: "Apple", qty: 1, date: "1235" },
      { empId: 11122, beverage: "Pineapple", qty: 2, date: "1236" },
      { empId: 11111, beverage: "Orange", qty: 1, date: "1233" }
    ];
    assert.deepStrictEqual(records, expectedRecords);
  });

  it("should return list of orders and save oders with new empid key ", () => {
    const args = { method: "--save", empId: 11111, beverage: "Orange", qty: 1 };
    const actual = performSave([], args, "1234");
    const expected = [
      { empId: 11111, beverage: "Orange", qty: 1, date: "1234" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
