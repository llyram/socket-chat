const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server);
const cors = require('cors');
const PORT = 4000;

app.use(cors());

io.on('connection', (socket) => {
    console.log(`${socket.id}a user connected`);
    
    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', `${socket.id.substr(0, 2)} : ${msg}`);
    });
});



app.get('/', (req, res) => {
    res.send('<h1>hello</h1>')

});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});