const { connection } = require('./events/connection');
const { message2server } = require('./events/message');
const { joinRoom, leaveRoom, newRoom } = require('./events/room');

module.exports = (io, socket) => {
  const usuari = socket.userData;

  connection(io, socket, usuari)

  socket.on('chat-message2server', data => {
    message2server(io, socket, data, usuari)
  })

  socket.on('join-room', room => {
    joinRoom(io, socket, room, usuari)
  })

  socket.on('leave-room', room => {
    leaveRoom(io, socket, room, usuari)
  })

  socket.on('create-room', name => {
    newRoom(io, socket, name, usuari)
  })

};