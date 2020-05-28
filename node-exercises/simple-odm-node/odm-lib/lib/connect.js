const MongoClient = require('./client');

const Connect = function(url, options) {
  if (url.indexOf('mongodb') > -1) {
    return MongoClient.connect(url, options).then((db) => {
      global.CLIENT = db;
      return db;
    });
  } else {
    return Promise.reject(new Error('Unrecognized DB connection url.'));
  }
};

module.exports = {
  Connect
};
