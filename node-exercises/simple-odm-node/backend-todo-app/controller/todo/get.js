const { Todo } = require('../../models');

async function getTodo ({ request, response }) {
  //if id supplied return only one todo
  //else return all
  const result = await Todo().find({})
  
  response.json({ status: 200, result });
}


module.exports = {getTodo}