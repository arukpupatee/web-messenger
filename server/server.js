const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

const port = process.env.PORT || 5000;

const api = require("./routes/api");
app.use('/api', api);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("New client connected");

    socket.on('login', username => {
        socket.user = username;
        socket.emit('login success', username);
        socket.emit('new message', {
            type: 'info',
            action: 'joined',
            user: socket.user
        });
        socket.broadcast.emit('new massage', {
            type: 'info',
            action: 'joined',
            user: socket.user
        });
    });

    socket.on('new message', data => {
        socket.emit('new message', {
            type: 'message',
            user: data.user,
            message: data.message
        });
        socket.broadcast.emit('new message', {
            type: 'message',
            user: data.user,
            message: data.message
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected")
        socket.emit('new message', {
            type: 'info',
            action: 'left',
            user: socket.user
        });
        socket.broadcast.emit('new massage', {
            type: 'info',
            action: 'left',
            user: socket.user
        });
    });
});

server.listen(port, () => console.log('Server Listening on port', port));