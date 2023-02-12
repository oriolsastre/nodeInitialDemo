const { Models } = require('../database/initModels')
module.exports = (socket) => {

  socket.on('chat-message2server', message => {
    socket.emit('chat-message2client', {message})
    /* Tractar i guardar el missatge. */
  })

};