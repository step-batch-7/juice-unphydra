const assert = require("chai").assert;
const {
  parser,
  getProcessedArgs,
  areSufficientsOpt,
  areSufficientOptQuery,
  areSufficientOptSave,
  isValidOpt,
  isValidDate,
  isValidBeverage,
  isPositiveInt,
  isIncludes
} = require("../src/parser.js");

describe("parser", () => {
  it("should give false in validation for empty args", () => {
    const actual = parser([]);
    const expected = { command: undefined, validation: false, options: {} };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for only save in args", () => {
    const actual = parser(["--save"]);
    const expected = { command: "--save", validation: false, options: {} };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for only query in args", () => {
    const actual = parser(["--query"]);
    const expected = { command: "--query", validation: false, options: {} };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for save and empId in args", () => {
    const actual = parser(["--save", "--empId", "111"]);
    const expected = {
      command: "--save",
      validation: false,
      options: { empId: "111" }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for save and empId in args without value", () => {
    const actual = parser(["--save", "--empId"]);
    const expected = {
      command: "--save",
      validation: false,
      options: {}
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give true in validation for query and empId in args", () => {
    const actual = parser(["--query", "--empId", "111"]);
    const expected = {
      command: "--query",
      validation: true,
      options: { empId: 111 }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for query and empId in args without value", () => {
    const actual = parser(["--query", "--empId"]);
    const expected = {
      command: "--query",
      validation: false,
      options: {}
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for save and beverage in args", () => {
    const actual = parser(["--save", "--beverage", "Orange"]);
    const expected = {
      command: "--save",
      validation: false,
      options: { beverage: "Orange" }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for save and beverage in args without value", () => {
    const actual = parser(["--save", "--beverage"]);
    const expected = {
      command: "--save",
      validation: false,
      options: { beverage: undefined }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for save and empId in args without number", () => {
    const actual = parser(["--save", "--empId", "asf"]);
    const expected = {
      command: "--save",
      validation: false,
      options: {}
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for save and qty in args without number", () => {
    const actual = parser(["--save", "--qty", "adsd"]);
    const expected = {
      command: "--save",
      validation: false,
      options: {}
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for query and qty in args without number", () => {
    const actual = parser(["--query", "--qty", "asf"]);
    const expected = {
      command: "--query",
      validation: false,
      options: {}
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false in validation for query and qty in args without number", () => {
    const actual = parser(["--query", "--qty", "adsd"]);
    const expected = {
      command: "--query",
      validation: false,
      options: {}
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give args values for all args as save", () => {
    const args = [
      "--save",
      "--empId",
      "11111",
      "--beverage",
      "apple",
      "--qty",
      "1"
    ];
    const actual = parser(args);
    const expected = {
      command: "--save",
      validation: true,
      options: { empId: 11111, beverage: "apple", qty: 1 }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give args values for empId beverage date in args as query", () => {
    const args = [
      "--query",
      "--empId",
      "11113",
      "--beverage",
      "apple",
      "--date",
      "2019-11-28"
    ];
    const actual = parser(args);
    const expected = {
      command: "--query",
      validation: true,
      options: { empId: 11113, beverage: "apple", date: "2019-11-28" }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getProcessedArgs", () => {
  it("should return same processedArgs if no args given", () => {
    const processedArgs = { command: undefined, validation: true, options: {} };
    const actual = getProcessedArgs([], processedArgs, {});
    const expected = processedArgs;
    assert.deepStrictEqual(actual, expected);
  });

  it("should update empId if only empId is given in args", () => {
    const processedArgs = { command: "query", validation: true, options: {} };
    const validOptions = {
      "--beverage": x => true,
      "--qty": x => true,
      "--empId": x => true,
      "--date": x => true
    };

    const actual = getProcessedArgs(
      ["--query", "--empId", "111"],
      processedArgs,
      validOptions
    );
    const expected = {
      command: "query",
      validation: true,
      options: { empId: "111" }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update empId,beverage,qty for save", () => {
    const processedArgs = { command: "save", validation: true, options: {} };
    const validOptions = {
      "--beverage": x => true,
      "--qty": x => true,
      "--empId": x => true,
      "--date": x => true
    };

    const actual = getProcessedArgs(
      ["--save", "--empId", "111", "--beverage", "orange", "--qty", "2"],
      processedArgs,
      validOptions
    );
    const expected = {
      command: "save",
      validation: true,
      options: { empId: "111", beverage: "orange", qty: "2" }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("areSufficientOptionForSave", () => {
  it("should return false if no args for save", () => {
    const processedArgs = { command: "--save", validation: true, options: {} };
    const actual = areSufficientOptSave(processedArgs);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true if all args for save is given", () => {
    const processedArgs = {
      command: "--save",
      validation: true,
      options: { empId: "111", beverage: "orange", qty: "2" }
    };
    const actual = areSufficientOptSave(processedArgs);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false if some args for save is given", () => {
    const processedArgs = {
      command: "--save",
      validation: true,
      options: { empId: "111", beverage: "orange" }
    };
    const actual = areSufficientOptSave(processedArgs);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false if wrong option is given for save", () => {
    const processedArgs = {
      command: "--save",
      validation: true,
      options: { number: "111" }
    };
    const actual = areSufficientOptQuery(processedArgs);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("areSufficientOptionsForQuery", () => {
  it("should return false if no args is given for query", () => {
    const processedArgs = {
      command: "--query",
      validation: true,
      options: {}
    };
    const actual = areSufficientOptQuery(processedArgs);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true if any args given for query", () => {
    const processedArgs = {
      command: "--query",
      validation: true,
      options: { empId: "111" }
    };
    const actual = areSufficientOptQuery(processedArgs);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false if wrong option is given for query", () => {
    const processedArgs = {
      command: "--query",
      validation: true,
      options: { number: "111" }
    };
    const actual = areSufficientOptQuery(processedArgs);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true if multi args is given for query", () => {
    const processedArgs = {
      command: "--query",
      validation: true,
      options: { empId: "111", beverage: "Orange" }
    };
    const actual = areSufficientOptQuery(processedArgs);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isValidOPt", () => {
  it("should return false for wrong option", () => {
    const validOptions = {
      "--beverage": x => true,
      "--qty": x => true,
      "--empId": x => true,
      "--date": x => true
    };
    const opt = "someThing";
    const optVal = "a string";

    const actual = isValidOpt(validOptions, opt, optVal);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true for a only valid option", () => {
    const validOptions = {
      "--beverage": x => true,
      "--qty": x => true,
      "--empId": x => true,
      "--date": x => true
    };
    const opt = "--empId";
    const optVal = "a string";

    const actual = isValidOpt(validOptions, opt, optVal);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false for wrong option-value given", () => {
    const validOptions = {
      "--beverage": x => false,
      "--qty": x => true,
      "--empId": x => true,
      "--date": x => true
    };
    const opt = "--beverage";
    const optVal = "a string";

    const actual = isValidOpt(validOptions, opt, optVal);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isValidBeverage", () => {
  it("should return false if empty string is given", () => {
    const actual = isValidBeverage("");
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true if string is given", () => {
    const actual = isValidBeverage("string");
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isPositiveInteger", () => {
  it("should return false for a string", () => {
    const actual = isPositiveInt("string");
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false for zero", () => {
    const actual = isPositiveInt("0");
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true for a positivenumber greater than zero", () => {
    const actual = isPositiveInt("1");
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isIncludes", () => {
  it("should return false if opt is not include in validOptions", () => {
    const validOptions = {
      "--beverage": x => true,
      "--qty": x => true,
      "--empId": x => true,
      "--date": x => true
    };
    const actual = isIncludes(validOptions, "wrong");
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true if opt is include in validOptions", () => {
    const validOptions = {
      "--beverage": x => true,
      "--qty": x => true,
      "--empId": x => true,
      "--date": x => true
    };
    const actual = isIncludes(validOptions, "--qty");
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isValidDate", () => {
  it("should return false for a string of letters", () => {
    const optVal = "Date";
    const actual = isValidDate(optVal);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true for valid date is given", () => {
    const optVal = "2019-11-28";
    const actual = isValidDate(optVal);
    const expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false for invalid format of date is given", () => {
    const optVal = "28-11-2019";
    const actual = isValidDate(optVal);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false for invalid date is given", () => {
    const optVal = "2019-02-30";
    const actual = isValidDate(optVal);
    const expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});
