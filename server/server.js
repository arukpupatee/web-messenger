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

io.on("connection", function(socket) {
    console.log("New client connected");
    var user = null;

    socket.on('login', async username => {
        user = username;
        socket.user = user;
        var data = {
            type: 'info',
            user: socket.user,
            action: 'joined'
        };
        socket.emit('login success', {
            data: data,
            user: socket.user
        });
    });

    socket.on('fetch history', async () => {
        var history = await Messages.findLast(100);
        socket.emit('fetch history', history);
    });

    socket.on('new message', async messageData => {
        var data = await Messages.create(messageData);
        socket.emit('new message', data);
        socket.broadcast.emit('new message', data);
    });

    socket.on("disconnect", async () => {
        console.log("Client disconnected");
        if (user != null){
            var data = {
                type: 'info',
                user: user,
                action: 'left',
            }
            io.sockets.emit('new message', data);
            Messages.create(data);
        }
    });
});

server.listen(port, () => console.log('Server Listening on port', port));