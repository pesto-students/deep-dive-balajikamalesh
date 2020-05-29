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



  /**
   * Find documents
   *
   * @param {String} collection Collection's name
   * @param {Object} query Query
   * @param {Object} options
   * @returns {Promise}
   */
  // find(collection, query, options) {
  //   const that = this;
  //   query = castQueryIds(query);
  //   return new Promise(function(resolve, reject) {
  //     const db = that._mongoClient.collection(collection);
  //     let cursor = db.find(query);
  //     if (options.sort && (isArray(options.sort) || isString(options.sort))) {
  //       let sortOptions = {};
  //       if (!isArray(options.sort)) {
  //         options.sort = [options.sort];
  //       }

  //       options.sort.forEach(function(s) {
  //         if (!_.isString(s)) return;

  //         let sortOrder = 1;
  //         if (s[0] === '-') {
  //           sortOrder = -1;
  //           s = s.substring(1);
  //         }
  //         sortOptions[s] = sortOrder;
  //       });

  //       cursor = cursor.sort(sortOptions);
  //     }
  //     if (typeof options.skip === 'number') {
  //       cursor = cursor.skip(options.skip);
  //     }
  //     if (typeof options.limit === 'number') {
  //       cursor = cursor.limit(options.limit);
  //     }
  //     cursor.toArray(function(error, docs) {
  //       if (error) return reject(error);
  //       return resolve(docs);
  //     });
  //   });
  // }
