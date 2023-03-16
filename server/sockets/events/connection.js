const { getMessages } = require('../../helpers/message');
const { fetchRooms } = require('../../helpers/room');

const connection = async (io, socket, data) => {
    /* Avises a tohom que t'has connectat al xat  */
    socket.broadcast.emit('user-connected', data.usuari)

    /* En connectar-te carregues les sales disponibles al xat i els usuaris connectats */
    let chatRooms = await fetchRooms();
    chatRooms.shift();  //main ja la tenim.
    socket.emit('user-loadFirst', { chatRooms, connectedUsers: data.connectedUsers });

    /* Per defecte, en connectar-te al xat entres a la sala principal: 1 */
    await socket.join('1')
    const roomMessages = await getMessages(1, 20)
    socket.emit('room-fetchMessages', roomMessages)
}

module.exports = { connection }