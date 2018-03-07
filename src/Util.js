const obj2arg = require("graphql-obj2arg");

function paramsToString(params) {
  return obj2arg(params, { noOuterBraces: true });
}

function objectToParams(params) {}

module.exports = {
  paramsToString
};
