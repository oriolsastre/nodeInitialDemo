let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;

chatButton.addEventListener('click', (ev) => {
    socket.emit('chat-message2server', {message: chatInput.value, currentRoom})
    chatInput.value = '';
})

socket.on('chat-message2client', data => showMessage(data, true))

socket.on('remove-message', messageID => {
  let message2delete = document.getElementById(`${messageID}`);
  message2delete.className = 'message-delete'
})

socket.on('room-fetchMessages', data => {
  for(let message of data){
    let displayMessage = {message: {text: message.message}, sender:message["User.name"]}
    showMessage(displayMessage, false)
  }
})

socket.on('user-joinedRoom', data => {
  showAlert(data, true)
})

socket.on('user-leftRoom', data => {
  showAlert(data, false)
})

const joinRoom = (room) => {
  if(currentRoom != room){
    socket.emit('leave-room', room)
  }
  socket.emit('join-room', room)
}