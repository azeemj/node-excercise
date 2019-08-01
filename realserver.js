var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var clients = 0;
io.on('connection', function(socket) {
   clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });

    // listen to incoming bids
    socket.on('bid', (message) => {
         console.log('Send message -- server side', message);
         io.emit('bid', message); //broadcast to all clients 
         //io.emit('receiveMessage', chatMessage(message.from, message.text));
         socket.emit('newMessage','your last price was'+message.amount); //private message to the specific client only 
        var chatMessage =(from,text )=>{
         return {
            from,
            text,
            time:new Date().getTime
         };
        }
      
      
      
      });

     

});



// io.on('bid', function(content) { console.log('Azeem',content);

// // echo to the sender
// io.socket.emit('bid', content["amount"]);

// // broadcast the bid to all clients
// socket.broadcast.emit('bid', socket.id + 'bid: ' + content["amount"]);

// });

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});


// io.on('connection', socket => {
//    console.log('New user connected -- msg from server');
//    /* socket.emit does Welcome message to new chatter */
//    socket.emit('newMessage', chatMessage('Chatbot', 'Welcome'));
//    /* socket.braodcast.emit from Admin to new user joined. */
//    socket.broadcast.emit(
//        'newMessage',
//        generatedMessage('Chatbot', 'New User joined')
//    );
//     /* socket.on listens "sendMessage" from client and io.emit sends the message out to clients */
//    socket.on('sendMessage', (message) => {
//    console.log('Send message -- server side', message);
//    io.emit('receiveMessage', chatMessage(message.from, message.text));
//    });


// const chatMessage = (from, text) => {
//    return {
//        from,
//        text,
//        time: new Date().getTime()
//   };
// };
// });