require("dotenv").config({ path: __dirname + "/./../../.env" });
const serverConfig = {
  host: process.env.SERVER_HOST || "localhost",
  port: process.env.SERVER_PORT || 3000,
};

var socket = io.connect(`http://${serverConfig.host}:${serverConfig.port}`, { 
  'forceNew': true 
}); 
socket.on('messages', function(data) { 
  console.log(data);
});