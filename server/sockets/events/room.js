const { getMessages } = require('../../helpers/message')
const { createRoom, fetchRooms } = require('../../helpers/room')

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

const newRoom = async (io, socket, name, usuari) => {
  try {
    const existsRoom = await fetchRooms(name)
    if(!existsRoom){
      const room = await createRoom(name)
      io.emit('room-created', room)
      return socket.emit('user-roomCreated', room)
    }
    return socket.emit('user-roomCreated', existsRoom)
  } catch (error) {
    console.error(error)
  } 
}

module.exports = { joinRoom, leaveRoom, newRoom }