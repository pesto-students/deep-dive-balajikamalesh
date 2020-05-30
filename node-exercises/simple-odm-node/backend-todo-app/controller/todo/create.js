const { Todo } = require('../../models');

async function createTodo ({ request, response }) {
  //if id supplied return only one todo
  //else return all
  response.json({ status: 200, result: 'OK' });
}


module.exports = {createTodo}