const assert = require("assert");
const performSave = require("../src/performSaveLib").performSave;

describe("performSave", () => {
  it("should return list of undefined records of orders ", () => {
    const actual = performSave({}, {}, 1234);
    const expected = [
      { empId: undefined, beverage: undefined, qty: undefined, date: 1234 }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return list of orders and update records", () => {
    const records = {
      11111: {
        transaction: [
          { beverage: "Orange", qty: 1, date: 1232 },
          { beverage: "Apple", qty: 1, date: 1233 }
        ],
        totalQty: 2
      }
    };
    const args = { method: "--save", empId: 11111, beverage: "Orange", qty: 1 };
    const actual = performSave(records, args, 1234);
    const expected = [{ empId: 11111, beverage: "Orange", qty: 1, date: 1234 }];
    assert.deepStrictEqual(actual, expected);
    const expectedRecords = {
      11111: {
        transaction: [
          { beverage: "Orange", qty: 1, date: 1232 },
          { beverage: "Apple", qty: 1, date: 1233 },
          { beverage: "Orange", qty: 1, date: 1234 }
        ],
        totalQty: 3
      }
    };
    assert.deepStrictEqual(records, expectedRecords);
  });

  it("should return list of orders and save oders with new empid key ", () => {
    const args = { method: "--save", empId: 11111, beverage: "Orange", qty: 1 };
    const actual = performSave({}, args, 1234);
    const expected = [{ empId: 11111, beverage: "Orange", qty: 1, date: 1234 }];
    assert.deepStrictEqual(actual, expected);
  });
});
