const { Schema, Model } = require('../odm-lib');

const todoSchema = new Schema({
  task: { type: String, required: true },
  is_done: { type: Boolean, required: true, default: false }
});

todoSchema.post('save', function() {
  console.log('post');
});

async function init() {
  try {
    const todoModel = new Model('todo', todoSchema);

    // insertOne sample
    // await todoModel.insertOne({ task: 'Buy mobile', is_done: false });

    // replaceOne sample
    // const query = { _id: '5ed02baae372152e8b0c627f' };
    // const doc = { task: 'Run 1km daily', is_done: false };
    // const config = { upsert: true };
    // let result = await todoModel.replaceOne({ query, doc, config });

    // findOne sample
    //  const query = { _id: '5ed02b1f68989c2e40e86437' };
    //  const projection = {is_done:1}
    //  let result = await todoModel.findOne({ query ,projection });

    // deleteOne sample
    const query = { _id: '5ed02b1f68989c2e40e86437' };
    const config = {};
    let result = await todoModel.deleteOne({ query, config });

    console.log(result);
    // console.log(todoModel.schema)
  } catch (error) {
    console.log(error);
  }
}

module.exports = init;
