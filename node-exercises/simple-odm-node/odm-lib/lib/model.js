const mongoClient = require('./index').getClient;
const { toObjectId, castIds } = require('./utils');
class Model {
  constructor(collectionName, schema) {
    this.collectionName = collectionName;
    this.schema = schema;
    this.createCollection();
  }

  get schema() {
    return this._schema;
  }

  set schema(value) {
    this._schema = value;
  }

  get collectionName() {
    return this._collectionName;
  }

  set collectionName(value) {
    this._collectionName = value;
  }

  async createCollection() {
    try {
      return await mongoClient().createCollection({ collectionName: this.collectionName });
    } catch (error) {
      throw error;
    }
  }

  async insertOne(doc) {
    // validate schema
    // check _id exists in doc ,if yes , cast it to toObjectId()
     doc = castIds(doc);
    return await mongoClient().insertOne({ collectionName: this.collectionName, doc });
  }

  async replaceOne({ query, doc, config }) {
    // validate schema

    // check _id exists in doc ,if yes , cast it to toObjectId()
    query = castIds(query);
    doc = castIds(doc);
    return await mongoClient().replaceOne({ collectionName: this.collectionName, query, doc, config });
  }

  async findOne({ query, projection ={}}) {
    // check _id exists in doc ,if yes , cast it to toObjectId()
    query = castIds(query);
    return await mongoClient().findOne({ collectionName: this.collectionName, query, projection });
  }

  async deleteOne({ query, config}) {
    // check _id exists in doc ,if yes , cast it to toObjectId()
    query = castIds(query);
    return await mongoClient().deleteOne({ collectionName: this.collectionName, query, config });
  }


  find() {
    // await mongoClient().find(this.collectionName,query)
  }
}

module.exports = {
  Model
};
