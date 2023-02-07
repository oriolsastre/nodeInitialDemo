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

/********** REGISTER FORM **********/
let registerUser = document.getElementById('registerUser')
let validUserMsg = document.getElementById('register-validUser')
let registerPswd1 = document.getElementById('registerPswd1')
let registerPswd2 = document.getElementById('registerPswd2')
let validPswdMsg = document.getElementById('register-validPswd')

registerPswd1.addEventListener('input', pswd => {
  if(pswd.target.value.length<8){validPswdMsg.textContent='pswd too short'}
  else if(pswd.target.value.length>7){validPswdMsg.textContent = ''}
})

registerUser.addEventListener('input', user => {
  socket.emit('checkUsername', user.target.value)
  socket.on('username-exists', (bool) => {
    if(!bool){validUserMsg.textContent='This user already exists'}
    else{validUserMsg.textContent=''}
  })
})

