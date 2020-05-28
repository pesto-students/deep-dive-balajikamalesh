require('dotenv').config();
const init = require('./modal')
const { Schema, Connect } = require('../odm-lib');
const SimpleServer = require('../simple-server-node');
const baseController = require('./controller/base');

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
    path: '/api/v1/users',
    middlewares: [],
    handler: baseController
  });

  simpleServer.route({
    method: 'GET',
    path: '/api/v1/user/:id/name/:username',
    middlewares: [],
    handler: baseController
  });

  simpleServer.route({
    method: 'GET',
    path: '/file/:name',
    handler: baseController
  });

  simpleServer.route({
    method: 'POST',
    path: '/user',
    handler: baseController
  });

  simpleServer.start(8000);

  Connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(database) {
      db = database;
      console.log('connected successfully to DB');

      // initialise model
      init()
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
