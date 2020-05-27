
const mongoClient = require('./index').getClient;

class Model {
  constructor(collectionName, schema) {
    this.collectionName = collectionName
    this.schema = schema
    this.createCollection()
  }

  get schema() {
    return this._schema
  }

  set schema(value) {
    this._schema = value
  }

  get collectionName() {
    return this._collectionName;
  }

  set collectionName(value) {
    this._collectionName = value;
  }

  async createCollection() {
    await mongoClient().createCollection(this.collectionName)
  }

  save() {

  }


}

module.exports = {
  Model
}