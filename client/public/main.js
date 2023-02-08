const socket = io.connect(`http://localhost:3000`)

socket.on('connect', () => {
  console.log(`Tinc l'id ${socket.id} i m'he connectat`);
})

socket.on('received-credentials', (credentials) => {
  console.log(`M'he volgut registrar amb ${credentials}`);
})

var loginForm = document.getElementById('loginForm');
var loginUser = document.getElementById('loginUser');
var loginPswd = document.getElementById('loginPswd');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (loginUser.value && loginPswd.value) {
    socket.emit('login-user', {loginUser: loginUser.value, loginPswd: loginPswd.value});
  }
});

export { socket }