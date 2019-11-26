const assert = require("assert");
const utils = require("../src/utilitiesLib.js");
const argsProcesser = utils.argsProcesser;
const isInvalidInput = utils.isInvalidInput;
const getRecord = utils.getRecord;

describe("argsProcesser", () => {
  it("should return an object of four keys which contain values or undefined", () => {
    const actual = argsProcesser([]);
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
    const actual = isInvalidInput([]);
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

    const actual = getRecord("path", isFileExists, readfile, jsonParse);
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

    const actual = getRecord("path", isFileExists, readfile, jsonParse);
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });
});
