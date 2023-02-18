let chatMessages = document.getElementById('chat-messages')

const showMessage = (data, final=true) => {
    const newMessageDiv = document.createElement('div');
  
    data.sender===userData.name ? newMessageDiv.className='message_own' : newMessageDiv.className='message';
    if(data.message.id){newMessageDiv.id=data.message.id}
    newMessageDiv.innerHTML = `<p><b>${data.sender}</b> ${data.message.text}</p>`
    final ? chatMessages.append(newMessageDiv) : chatMessages.prepend(newMessageDiv)
}

const showAlert = (user, join=true) => {
    const newChatAlertDiv = document.createElement('div');
    newChatAlertDiv.className = 'chatAlert';
    newChatAlertDiv.innerHTML = `<p><i>${user} ${join ? `joined` : `left`} the room</i></p>`
    chatMessages.append(newChatAlertDiv)
}