const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('sendMessage', message => {
    console.log('Message received from mobile:', message);
    // Here you can send the message to the desktop or perform any other actions
    // For example, you can broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
