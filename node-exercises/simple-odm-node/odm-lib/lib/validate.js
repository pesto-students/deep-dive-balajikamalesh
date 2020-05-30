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

const isArray = function(a) {
  return Array.isArray(a);
};

const isType = function(value, type) {
  if (type === "string") {
    return isString(value);
  } else if (type === "number") {
    return isNumber(value);
  } else if (type === "boolean") {
    return isBoolean(value);
  } else if (type === "array" || isArray(type)) {
    return isArray(value);
  } else if (type === "object") {
    return isObject(value);
  } else {
    throw new Error('Unsupported type: ' + type.name);
  }
};

const isValidType = function(value, type) {
  if (value === null) return true;

  if (value === undefined) return true;

  if (type === Array || isArray(type)) {
    if (isArray(type) && type.length > 1) {
      throw new Error('Unsupported type. Only one type can be specified in arrays, but multiple found:', +type);
    }

    if (isArray(type) && type.length === 1 && isArray(value)) {
      let arrayType = type[0];
      for (let i = 0; i < value.length; i++) {
        let v = value[i];
        if (!isType(v, arrayType)) {
          return false;
        }
      }
    } else if (isArray(type) && type.length === 0 && !isArray(value)) {
      return false;
    } else if (type === Array && !isArray(value)) {
      return false;
    }

    return true;
  }

  return isType(value, type);
};

exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isType = isType;
exports.isValidType = isValidType;
