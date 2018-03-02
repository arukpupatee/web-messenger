const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

const port = process.env.PORT || 3000;

const api = require("./routes/api");
app.use('/api', api);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("New client connected");

    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log('Server Listening on port', port));