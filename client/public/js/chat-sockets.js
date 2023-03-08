let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;
let newRoomForm = document.getElementById('newRoom-form')

chatInput.addEventListener('keyup', ev => {
  if (ev.key == "Enter") {
    ev.preventDefault();
    chatButton.click();
  }
})

chatButton.addEventListener('click', (ev) => {
  ev.preventDefault()
  let message2send = encodeURIComponent(chatInput.value.trim())
  if (message2send.length > 0) {
    socket.emit('chat-message2server', { message: message2send, currentRoom })
    chatInput.value = '';
  }
})

newRoomForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const roomNameBrut = ev.target.elements["roomName"].value;
  const roomName = roomNameBrut.replace(/[^a-zA-Z0-9]/g, '');
  if (roomName.length > 0 && roomName.length < 11) {
    createRoom(encodeURIComponent(roomName));
    ev.target.elements["roomName"].value = '';
  }
})

socket.on('user-connected', data => {
  add2footer(data)
  showAlert(data.name, 'chat', true)
})

socket.on('chat-message2client', data => {
  showMessage(data, true)
  scrollDown(chatMessages)
})

socket.on('new-unreadMessage', data => {
  addUnreadAlert(data)
})

socket.on('remove-message', messageID => {
  let message2delete = document.getElementById(`${messageID}`);
  message2delete.className = 'message-delete'
})

socket.on('room-fetchMessages', data => {
  for (let message of data) {
    let displayMessage = { message: { text: message.message, id: message.id, createdAt: message.createdAt }, sender: message["User.name"] }
    showMessage(displayMessage, false)
  }
  scrollDown(chatMessages);
  //lastMessageTime = data.pop().createdAt
})

socket.on('user-joinedRoom', data => {
  showAlert(data, 'room', true)
})

socket.on('user-leftRoom', data => {
  showAlert(data, 'room', false)
})

socket.on('room-created', data => {
  addRoom(data)
})

socket.on('user-loadFirst', data => {
  for (let room of data.chatRooms) { addRoom(room) }
  for (let user of data.connectedUsers) { add2footer(user) }
})

socket.on('user-roomCreated', data => {
  joinRoom(data.id)
})

socket.on('user-disconnected', user => {
  showAlert(user.name, 'chat', false)
  deleteFromFooter(user)
})

const createRoom = (newRoomName) => {
  socket.emit('create-room', newRoomName)
}