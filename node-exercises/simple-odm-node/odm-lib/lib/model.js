const mongoClient = require('./index').getClient;
const { toObjectId, castIds, validateSchema, setDefaults } = require('./utils');
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
    validateSchema(this._schema.fields, doc);
    // check _id exists in doc ,if yes , cast it to toObjectId()
    doc = castIds(doc);
    doc = setDefaults(this._schema.fields, doc);
    await this.preSaveHook();
    const { result } = await mongoClient().insertOne({ collectionName: this.collectionName, doc });
    await this.postSaveHook();
    return result;
  }

  async replaceOne({ query, doc, config }) {
    // validate schema
    validateSchema(this._schema.fields, doc);
    // check _id exists in doc ,if yes , cast it to toObjectId()
    query = castIds(query);
    doc = castIds(doc);
    doc = setDefaults(this._schema.fields, doc);
    return await mongoClient().replaceOne({ collectionName: this.collectionName, query, doc, config });
  }

  async findOne({ query, projection = {} }) {
    // check _id exists in doc ,if yes , cast it to toObjectId()
    query = castIds(query);
    return await mongoClient().findOne({ collectionName: this.collectionName, query, projection });
  }

  async deleteOne({ query, config }) {
    // check _id exists in doc ,if yes , cast it to toObjectId()
    query = castIds(query);
    return await mongoClient().deleteOne({ collectionName: this.collectionName, query, config });
  }

  async find({ query = {} }) {
    // check _id exists in doc ,if yes , cast it to toObjectId()
    query = castIds(query);
    return await mongoClient().find({ collectionName: this.collectionName, query });
  }

  async preSaveHook() {
    if (this._schema.hasOwnProperty('preSave')) {
      return await this._schema.preSave();
    }
  }

  async postSaveHook() {
    if (this._schema.hasOwnProperty('postSave')) {
      return await this._schema.postSave();
    }
  }
}

module.exports = {
  Model
};
