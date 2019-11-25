const assert = require("assert");
const utils = require("../src/utilitiesLib.js");
const argsProcesser = utils.argsProcesser;
const isInvalidInput = utils.isInvalidInput;

describe("argsProcesser", () => {
  it("should return an object of four keys which contain values or undefined", () => {
    const actual = argsProcesser([]);
    const expected = {
      method: undefined,
      empId: undefined,
      beverage: undefined,
      qty: undefined
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
