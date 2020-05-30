const { User } = require('../../models/');

async function signUp({ request, response }) {
  let user = {};
  user.username = request.body.username;
  user.password = request.body.password;
  let result = await User().insertOne(user);
  response.json({ status: 200, result });
}

module.exports = { signUp };
