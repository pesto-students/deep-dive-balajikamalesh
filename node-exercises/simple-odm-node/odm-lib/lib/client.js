const MDBClient = require('mongodb').MongoClient;

class MongoClient {
  constructor(url, mongoClient) {
    this._mongoClient = mongoClient;
    this.db = this._mongoClient.db();
  }

  get db() {
    return this._db;
  }

  set db(value) {
    this._db = value;
  }

  createCollection = async ({collectionName}) => {
    return await this._db.createCollection(collectionName);
  };

  insertOne = async ({collectionName, doc}) => {
    const collection = this._db.collection(collectionName);
    return await collection.insertOne(doc);
  };

  replaceOne = async ({ collectionName,query, doc, config={} }) => {
    const collection = this._db.collection(collectionName);
    return await collection.replaceOne(query, doc, config);
  };

  findOne = async ({ collectionName,query, projection={} }) => {
    const collection = this._db.collection(collectionName);
    return await collection.findOne(query, projection);
  };

  deleteOne = async ({ collectionName,query, config={} }) => {
    const collection = this._db.collection(collectionName);
    return await collection.deleteOne(query, config);
  };

  close = () => {
    return new Promise((resolve, reject) => {
      console.log('closing DB connection');
      this._mongoClient.close(function(error) {
        if (error) return reject(error);
        return resolve();
      });
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


