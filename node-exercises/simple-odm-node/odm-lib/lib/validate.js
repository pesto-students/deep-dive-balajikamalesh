const DB = require('./client').getClient;

const isString = function(str) {
  return str && typeof str === 'string';
};

const isNumber = function(value) {
  return typeof value === 'number';
};

const isBoolean = function(value) {
  return typeof value === 'boolean';
};

const isObject = (obj) => {
  return obj != null && obj.constructor.name === 'Object';
};

const isDate = (date) => {
  return (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ) ? true : false;
}

const isArray = function(a) {
  return Array.isArray(a);
};

const isType = function(value, type) {
  if (type === 'string') {
    return isString(value);
  } else if (type === 'number') {
    return isNumber(value);
  } else if (type === 'boolean') {
    return isBoolean(value);
  } else if (type === 'array' || isArray(type)) {
    return isArray(value);
  } else if (type === 'object' ) {
    return isObject(value);
  } else if ( type === 'date') {
    return isDate(value);
  } else {
    throw new Error('Unsupported type: ' + type.name);
  }
};



exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isType = isType;

