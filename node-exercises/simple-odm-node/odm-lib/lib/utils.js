const ObjectId = require('mongodb').ObjectId;
const { isType,isObject } = require('./validate');


const isArray = (arr) => {
  return Array.isArray(arr);
};

const isString = (str) => {
  return typeof srt === 'string';
};

const deepTraverse = (obj, func) => {
  for (let i in obj) {
    func.apply(this, [i, obj[i], obj]);
    if (obj[i] !== null && typeof obj[i] == 'object') {
      deepTraverse(obj[i], func);
    }
  }
};

const toObjectId = (arg) => {
  if (Array.isArray(arg)) {
    return arg.map((val) => {
      return new ObjectId(val);
    });
  }
  return new ObjectId(arg);
};

const castIds = function(query) {
  deepTraverse(query, (key, val, parent) => {
    if (key === '_id') {
      if (isObject(parent[key])) {
        for (const [k,value] of Object.entries(parent[key])) {
          parent[key][k] = toObjectId(value);
        }
      } else {
        parent[key] = toObjectId(parent[key]);
      }
    }
  });
  return query;
};

const validateSchema = function(schemaFields, object) {
  for(let column in schemaFields){
    let isValidField = (schemaFields[column].required ? schemaFields[column].required : true) 
                       && object[column] !== undefined 
                       && isType(object[column],schemaFields[column].type);
    if(!isValidField) {
      throw new Error('Object Schema mismatch');
    }
  }
}

const setDefaults = function(schemaFields, object) {
  for(let column in schemaFields){
    if(object[column] === undefined && schemaFields[column].required && schemaFields[column].default){
        object[column] = schemaFields[column].default;
    }
  }
  return object;
}

module.exports = {
  isArray,
  isString,
  deepTraverse,
  toObjectId,
  castIds,
  validateSchema,
  setDefaults
};
