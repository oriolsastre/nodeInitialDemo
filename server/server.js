const { serverConfig, clientConfig } = require("./config/config");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [`http://${clientConfig.host}:${clientConfig.port}`]
  }
});
//const cors = require("cors");
const socketController = require('./sockets/sockets') 


app.use(express.json(), express.urlencoded({ extended: true }));

io.on('connection', socket => socketController(socket));

server.listen(serverConfig, () => {
  console.log(`Server listening on ${serverConfig.host}:${serverConfig.port}`);
});