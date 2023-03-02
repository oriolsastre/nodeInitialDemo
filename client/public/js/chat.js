let headerDiv = document.getElementsByClassName('header')[0];
let headerUser = document.getElementById('header-user')
let chatMessages = document.getElementById('chat-messages')
let messageHistory = true;
let roomsDiv = document.getElementById('rooms');
let newRoomDiv = document.getElementById('newRoom');
let footerDiv = document.getElementById('connected-Users')

let userInHeader = document.createElement('div');
userInHeader.innerHTML = `Benvingut <b>${userData.name}</b>`
headerUser.prepend(userInHeader)

chatMessages.addEventListener('scroll', async () => {
    if (chatMessages.scrollTop === 0 && messageHistory) {
        //fetch messages
        const history = await fetch(`${api}/message/${currentRoom}/before/${lastMessageTime}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.token}`
            }
        })
        const historyJSON = await history.json()
        if (historyJSON.data.length > 0) {
            for (let message of historyJSON.data) {
                let displayMessage = { message: { text: message.message, id: message.id, createdAt: message.createdAt }, sender: message["User.name"] }
                showMessage(displayMessage, false)
            }
            lastMessageTime = historyJSON.data.pop().createdAt
        } else {
            messageHistory = false;
        }

    }
})

const showMessage = (data, final = true) => {
    const newMessageBoxDiv = document.createElement('div');
    const newMessageDiv = document.createElement('div');

    data.sender === userData.name ? newMessageBoxDiv.className = 'message-box own' : newMessageBoxDiv.className = 'message-box';
    if(final) newMessageBoxDiv.classList.add('nou')
    newMessageDiv.className = 'message';
    if (data.message.id) { newMessageBoxDiv.id = data.message.id }
    newMessageBoxDiv.innerHTML = `<p class="message-sender"><b>${data.sender}</b></p>`
    const horaMissatge = `${String(new Date(data.message.createdAt).getHours()).padStart(2, "0")}:${String(new Date(data.message.createdAt).getMinutes()).padStart(2, "0")}`
    newMessageDiv.innerHTML = `<p class="message-text">${data.message.text}</p><p class="message-hora">${horaMissatge}</p>`

    newMessageBoxDiv.append(newMessageDiv)
    final ? chatMessages.append(newMessageBoxDiv) : chatMessages.prepend(newMessageBoxDiv)
}

const showAlert = (user, room = 'room', join = true) => {
    let newChatAlertDiv = document.createElement('div');
    newChatAlertDiv.className = 'chatAlert';
    newChatAlertDiv.innerHTML = `<p>${user} ${join ? `joined` : `left`} the ${room}</p>`
    chatMessages.append(newChatAlertDiv)
    scrollDown(chatMessages)
}

const joinRoom = (room) => {
    if (currentRoom != room) {
        socket.emit('leave-room', currentRoom)
    }
    localStorage.setItem('currentRoom', room)
    currentRoom = room;
    messageHistory = true;
    chatMessages.innerHTML = '';
    socket.emit('join-room', room)
    let currentRoomDiv = document.getElementsByClassName('room selected')[0];
    currentRoomDiv.className = 'room';
    let joinRoomDiv = document.getElementById(`room${room}`)
    joinRoomDiv.className = 'room selected'
}

const addRoom = (room) => {
    if (!document.getElementById(`room${room.id}`)) {
        let addRoomDiv = document.createElement('div');
        addRoomDiv.className = 'room';
        addRoomDiv.id = `room${room.id}`
        addRoomDiv.onmouseup = function () { return joinRoom(room.id) }
        addRoomDiv.innerHTML = `#${room.name}`
        roomsDiv.insertBefore(addRoomDiv, newRoomDiv)
    }
}

const scrollDown = (element2Scroll) => {
    element2Scroll.scrollTop = element2Scroll.scrollHeight;
}

const add2footer = (user) => {
    let newUserFooter = document.createElement('span');
    newUserFooter.className = 'connected-user';
    newUserFooter.id = `${user.name}${user.id}`
    newUserFooter.innerHTML = `${user.name}`
    footerDiv.append(newUserFooter)
}

const deleteFromFooter = (user) => {
    let deleteUserSpan = document.getElementById(`${user.name}${user.id}`)
    deleteUserSpan.remove();
}