const { Schema, Model } = require('../odm-lib');

//type - Array , Object , Number , Date 

const todoSchema = new Schema({
  task: { type: 'string', required: true,default:"start running" },
  is_done: { type: 'boolean', required: true, default: false },
  created_at:{ type:'date', required: true, default: new Date().toISOString() }
});

todoSchema.postSave = function() {
  console.log('post');
  return true
};

todoSchema.preSave = function() {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      console.log("pre")
      resolve('pre')
    },2000)
  })
};

async function init() {
  try {
    const todoModel = new Model('todo', todoSchema);

    // insertOne sample
    let result = await todoModel.insertOne({ task: 'Buy mobile', is_done: false,created_at: new Date().toISOString()});

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
    // const query = { _id: '5ed02b1f68989c2e40e86437' };
    // const config = {};
    // let result = await todoModel.deleteOne({ query, config });

    //   // find sample
    //  const query = {  };
    //  const projection = {is_done:1}
    //  let result = await todoModel.find({ query });


    console.log(result);
    // console.log(todoModel.schema)
  } catch (error) {
    console.log(error);
  }
}

module.exports = init;
