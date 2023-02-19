let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;
let newRoomForm = document.getElementById('newRoom-form')

chatButton.addEventListener('click', (ev) => {
    socket.emit('chat-message2server', {message: chatInput.value, currentRoom})
    chatInput.value = '';
})

newRoomForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const roomName = ev.target.elements["roomName"].value
  createRoom(roomName)
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
  scrollDown(chatMessages);
})

socket.on('user-joinedRoom', data => {
  showAlert(data, true)
})

socket.on('user-leftRoom', data => {
  showAlert(data, false)
})

socket.on('room-created', data => {
  addRoom(data)
})

socket.on('user-loadRooms', data => {
  for(let room of data){addRoom(room)}
})

socket.on('user-roomCreated', data => {
  joinRoom(data.id)
})

const createRoom = (newRoomName) => {
  socket.emit('create-room', newRoomName)
}