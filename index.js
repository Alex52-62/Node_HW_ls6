const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

const io = socket(server);
io.on('connection', client => {
    console.log(client.id);
    console.log(io.sockets.server.engine.clientsCount);
        payload2 = {
            message: client.id,
            counter:io.sockets.server.engine.clientsCount,
    };
    client.broadcast.emit('server-msg2', payload2);
    client.emit('server-msg2', payload2);


    client.on('client-msg', data => {
        console.log(data);
        const payload = {
            message: data.message,
            user: client.id,
            counter:io.sockets.server.engine.clientsCount,
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });

    client.on('disconnect', payload1 => {
        console.log('disconnected! User: '+ client.id);
        console.log(io.sockets.server.engine.clientsCount);

        payload1 = {
            message: client.id,
        };

        client.broadcast.emit('server-msg1', payload1);
        client.emit('server-msg1', payload1);
    });
});

server.listen(5555);
