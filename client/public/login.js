const api = `http://localhost:3000/api`

/********** SIGNUP FORM **********/
let signupForm = document.getElementById('signupForm')
let signupUser = document.getElementById('signupUser')
let validUserMsg = document.getElementById('signup-validUser')
let signupPswd1 = document.getElementById('signupPswd1')
let signupPswd2 = document.getElementById('signupPswd2')
let validPswdMsg = document.getElementById('signup-validPswd')
let validUser, validPswd = false;

/* Comprova que la contrassenya tingui format correcte (min 7 char, conté núm i lletres) */
signupPswd1.addEventListener('input', pswd => {
  if(pswd.target.value.length<8){validPswdMsg.textContent='pswd too short'; validPswd=false;}
  else if(pswd.target.value.length>7){validPswdMsg.textContent = ''; validPswd = true;}
})

/* Comprova que el username no estigui agafat. També que no contingui caràcters estranys */
signupUser.addEventListener('input', async user => {
    if(user.target.value.length>0){
        const response = await fetch(`${api}/user/${user.target.value}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        const responseJSON = await response.json()
        if(responseJSON.status===500){validUserMsg.textContent='Error connecting to server'; validUser=false;}
        if(responseJSON.data === null){validUserMsg.textContent=''; validUser=true;}
        else{validUserMsg.textContent='This user already exists'; validUser=false;}
    }
})


/********** LOGIN FORM **********/
var loginForm = document.getElementById('loginForm');
var loginUser = document.getElementById('loginUser');
var loginPswd = document.getElementById('loginPswd');

/* Formulari d'inscripcio */
loginForm.addEventListener('submit', async function(e){
  e.preventDefault();
  //if(!validPswd  || !validUser){return null;/* Dir que hi ha un error amb user o password */}
  
  const response = await fetch(`${api}/login`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      user: loginUser.value,
      pswd: loginPswd.value
    })
  })
  const responseJSON = await response.json()
  if(response.status===200){
    //localStorage.setItem('token', response.token)
    //alert() o popup amb que ha fet login
    //redirigir al xat window.location.assign('./chat.html')
    console.log('success');
  }
  console.log(responseJSON);
  
  try {
  } catch (error) {
    console.error(error.message)
  }

})