const { Schema, Model } = require('../../odm-lib');

//type - Array , Object , Number , Date

const todoSchema = new Schema({
  task: { type: 'string', required: true, default: 'start running' },
  is_done: { type: 'boolean', required: true, default: false }
});

todoSchema.postSave = function() {
  console.log('post');
  return true;
};

todoSchema.preSave = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('pre');
      resolve('pre');
    }, 2000);
  });
};

let todoModel = null;

function Todo() {
   todoModel ? todoModel : todoModel = new Model('todo', todoSchema);
   return todoModel
}

module.exports = { Todo };
