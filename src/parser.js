const isIncludes = function(validOptions, opt) {
  return Object.keys(validOptions).includes(opt);
};

const isValidBeverage = function(optVal) {
  return optVal !== "";
};

const isPositiveInt = function(optVal) {
  return Number.isInteger(+optVal) && +optVal > 0;
};

const isValidDate = function(optVal) {
  const regexp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
  const isValidFormat = regexp.test(optVal);
  const newDate = new Date(optVal).toJSON() || "";
  const isDateValid = newDate.slice(0, 10) === optVal;
  return isValidFormat && isDateValid;
};

const isValidOpt = function(validOptions, opt, optVal) {
  return isIncludes(validOptions, opt) && validOptions[opt](optVal);
};

const areSufficientOptSave = function(processedArgs) {
  const options = processedArgs.options;
  return (
    processedArgs.command === "--save" &&
    options.hasOwnProperty("empId") &&
    options.hasOwnProperty("beverage") &&
    options.hasOwnProperty("qty")
  );
};

const areSufficientOptQuery = function(processedArgs) {
  const options = processedArgs.options;
  return (
    processedArgs.command === "--query" &&
    (options.hasOwnProperty("empId") ||
      options.hasOwnProperty("beverage") ||
      options.hasOwnProperty("date"))
  );
};

const areSufficientsOpt = function(processedArgs) {
  return (
    areSufficientOptSave(processedArgs) || areSufficientOptQuery(processedArgs)
  );
};

const getProcessedArgs = function(args, processedArgs, validOptions) {
  for (let i = 1; i < args.length; i += 2) {
    let opt = args[i];
    let optVal = args[i + 1];
    if (!isValidOpt(validOptions, opt, optVal)) {
      processedArgs.validation = false;
      return processedArgs;
    }
    processedArgs.options[opt.slice(2)] = optVal;
  }
  return processedArgs;
};

const parser = function(args) {
  let processedArgs = { command: args[0], validation: true, options: {} };
  let validOptions = {
    "--beverage": isValidBeverage,
    "--qty": isPositiveInt,
    "--empId": isPositiveInt,
    "--date": isValidDate
  };

  processedArgs = getProcessedArgs(args, processedArgs, validOptions);

  if (!areSufficientsOpt(processedArgs)) {
    processedArgs.validation = false;
    return processedArgs;
  }

  processedArgs.options.empId = +processedArgs.options.empId;
  processedArgs.options.qty &&
    (processedArgs.options.qty = +processedArgs.options.qty);

  return processedArgs;
};

module.exports = {
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
};
