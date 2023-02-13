const userData = JSON.parse(localStorage.getItem('userData'))
let currentRoom = localStorage.getItem('currentRoom') || 1 //Per defecte et trobes al canal main.

let chatMessages = document.getElementById('chat-messages')
let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;

chatButton.addEventListener('click', (ev) => {
    socket.emit('chat-message2server', {message: chatInput.value, currentRoom, userData})
})

socket.on('chat-message2client', (message) => {
  const newMessageDiv = document.createElement('div');
  newMessageDiv.class='message';
  newMessageDiv.innerHTML = `<p>${message}</p>`
  chatMessages.appendChild(newMessageDiv)
})