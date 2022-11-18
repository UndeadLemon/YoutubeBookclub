const express = require('express');
const cors = require('cors')
const app = express();
require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
require('./server/routes/video.routes')(app);
const port = 8000;
    
const server = app.listen(port, () =>
  console.log(`The server is all fired up on port ${port}`)
);


const io = require('socket.io')(server, { cors: true });

io.on("connection", socket => {
    socket.on("message", data => {
        console.log(data)
        socket.broadcast.emit("new_message", data)
    })
    console.log(socket.id)
})