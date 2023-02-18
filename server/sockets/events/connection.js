const { getMessages } = require('../../helpers/message');

const connection = async (io, socket, usuari) => {
    /* Per defecte, en connectar-te al xat entres a la sala principal: 1 */
    await socket.join('1')
    socket.to('1').emit('user-joinedRoom', usuari.name)
    const roomMessages = await getMessages(1, 20)
    socket.emit('room-fetchMessages', roomMessages)
}

module.exports = { connection }