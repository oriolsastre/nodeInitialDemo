const { connection } = require('./events/connection');
const { message2server } = require('./events/message');
const { joinRoom, leaveRoom, newRoom } = require('./events/room');

connectedUsers = [];

module.exports = (io, socket) => {
  const usuari = socket.userData;
  connectedUsers.push({name: usuari.name, id: usuari.id, socket: socket.id})

  connection(io, socket, {usuari, connectedUsers})

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

  socket.on('disconnect', data => {
    //refrescar pàgina/tancar pestanya -> transport close
    //logout -> client namespace disconnect
    //altres -> transport error
    
    connectedUsers.splice(connectedUsers.findIndex(user => user.id==usuari.id),1)
    io.emit('user-disconnected', usuari)
  })

};