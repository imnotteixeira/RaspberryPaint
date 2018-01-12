var socket;
var serverAddr = config.SERVER_ADDRESS;

function setup() {
  createCanvas(600,600);
  background(40);
  socket = io.connect('http://' + serverAddr);
  socket.on('mousePos', drawMouseReceived);
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  };

  console.log('Sending mousePos: x: ' + mouseX + ' y: ' + mouseY);

  noStroke();
  fill(0,0,255);
  ellipse(data.x, data.y, 16, 16);
  socket.emit('mousePos', data);
}

function drawMouseReceived(data) {
  noStroke();
  fill(255,0,0);
  ellipse(data.x, data.y, 16, 16);
}

function draw() {
  // noStroke();
  // fill(255);
  // ellipse(mouseX, mouseY, 16, 16);
}
