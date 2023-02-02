const socket = io.connect(`http://localhost:3000`)

socket.on('connect', () => {
  console.log(`Tinc l'id ${socket.id} i m'he connectat`);
})

var loginForm = document.getElementById('loginForm');
var loginUser = document.getElementById('loginUser');
var loginPswd = document.getElementById('loginPswd');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (loginUser.value && loginPswd.value) {
    socket.emit('chat-message', {loginUser: loginUser.value, loginPswd: loginPswd.value});
  }
});