// buddy
const baseController = require('./controller/base');
const fileReader = require('./controller/file')
const { authentication } = require('./lib/middlewares');
const Buddy = require('./lib/server');
try {

  const config = {
    httpsOptions: {},
  }

  const buddyServer = new Buddy(config);

  const bodyMiddleware = () => {
    console.log("bodyMiddleware");
  }

  const parser = async () => {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("promise middleware"), 1000);
    });
    // wait until the promise resolves (*)
    let result = await promise;
    console.log(result);
    return result;
  }

  // MY ROUTES

  buddyServer.route({
    method: 'GET',
    path: '/api/v1/users',
    middlewares: [authentication],
    handler: baseController
  })

  buddyServer.route({
    method: 'GET',
    path: '/api/v1/user/:id/name/:username',
    middlewares: [authentication],
    handler: baseController
  })

  buddyServer.route({
    method: 'GET',
    path: '/file/:name',
    handler: fileReader
  })

  buddyServer.route({
    method: 'POST',
    path: '/user',
    handler: baseController
  })


  buddyServer.addMiddleware([parser]);
  buddyServer.start(8000);
  
} catch (error) {
  console.log(error);
}



process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
  //close server here
  buddyServer.close()
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

process.on('uncaughtException', (err) => {
  console.log(err);
})