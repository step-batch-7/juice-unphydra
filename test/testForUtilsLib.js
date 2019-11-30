const assert = require("assert");
const {
  getRecord,
  writeRecords,
  generateMessage,
  getTotalJuices
} = require("../src/utilitiesLib.js");

describe("getRecord", () => {
  it("should return records", () => {
    const isFileExists = function(path) {
      assert.deepStrictEqual(path, "path");
      return true;
    };
    const readfile = function(path, encoder) {
      assert.deepStrictEqual(path, "path");
      assert.deepStrictEqual(encoder, "utf8");
      return "[{a:1}]";
    };
    const jsonParse = function(args) {
      return [{ a: 1 }];
    };
    const encoder = "utf8";

    const actual = getRecord(
      "path",
      isFileExists,
      readfile,
      jsonParse,
      encoder
    );
    const expected = [{ a: 1 }];
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
      return "[]";
    };
    const jsonParse = function(args) {
      return [];
    };
    const encoder = "utf8";

    const actual = getRecord(
      "path",
      isFileExists,
      readfile,
      jsonParse,
      encoder
    );
    const expected = [];
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

    const actual = writeRecords(path, writeFile, records, jsonString, encoder);
    const expected = undefined;
    assert.deepStrictEqual(actual, expected);
    assert.deepStrictEqual(runCount, 1);
  });
});

describe("generateMessage", () => {
  it("should give only heading if no transaction details is given", () => {
    const transactionDetails = [{}];
    const actual = generateMessage(transactionDetails);
    const expected =
      "Employee ID,Beverage,Quantity,Date\nundefined,undefined,undefined,undefined\n";
    assert.deepStrictEqual(actual, expected);
  });
  it("should give transaction details of given transaction", () => {
    const transactionDetails = [
      { empId: 11111, beverage: "Orange", qty: 1, date: 1234 }
    ];
    const actual = generateMessage(transactionDetails);
    const expected =
      "Employee ID,Beverage,Quantity,Date\n11111,Orange,1,1234\n";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getTotalJuices", () => {
  it("should give zero for empty record", () => {
    const records = [];
    const actual = getTotalJuices(records);
    const expected = 0;
    assert.deepStrictEqual(actual, expected);
  });

  it("should give two for two qty", () => {
    const records = [{ qty: 1 }, { qty: 1 }];
    const actual = getTotalJuices(records);
    const expected = 2;
    assert.deepStrictEqual(actual, expected);
  });

  it("should give NaN for a undefined or NaN qty", () => {
    const records = [{ qty: 1 }, { qty: 1 }, { qty: undefined }];
    const actual = getTotalJuices(records);
    const expected = NaN;
    assert.deepStrictEqual(actual, expected);
  });
});
