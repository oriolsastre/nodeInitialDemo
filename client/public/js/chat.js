const userData = JSON.parse(localStorage.getItem('userData'))
let currentRoom = localStorage.getItem('currentRoom') || 1 //Per defecte et trobes al canal main.

let chatMessages = document.getElementById('chat-messages')
let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;

chatButton.addEventListener('click', (ev) => {
    socket.emit('chat-message2server', {message: chatInput.value, currentRoom})
    chatInput.value = '';
})

socket.on('chat-message2client', (data) => {
  const newMessageDiv = document.createElement('div');
  
  data.userData.id===userData.id ? newMessageDiv.className='message_own' : newMessageDiv.className='message';

  newMessageDiv.id=data.message.id
  newMessageDiv.innerHTML = `<p><b>${data.userData.name}</b> ${data.message.text}</p>`
  chatMessages.appendChild(newMessageDiv)
})

socket.om('remove-message', messageID => {
  let message2delete = document.getElementById(`${messageID}`);
  message2delete.className = 'message-delete'
})