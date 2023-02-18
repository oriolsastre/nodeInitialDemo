const { getMessages } = require('../../helpers/message')

const joinRoom = async (io, socket, room, usuari) => {
    socket.join(`${room}`)
    socket.to(`${room}`).emit('user-joinedRoom', usuari.name)
    try {
      const roomMessages = await getMessages(room, 20)
      socket.emit('room-fetchMessages', roomMessages)
    } catch (error) {
      console.error(error)
    }
}

const leaveRoom = (io, socket, room, usuari) => {
    socket.to(`${room}`).emit('user-leftRoom', usuari.name)
    socket.leave(`${room}`)
}

module.exports = { joinRoom, leaveRoom }