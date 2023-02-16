const userData = JSON.parse(localStorage.getItem('userData'))
if(userData && userData.token){
  //si ja tenim token ves al xat. Allà es valida si aquest token es vàlid o no.
  window.location.assign('./index.html')
}

const api = `http://localhost:3000/api`

/********** SIGNUP FORM **********/
let signupForm = document.getElementById('signupForm')
let signupUser = document.getElementById('signupUser')
let validUserMsg = document.getElementById('signup-validUser')
let signupPswd1 = document.getElementById('signupPswd1')
let signupPswd2 = document.getElementById('signupPswd2')
let validPswdMsg = document.getElementById('signup-validPswd')
let validUser, validPswd, validPswd2 = false;

/* Comprova que la contrassenya tingui format correcte (min 7 char, conté núm i lletres) */
signupPswd1.addEventListener('input', pswd => {
  if(pswd.target.value.length<8){validPswdMsg.textContent='pswd too short'; validPswd=false;}
  else if(pswd.target.value.length>7){validPswdMsg.textContent = ''; validPswd = true;}
})

/* Comprova que les dues contrassenyes introduïdes són iguals */
let confirmPswdTimeout;
signupPswd2.addEventListener('input', e => {
  clearTimeout(confirmPswdTimeout)
  if(validPswd){
    confirmPswdTimeout = setTimeout(()=>{
      if(signupPswd1.value===signupPswd2.value){validPswd2=true;}
      else{
        validPswd2=false;
        console.log("Mostrar missatge que contrassenyes no són iguals");
      }
    },1500)
  }
})

/* Comprova que el username no estigui agafat. També que no contingui caràcters estranys */
let newUserTimeout;
signupUser.addEventListener('input', async user => {
  clearTimeout(newUserTimeout);
  const newUser = encodeURIComponent(user.target.value)
  if(newUser.length>0){
    newUserTimeout = setTimeout(async ()=>{
      const response = await fetch(`${api}/user/${newUser}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      const responseJSON = await response.json()
      if(responseJSON.status===500){validUserMsg.textContent='Error connecting to server'; validUser=false;}
      if(responseJSON.data === null){validUserMsg.textContent=''; validUser=true;}
      else{validUserMsg.textContent='This user already exists'; validUser=false;}
    },1500)    
  }
})
signupForm.addEventListener('submit', async function(e){
  e.preventDefault();
  //if(!validPswd  || !validUser){return null;/* Dir que hi ha un error amb user o password */}
  signup(signupUser.value, signupPswd1.value);
})

/********** LOGIN FORM **********/
var loginForm = document.getElementById('loginForm');
var loginUser = document.getElementById('loginUser');
var loginPswd = document.getElementById('loginPswd');

/* Formulari d'inscripcio */
loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  login(loginUser.value.toString(), loginPswd.value.toString())
})

/**
 * Logs in the chat. If credentials are valid, a token is given and added to localstorage and you are redirected to the chat.
 * @param {String} user 
 * @param {String} pswd 
 */
const login = async function(user, pswd){
  const response = await fetch(`${api}/login`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      user,
      pswd
    })
  })
  const responseJSON = await response.json()
  if(response.status===200){
    localStorage.setItem('userData', JSON.stringify(responseJSON.data))
    localStorage.setItem('currentRoom', 1)
    //setTimeout(()=>{window.alert("Logged in")},10) //Per no haver d'esperar confirmació de l'usuari al popup.
    return window.location.assign('./index.html')
    //alert() o popup amb que ha fet login
    //console.log('success');
  }
  alert("Wrong credentials")
}
/**
 * Create a new user. If it's created succesfully, logs in.
 * @param {String} user 
 * @param {String} pswd 
 */
const signup = async function(user,pswd){
  try {
    const response = await fetch(`${api}/user`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user,
        pswd //hauria de xifrar la contrassenya abans d'enviar-la al servidor??
      })
    })
    const responseJSON = await response.json()
    if(responseJSON.status===201){return login(user,pswd)}
    else{alert(`Server error creating you user: ${responseJSON.error.message}`)}  
  }catch (error){alert("There was an error with your signin in."+error.message)  }
}