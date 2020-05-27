const { Schema,Model } = require('../odm-lib');

const todoSchema = new Schema({
  task: { type: String, required: true },
  is_done: { type: Boolean, required: true, default: false }
});

todoSchema.post('save', function() {
  console.log('post');
});

function init(){
console.log(init)

const todoModel = new Model('todo',todoSchema)
console.log(todoModel)

console.log(todoModel.schema)

}

module.exports=init