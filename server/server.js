const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

const dbOptions = {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 5000
}
//const mongoUrl = 'mongodb://localhost/WebMessenger'; // for local dev
const mongoUrl = 'mongodb://mongodb:27017/WebMessenger'; // for docker
const connectMongoWithRetry = () => { // reconnect when fail in initial connection
    mongoose.connect(mongoUrl, dbOptions)
        .catch(err => {
            console.log('Failed to connect to mongo on startup - retrying in 5 sec');
            setTimeout(connectMongoWithRetry, 5000);
        });
}
connectMongoWithRetry();

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
        var history = await Messages.findLast(100);
        socket.emit('login success', {
            data: data,
            user: socket.user,
            messageHistory: history
        });
    });

    socket.on('new message', async messageData => {
        socket.emit('new message', messageData);
        socket.broadcast.emit('new message', messageData);
        Messages.create(messageData);
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