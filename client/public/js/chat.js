let chatMessages = document.getElementById('chat-messages')
let messageHistory = true;
let roomsDiv = document.getElementById('rooms');
let newRoomDiv = document.getElementById('newRoom');

chatMessages.addEventListener('scroll', async () => {
    if(chatMessages.scrollTop===0 && messageHistory){
        //fetch messages
        const history = fetch(`${api}/message/${currentRoom}/before/${time}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
    }
})

const showMessage = (data, final=true) => {
    const newMessageDiv = document.createElement('div');
  
    data.sender===userData.name ? newMessageDiv.className='message_own' : newMessageDiv.className='message';
    if(data.message.id){newMessageDiv.id=data.message.id}
    newMessageDiv.innerHTML = `<p><b>${data.sender}</b> ${data.message.text}</p>`
    final ? chatMessages.append(newMessageDiv) : chatMessages.prepend(newMessageDiv)
    if(final){scrollDown(chatMessages)}
}

const showAlert = (user, join=true) => {
    let newChatAlertDiv = document.createElement('div');
    newChatAlertDiv.className = 'chatAlert';
    newChatAlertDiv.innerHTML = `<p>${user} ${join ? `joined` : `left`} the room</p>`
    chatMessages.append(newChatAlertDiv)
    scrollDown(chatMessages)
}

const joinRoom = (room) => {
    if(currentRoom != room){
      socket.emit('leave-room', room)
    }
    localStorage.setItem('currentRoom', room)
    currentRoom=room;
    chatMessages.innerHTML='';
    socket.emit('join-room', room)
    let currentRoomDiv = document.getElementsByClassName('room selected')[0];
    currentRoomDiv.className='room';
    let joinRoomDiv = document.getElementById(`room${room}`)
    joinRoomDiv.className='room selected'
}

const addRoom = (room) => {
    if(!document.getElementById(`room${room.id}`)){
        let addRoomDiv = document.createElement('div');
        addRoomDiv.className = 'room';
        addRoomDiv.id = `room${room.id}`
        addRoomDiv.onmouseup = function(){return joinRoom(room.id)}
        addRoomDiv.innerHTML = `${room.name}`
        roomsDiv.insertBefore(addRoomDiv, newRoomDiv)
    }
}

const scrollDown = (element2Scroll) => {
    element2Scroll.scrollTop = element2Scroll.scrollHeight;
}