const { isArray, isString, deepTraverse } = require('./utils');
const MDBClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const isObject = require('mongodb').ObjectId; //require('../validate').isObject;

class MongoClient {
  constructor(url, mongoClient) {
    this._mongoClient = mongoClient;
  }

  createCollection = (collectionName) => {
    const db = this._mongoClient.db();
    db.createCollection(collectionName, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  };

  static connect(url, options) {
    if (typeof options === 'undefined') {
      options = {};
    }
    return new Promise((resolve, reject) => {
      new MDBClient.connect(url, options, (error, mongoClient) => {
        if (error) return reject(error);
        return resolve(new MongoClient(url, mongoClient));
      });
    });
  }
}


module.exports = MongoClient;
