const { User } = require('../../models');

async function login({ request, response }) {
  let query = { username: request.body.username, password: request.body.password }
  let user = await User().find({ query });
  
  if(user.length > 0){
    response.json({ status: 200, result: 'OK' });
  } else {
    response.json({ status: 404, result: 'User not found' });
  }
}

module.exports = { login };
