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
      assert.equal(path, "path");
      return true;
    };
    const readfile = function(path) {
      assert.equal(path, "path");
      return "{a:1}";
    };
    const jsonParse = function(args) {
      return { a: 1 };
    };

    const actual = utils.getRecord("path", isFileExists, readfile, jsonParse);
    const expected = { a: 1 };
    assert.deepStrictEqual(actual, expected);
  });
  it("should give empty record", () => {
    const isFileExists = function(path) {
      assert.equal(path, "path");
      return false;
    };
    const readfile = function(path) {
      assert.equal(path, "path");
      return "{}";
    };
    const jsonParse = function(args) {
      return {};
    };

    const actual = utils.getRecord("path", isFileExists, readfile, jsonParse);
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
