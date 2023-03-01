let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;
let newRoomForm = document.getElementById('newRoom-form')

chatButton.addEventListener('click', (ev) => {
    if(chatInput.value.length>0){
      socket.emit('chat-message2server', {message: chatInput.value, currentRoom})
      chatInput.value = '';
    }
})

newRoomForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if(ev.target.elements["roomName"].value.length>0){
    const roomName = ev.target.elements["roomName"].value;
    createRoom(roomName);
    ev.target.elements["roomName"].value='';
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

socket.on('remove-message', messageID => {
  let message2delete = document.getElementById(`${messageID}`);
  message2delete.className = 'message-delete'
})

socket.on('room-fetchMessages', data => {
  for(let message of data){
    let displayMessage = {message: {text: message.message, id: message.id, createdAt: message.createdAt}, sender:message["User.name"]}
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
  for(let room of data.chatRooms){addRoom(room)}
  for(let user of data.connectedUsers){add2footer(user)}
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