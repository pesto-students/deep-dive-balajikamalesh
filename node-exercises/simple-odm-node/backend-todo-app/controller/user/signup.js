const { User } = require('../../models/');

async function signUp({ request, response }) {
  //
  // insertOne sample
  let result = await User.insertOne({});
  response.json({ status: 200, result: 'OK' });
}

module.exports = { signUp };
