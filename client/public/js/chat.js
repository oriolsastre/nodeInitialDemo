let chatMessages = document.getElementById('chat-messages')
let chatInput = document.getElementById('chat-input');
let chatButton = document.getElementById('chat-button');
let validMessage = true;

chatButton.addEventListener('click', (ev) => {
    socket.emit('chat-message2server', chatInput.value)
})

socket.on('chat-message2client', message => {
  const newMessageDiv = document.createElement('div');
  newMessageDiv.class='message';
  newMessageDiv.innerHTML = `<p>${message.message}</p>`
  chatMessages.appendChild(newMessageDiv)
})