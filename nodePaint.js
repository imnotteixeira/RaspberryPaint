var express = require('express');

var app = express();

var server = app.listen(8080);
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.on('connection', newConnection);

function newConnection(socket) {
  console.log("New connection: ID=(" + socket.id + ")");

  let newConnectionInfo = {
    connID : socket.id,
    clientIP : socket.handshake.address,
  };

  io.sockets.emit('newConnection', newConnectionInfo);
  //console.dir(socket);
  socket.on('mousePos', mouseMsg);
  socket.on('chatMessage', broadcastMsg);


  function mouseMsg(data) {
    //console.log(data);

    //To send to all sockets but the one that sent the message in the first place
    socket.broadcast.emit('mousePos', data);

    //To send to all sockets
    //io.sockets.emit('mousePos', data);
  }

  function broadcastMsg(data) {
    let msgDetails = {
      connID : socket.id,
      clientIP : socket.handshake.address,
      message : data.message,
      nickname : data.nickname
    };
    io.sockets.emit('chatMessage', msgDetails);
  }

}



console.log("started server");
