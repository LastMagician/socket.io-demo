var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var port = process.env.PORT || 8081;

http.listen(port, function() {
  console.log('Your website is running on http://localhost:'+port);
});

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/index.html');
});

var pre = io.on('connection', function(socket) {
  console.log('connected.');
  socket.on('modified event', function(msg) {
      pre.emit('modified html', {
        "button": msg.button
      })
  });

  socket.on('input event', function(msg) {
    pre.emit('input change', {
      "input": msg.input
    });
  })
});
