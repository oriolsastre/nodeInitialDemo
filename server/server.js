const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const { serverConfig } = require("./config/config");
const socketController = require('./sockets/sockets') 

require('./sockets/sockets')(io);

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

io.on( 'connection', socket => {
  console.log("S'ha connectat un client");
} );

server.listen(serverConfig, () => {
  console.log(`Server listening on ${serverConfig.host}:${serverConfig.port}`);
});