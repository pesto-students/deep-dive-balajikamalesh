const express = require('express');
const socketio = require('socket.io');
const http = require('http');
var uniqid = require('uniqid');
const randColor = require('./utils/randomColors');
const getRandomPosition = require('./utils/randomPosition');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();

const server = http.createServer(app);
const io = socketio(server);
app.use(router);

let noOfPlayers = 0;
let snakes = [];
let snakesColor = [];
let bait = getRandomPosition();

io.on('connection', (socket) => {
    ++noOfPlayers;
    console.log(`A new player joined - ${noOfPlayers}`);
    let id = uniqid();
    
    snakes.push({ id:id, snake:[...Array(5).keys()].map(x => [2*noOfPlayers, 2*x]) });
    snakesColor.push(randColor());

    socket.emit('snakeCreated', {snakes,snakesColor,bait,id});
    socket.broadcast.emit('snakeCreated', {snakes,snakesColor,bait});

    socket.on('disconnect', () => {
        socket.emit('destroysnake');
        console.log('Player has left the game');
    })
})


server.listen(PORT, () => {
    console.log('server has started!!');
})