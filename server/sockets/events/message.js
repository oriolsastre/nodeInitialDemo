const {createMessage} = require('../../helpers/message')

const message2server = (io, socket, data, usuari) => {
    const clientMessageID = Date.now().toString()+usuari.id+data.currentRoom;
    io.in(`${data.currentRoom}`).emit('chat-message2client', {message: {text: data.message, id: clientMessageID, createdAt: new Date()}, sender: usuari.name})
    /* Tractar i guardar el missatge. */
    createMessage(usuari.id, data.currentRoom, data.message)
        .catch(error => {
            io.emit('remove-message', clientMessageID)
            console.log("Error desant missatge al BD")
            console.error(error)
        })
}

module.exports = {message2server}