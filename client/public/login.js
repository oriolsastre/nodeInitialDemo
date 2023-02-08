const socket = io.connect(`http://localhost:3000`)
const api = `http://localhost:3000/api`

/********** SIGNUP FORM **********/
let signupForm = document.getElementById('signupForm')
let signupUser = document.getElementById('signupUser')
let validUserMsg = document.getElementById('signup-validUser')
let signupPswd1 = document.getElementById('signupPswd1')
let signupPswd2 = document.getElementById('signupPswd2')
let validPswdMsg = document.getElementById('signup-validPswd')
let validUser, validPswd = false;

console.log(signupForm);

/* Comprova que la contrassenya tingui format correcte (min 7 char, conté núm i lletres) */
signupPswd1.addEventListener('input', pswd => {
  if(pswd.target.value.length<8){validPswdMsg.textContent='pswd too short'; validPswd=false;}
  else if(pswd.target.value.length>7){validPswdMsg.textContent = ''; validPswd = true;}
})
/* Comprova que el username no estigui agafat. També que no contingui caràcters estranys */
signupUser.addEventListener('input', async user => {
    if(user.target.value.length>0){
        const response = await fetch(`${api}/user/${user.target.value}`, {
            method: 'GET'
        })
    }
  socket.emit('checkUsername', user.target.value)
  socket.on('username-exists', (bool) => {
    if(!bool){validUserMsg.textContent='This user already exists'; validUser=false;}
    else{validUserMsg.textContent=''; validUser=true;}
  })
})
/* Formulari d'inscripcio */
signupForm.addEventListener('submit', async function(e){
  e.preventDefault();
  if(!validPswd  || !validUser){/* Dir que hi ha un error amb user o password */}
  
  try {
    const response = await fetch()
  } catch (error) {
    
  }

})