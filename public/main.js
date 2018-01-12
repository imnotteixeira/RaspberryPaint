var socket;

function startup() {
  socket = io.connect('http://' + config.SERVER_ADDRESS);
  socket.on('chatMessage', processChatMessage);
}

function sendMsg() {
  var inputBox = document.getElementById('msgInput');
  var msgText = inputBox.value;
  inputBox.value = "";

  sendChatMessage(msgText);
}

function sendChatMessage(msg) {
  var data = {
    'message' : msg
  }

  socket.emit('chatMessage', data);
}

function processChatMessage(data) {

  var para = document.createElement("p");
  //var node = document.createTextNode("<b>"+data.address + "</b>: " + data.message);
  //para.appendChild(node);

  document.body.appendChild(para);

  para.innerHTML = "<b>"+data.address + "</b>: " + data.message;
}


startup();
