const assert = require("assert");
const optionLib = require("../src/optionLib.js");
const transactionRecorder = optionLib.transactionRecorder;

describe("transactionRecorder", () => {
  it("should give a message of transaction", () => {
    const fs = {
      readFileSync: x => {
        return "{}";
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
      232425,
      fs
    );
    const expected =
      "Transaction Recorded:\n" +
      "Employee ID,Beverage,Quantity,Date\n" +
      "11111,Orange,1," +
      232425;
    assert.deepStrictEqual(actual, expected);
  });
});
