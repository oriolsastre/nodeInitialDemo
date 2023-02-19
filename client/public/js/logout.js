const logout = () => {
    //leave room
    //disconnect
    socket.disconnect()
    localStorage.removeItem('userData')
    localStorage.removeItem('currentRoom')
    window.location.assign('./login.html')
}