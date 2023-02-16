let currentRoom = localStorage.getItem('currentRoom') || 1 //Per defecte et trobes al canal main.


let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;

chatButton.addEventListener('click', (ev) => {
    socket.emit('chat-message2server', {message: chatInput.value, currentRoom})
    chatInput.value = '';
})

socket.on('chat-message2client', data => showMessage(data))

socket.on('remove-message', messageID => {
  let message2delete = document.getElementById(`${messageID}`);
  message2delete.className = 'message-delete'
})

const joinRoom = async (room, userData) => {
  //leave room
  socket.join(room)
  socket.emit('join-room', {room, userData})
  
}