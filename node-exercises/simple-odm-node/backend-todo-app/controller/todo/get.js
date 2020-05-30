const { Todo } = require('../../models');

async function getTodo ({ request, response }) {
  const result = await Todo().find({})
  response.json({ status: 200, result });
}

module.exports = {getTodo}