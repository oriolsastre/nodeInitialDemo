const { createMessage } = require('../helpers/message')
module.exports = (io, socket) => {
  const usuari = socket.userData;

  socket.on('chat-message2server', async (data) => {
    const clientMessageID = Date.now().toString()+usuari.id+data.currentRoom;
    io.emit('chat-message2client', {message: {text: data.message, id: clientMessageID}, userData: usuari})
    /* Tractar i guardar el missatge. */
    try {
      await createMessage(usuari.id, data.currentRoom, data.message)
      
    } catch (error) {
      io.emit('remove-message', clientMessageID)
      console.error(error)
    }
  })

};