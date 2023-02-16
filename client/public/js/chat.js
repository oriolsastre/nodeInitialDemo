let chatMessages = document.getElementById('chat-messages')

const showMessage = (data) => {
    const newMessageDiv = document.createElement('div');
  
    data.userData.id===userData.id ? newMessageDiv.className='message_own' : newMessageDiv.className='message';

    newMessageDiv.id=data.message.id
    newMessageDiv.innerHTML = `<p><b>${data.userData.name}</b> ${data.message.text}</p>`
    chatMessages.appendChild(newMessageDiv)
}

