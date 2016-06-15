var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket) {
  console.log('User Welcome');
  io.emit('chat message', 'Welcome');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  })
  socket.on('disconnect', function() {
    console.log('User Disconnect');
    io.emit('chat message', 'User Disconnect');
  })
});



// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// });

// io.emit('some event', { for: 'everyone' });

http.listen(3000, function(){
  console.log('listening on *:3000');
});
