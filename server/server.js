const { serverConfig, clientConfig } = require("./config/config");
const express = require("express");
const cors = require("cors")
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: [`http://${clientConfig.host}:${clientConfig.port}`] }
});
const { initDB } = require('./database/initModels')
const socketController = require('./sockets/sockets') 

initDB()

app.use(cors({origin:`http://${clientConfig.host}:${clientConfig.port}`}))
app.use(express.json(), express.urlencoded({ extended: true }));
app.use('/api', require('./routes'))

io.on('connection', socket => socketController(socket));

server.listen(serverConfig, () => {
  console.log(`Server listening on ${serverConfig.host}:${serverConfig.port}`);
});