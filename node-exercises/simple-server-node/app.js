const SimpleServer = require('./server');
const User = require('./user');

const server = new SimpleServer();
const PORT = 8000;

const user = new User('user');

server.Routes = [user];

server.listen( PORT,() => {
    console.log(`server running on ${PORT}`);
});     