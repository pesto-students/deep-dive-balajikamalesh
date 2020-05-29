require('dotenv').config();
const init = require('./model')
const { Schema, Connect } = require('../odm-lib');
const SimpleServer = require('../simple-server-node');
const { getTodo , createTodo } = require('./controller/todo/index');
const { login, signup } = require('./controller/user/index');

let db = null;
let simpleServer = null;

try {
  const config = {
    httpsOptions: {}
  };

  simpleServer = new SimpleServer(config);

  // ROUTES
  simpleServer.route({
    method: 'GET',
    path: '/todos',
    middlewares: [],
    handler: getTodo
  });

  simpleServer.route({
    method: 'POST',
    path: '/todo',
    middlewares: [],
    handler: createTodo
  });

  simpleServer.route({
    method: 'POST',
    path: '/login',
    handler: login
  });

  simpleServer.route({
    method: 'POST',
    path: '/signup',
    handler: signup
  });

  simpleServer.start(8000);

  Connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(database) {
      db = database;
      console.log('connected successfully to DB');

      // initialise model
       init()
       .then()
       .catch()
    })
    .catch((error) => {
      console.log(error);
    });

} catch (error) {
  console.log(error);
} 

function cleanup() {
  console.log('cleaning up...');
  db ? db.close() : '';
  simpleServer ? simpleServer.close() : '';
}

process.on('exit', cleanup);
process.on('uncaughtException', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
