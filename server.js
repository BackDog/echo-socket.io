'use strict';

const express = require('express');
// const socketIO = require('socket.io');

//const PORT = process.env.PORT || 3000;

const PORT = 9090;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, {
        root: __dirname
    }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const {Server} = require('ws');

const wss = new Server({server});

var connections = [];
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', function(message) {
        wss.clients.forEach((client) => {
            client.send(message);
        });
    });
    ws.on('close', () => console.log('Client disconnected'));
});


// const io = socketIO(server);

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
