const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

/* connect to database */
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

/* models */
const Messages = require('./models/Messages');

/* routes */
const api = require("./routes/api");
app.use('/api', api);

/* server initialize */
const server = http.createServer(app); // create express server
const io = socketIo(server); // create socket server

/* socket server event handler */
io.on("connection", function(socket) {
    console.log("New client connected");
    var user = null;

    socket.on('login', async username => {
        /*
        username = String
        */
        user = username;
        socket.user = user; // save user into socket

        // message for user joined notification
        var data = { 
            type: 'info',
            user: socket.user,
            action: 'joined',
            timestamp: Date.now()
        };
        
        // query last 100 message
        var history = await Messages.findLast(100);

        // send notification with last 100 message
        socket.emit('login success', { 
            data: data,
            user: socket.user,
            messageHistory: history
        });
    });

    socket.on('new message', async messageData => {
        /*
        messageData = {
            type: String,
            user: String,
            message: String,
        }
        */
        var data = messageData;
        data.timestamp = Date.now(); // server add timestamp to message

        // send message to all user and insert to db
        socket.emit('new message', data);
        socket.broadcast.emit('new message', data);
        Messages.create(data);
    });

    socket.on("disconnect", async () => {
        console.log("Client disconnected");
        if (user != null){ // if user doesn't login -> don't notification
            // message for user left notification
            var data = {
                type: 'info',
                user: user,
                action: 'left',
                timestamp: Date.now()
            }

            // send notification to all user and insert to db
            io.sockets.emit('new message', data); 
            Messages.create(data);
        }
    });
});

/* start server */
server.listen(port, () => console.log('Server Listening on port', port));