const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/WebMessenger', { config: { autoIndex: false} });
mongoose.Promise = global.Promise;

const Messages = require('./models/Messages');

const api = require("./routes/api");
app.use('/api', api);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("New client connected");

    socket.on('login', async username => {
        socket.user = username;
        socket.emit('login success', username);
        var data = await Messages.create({
            type: 'info',
            action: 'joined',
            user: socket.user
        });
        socket.emit('new message', data);
        socket.broadcast.emit('new massage', data);
    });

    socket.on('new message', async data => {
        var data = await Messages.create({
            type: 'message',
            user: data.user,
            message: data.message
        });
        socket.emit('new message', data);
        socket.broadcast.emit('new message', data);
    });

    socket.on("disconnect", async () => {
        console.log("Client disconnected")
        var data = await Messages.create({
            type: 'info',
            action: 'left',
            user: socket.user
        });
        socket.emit('new message', data);
        socket.broadcast.emit('new massage', data);
    });
});

server.listen(port, () => console.log('Server Listening on port', port));