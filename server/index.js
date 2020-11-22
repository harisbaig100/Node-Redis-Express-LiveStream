const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
var redis = require("redis");
var subscriber = redis.createClient();

io.on('connection', socket => {
  subscriber.on("message", function (channel, message) {
    io.emit('message', { message });
    console.log(message);
   });
   subscriber.subscribe("events");
   socket.on('disconnect', () => {
    subscriber.unsubscribe("events")
    socket.disconnect();
  });
})

http.listen(4000, function() {
  console.log('listening on port 4000')
})
