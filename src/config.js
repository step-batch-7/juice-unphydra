const getPath = function(env) {
  return env.JS_Data_PATH || "./data/transactionData.json";
};

const getDate = function(env) {
  return env.JS_DATE ? new Date(env.JS_DATE) : new Date();
};

exports.getPath = getPath;
exports.getDate = getDate;
