const assert = require("assert");
const { transactionRecorder } = require("../src/optionLib.js");

describe("transactionRecorder", () => {
  it("should give wrong input for no args", () => {
    const fs = {
      readFileSync: x => {
        return "[]";
      },
      writeFileSync: x => {
        return undefined;
      },
      existsSync: x => {
        return true;
      }
    };
    const actual = transactionRecorder(
      "./transactionData.json",
      [],
      "232425",
      fs
    );
    const expected = "wrong Input";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give message for save command with args", () => {
    const fs = {
      readFileSync: x => {
        return "[]";
      },
      writeFileSync: x => {
        return undefined;
      },
      existsSync: x => {
        return true;
      }
    };
    const actual = transactionRecorder(
      "somePath",
      ["--save", "--empId", "123", "--beverage", "Orange", "--qty", "2"],
      "232425",
      fs
    );
    const expected =
      "Transaction Recorded:\n" +
      "Employee ID,Beverage,Quantity,Date\n" +
      "123,Orange,2,232425\n";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give message for query command with args", () => {
    const fs = {
      readFileSync: x => {
        return "[]";
      },
      writeFileSync: x => {
        return undefined;
      },
      existsSync: x => {
        return true;
      }
    };
    const actual = transactionRecorder(
      "somePath",
      ["--query", "--empId", "123", "--beverage", "Orange", "--qty", "2"],
      "232425",
      fs
    );
    const expected = "Employee ID,Beverage,Quantity,Date\n" + "Total: 0";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give message for query command with empId", () => {
    const fs = {
      readFileSync: x => {
        return "[]";
      },
      writeFileSync: x => {
        return undefined;
      },
      existsSync: x => {
        return true;
      }
    };
    const actual = transactionRecorder(
      "somePath",
      ["--query", "--empId", "123"],
      "232425",
      fs
    );
    const expected = "Employee ID,Beverage,Quantity,Date\n" + "Total: 0";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give message for query command with date", () => {
    const fs = {
      readFileSync: x => {
        return "[]";
      },
      writeFileSync: x => {
        return undefined;
      },
      existsSync: x => {
        return true;
      }
    };
    const actual = transactionRecorder(
      "somePath",
      ["--query", "--date", "2019-12-24"],
      "232425",
      fs
    );
    const expected = "Employee ID,Beverage,Quantity,Date\n" + "Total: 0";
    assert.deepStrictEqual(actual, expected);
  });
});
