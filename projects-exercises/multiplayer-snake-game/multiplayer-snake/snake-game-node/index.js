const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();

const server = http.createServer(app);
const io = socketio(server);
app.use(router);


io.on('connection', (socket) => {
    socket.on('newplayer', () => {
        console.log('new player has joined');
        socket.emit('createsnake');
    });

    socket.on('disconnect', () => {
        socket.emit('destroysnake');
        console.log('Player has left the game');
    })
})


server.listen(PORT, () => {
    console.log('server has started!!');
})