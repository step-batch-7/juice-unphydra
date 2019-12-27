const assert = require("chai").assert;
const { getDate, getPath } = require("../src/config.js");

describe("getDate", () => {
  it("should take the new date if no date given", () => {
    const actual = getDate({});
    const expected = new Date();
    assert.deepStrictEqual(actual, expected);
  });
  it("should take the env date if given", () => {
    const date = new Date();
    const actual = getDate({ JS_DATE: date.toJSON() });
    const expected = date;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getPath", () => {
  it("should take the default path if no path is given", () => {
    const actual = getPath({});
    const expected = "./data/transactionData.json";
    assert.deepStrictEqual(actual, expected);
  });
  it("should take env path if given", () => {
    const actual = getPath({ JS_Data_PATH: "somePath" });
    const expected = "somePath";
    assert.deepStrictEqual(actual, expected);
  });
});
