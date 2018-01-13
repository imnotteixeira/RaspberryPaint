var socket;

var serverAddr = config.SERVER_ADDRESS;

function setup() {
  createCanvas(600,600);
  background(40);
  socket = io.connect('http://' + serverAddr);
  socket.on('mousePos', drawMouseReceived);
  socket.on('newConnection', showNewConnection);
  socket.on('chatMessage', showMsg);
}

function showNewConnection(data) {
  let para = document.createElement("p");
  //var node = document.createTextNode("<b>"+data.address + "</b>: " + data.message);
  //para.appendChild(node);

  document.getElementById('chat').appendChild(para);

  para.innerHTML = "A new user has joined with ip: <b>"+data.clientIP + "</b>! ";

  console.log(data.clientIP);
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

}


/*****************************************/
//CHAT


function showMsg(data) {
  let para = document.createElement("p");
  //var node = document.createTextNode("<b>"+data.address + "</b>: " + data.message);
  //para.appendChild(node);

  document.getElementById('chat').appendChild(para);

  para.innerHTML = "<b>"+data.nickname + "</b>: " + data.message;

  console.log(data.clientIP);
}

function sendMsg() {
  let inputBox = document.getElementById('msgInput');
  let nick = document.getElementById('nickInput').value;
  let msgText = inputBox.value;
  inputBox.value = "";

  var messageInfo = {
    'message' : msgText,
    'nickname' : nick
  }

  socket.emit('chatMessage', messageInfo);
}
