const { Todo } = require('../../models');

async function createTodo ({ request, response }) {
  let todo = {};
  todo.task = request.body.task;
  todo.is_done = request.body.is_done == 'true';
  const result = await Todo().insertOne(todo);
  response.json({ status: 200, result });
}


module.exports = {createTodo}