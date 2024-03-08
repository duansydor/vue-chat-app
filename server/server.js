const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Escutando por mensagens enviadas pelos clientes
    socket.on('message', (message) => {
        console.log('Message received:', message);

        // Retransmitindo a mensagem para todos os clientes, incluindo o UUID original

        io.emit('message', message);
    });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
