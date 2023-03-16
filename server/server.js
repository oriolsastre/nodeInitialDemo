const { serverConfig } = require("./config/config");
const express = require("express");
const cors = require("cors")
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: `*` }
});
const { initDB } = require('./database/initModels')
const socketController = require('./sockets/sockets')

initDB()

app.use(cors({origin:`*`}))
app.use(express.json(), express.urlencoded({ extended: true }));
app.use('/', require('./routes'))

io.use(require('./middlewares/socket'))
io.on('connection', socket => socketController(io, socket));

server.listen(serverConfig.port, () => {
  console.log(`Server listening on port ${serverConfig.port}`);
});