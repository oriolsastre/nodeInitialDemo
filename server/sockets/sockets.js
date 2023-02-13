const { Models } = require('../database/initModels')
module.exports = (io, socket) => {

  //afegir usuari a room 1 joinRoom


  socket.on('chat-message2server', (data) => {
    io.emit('chat-message2client', data.message)
    /* Tractar i guardar el missatge. */
  })

};