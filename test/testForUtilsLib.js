const assert = require("assert");
const utils = require("../src/utilitiesLib.js");

describe("argsProcesser", () => {
  it("should return an object of four keys which contain values or undefined", () => {
    const actual = utils.argsProcesser([]);
    const expected = {
      method: undefined,
      empId: undefined,
      beverage: undefined,
      qty: NaN
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isInvalidInput", () => {
  it("should return false", () => {
    const actual = utils.isInvalidInput([]);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getRecord", () => {
  it("should return records", () => {
    const isFileExists = function(path) {
      assert.deepStrictEqual(path, "path");
      return true;
    };
    const readfile = function(path, encoder) {
      assert.deepStrictEqual(path, "path");
      assert.deepStrictEqual(encoder, "utf8");
      return "{a:1}";
    };
    const jsonParse = function(args) {
      return { a: 1 };
    };
    const encoder = "utf8";

    const actual = utils.getRecord(
      "path",
      isFileExists,
      readfile,
      jsonParse,
      encoder
    );
    const expected = { a: 1 };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give empty record", () => {
    const isFileExists = function(path) {
      assert.deepStrictEqual(path, "path");
      return false;
    };
    const readfile = function(path, encoder) {
      assert.deepStrictEqual(path, "path");
      assert.deepStrictEqual(encoder, "utf8");
      return "{}";
    };
    const jsonParse = function(args) {
      return {};
    };
    const encoder = "utf8";

    const actual = utils.getRecord(
      "path",
      isFileExists,
      readfile,
      jsonParse,
      encoder
    );
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });
});

describe("writeRecords", () => {
  it("shold write the records in the file of given path", () => {
    const path = "somePath";
    const records = {};
    const encoder = "utf8";
    let runCount = 0;
    const writeFile = function(path, recordString, encoder) {
      assert.deepStrictEqual(path, "somePath");
      assert.deepStrictEqual(recordString, "{}");
      assert.deepStrictEqual(encoder, "utf8");
      runCount++;
    };

    const jsonString = function(records) {
      assert.deepStrictEqual(records, {});
      return "{}";
    };

    const actual = utils.writeRecords(
      path,
      writeFile,
      records,
      jsonString,
      encoder
    );
    const expected = undefined;
    assert.deepStrictEqual(actual, expected);
    assert.deepStrictEqual(runCount, 1);
  });
});

describe("generateMessage", () => {
  it("should give only heading if no transaction details is given", () => {
    const transactionDetails = [{}];
    const actual = utils.generateMessage(transactionDetails);
    const expected =
      "Employee ID,Beverage,Quantity,Date\nundefined,undefined,undefined,undefined\n";
    assert.deepStrictEqual(actual, expected);
  });
  it("should give transaction details of given transaction", () => {
    const transactionDetails = [
      { empId: 11111, beverage: "Orange", qty: 1, date: 1234 }
    ];
    const actual = utils.generateMessage(transactionDetails);
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,Orange,1,1234\n";
    assert.deepStrictEqual(actual, expected);
  });
});
