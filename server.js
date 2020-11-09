const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));



// Se indica el directorio donde se almacenarán las plantillas
app.set('views', './views');

const FAKE_UPLOADS_DIR = __dirname + '/public/';
app.use('/coupon', express.static(FAKE_UPLOADS_DIR));

app.use(cors())

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'ejs');
app.get('/chat', (req, res) => {
    res.render("index")
})

http.listen(app.get('port'), () => {
    console.log("Node app is running at localhost:" + app.get('port'))
});

app.use(cors())
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("sendMessage", function(data){
      console.log(data)
    socket.broadcast.emit("messageReceived", data)
  })
});
