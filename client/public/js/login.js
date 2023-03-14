const userData = JSON.parse(localStorage.getItem('userData'))
if (userData && userData.token) {
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
let validPswdMsg2 = document.getElementById('signup-validPswd2')
let validUser, validPswd, validPswd2 = false;

/* Comprova que la contrassenya tingui format correcte (min 8 char, conté núm i lletres) */
signupPswd1.addEventListener('input', pswd => {
  const pswdSignup = pswd.target.value;
  if (pswdSignup.length < 8) { validPswdMsg.textContent = 'Mínim 8 caràcters'; validPswd = false; }
  else { 
    if(!(/[a-z]+/i.test(pswdSignup) && /[0-9]+/.test(pswdSignup))){ validPswdMsg.textContent = 'Ha de contenir números i lletres'; validPswd = false; }
    else{
      validPswdMsg.textContent = String.fromCharCode(160);
      validPswd = true;
  }
  }
})

/* Comprova que les dues contrassenyes introduïdes són iguals */
let confirmPswdTimeout;
signupPswd2.addEventListener('input', e => {
  clearTimeout(confirmPswdTimeout)
  if (validPswd) {
    confirmPswdTimeout = setTimeout(() => {
      if (signupPswd1.value === signupPswd2.value) {
        validPswd2 = true;
        validPswdMsg2.textContent = String.fromCharCode(160);
      }
      else {
        validPswd2 = false;
        validPswdMsg2.textContent = "Les contrassenyes no coincideixen";
      }
    }, 1500)
  }
})

/* Comprova que el username no estigui agafat. També que no contingui caràcters estranys */
let newUserTimeout;
signupUser.addEventListener('input', async user => {
  clearTimeout(newUserTimeout);
  const newUser = user.target.value
  if (newUser.length > 0) {
    if (validUserFn(newUser)) {
      newUserTimeout = setTimeout(async () => {
        const response = await fetch(`${api}/user/${encodeURIComponent(newUser)}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        })
        const responseJSON = await response.json()
        if (responseJSON.status === 500) { validUserMsg.textContent = 'Error connecting to server'; validUser = false; }
        if (responseJSON.data === null) { validUserMsg.textContent = String.fromCharCode(160); validUser = true; }
        else { validUserMsg.textContent = 'Aquest usuari ja existeix'; validUser = false; }
      }, 1500)
    } else { validUserMsg.textContent = 'Només lletres i números'; validUser = false; }
  } else { validUser = false; }
})

/* Gira el formular en fer click a registra't o inicia sessio */
const registrat_button = document.getElementsByClassName('gira-carta-boto')
const flipCard = document.querySelector('.card');
for (let i = 0; i < registrat_button.length; i++) {
  registrat_button[i].addEventListener('click', function () {
    flipCard.classList.toggle('card-active')
  })
}

/* Si es donen les condicions correctes de nom d'usuari i format de contrassenya, crear compte i inicia sessió */
signupForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (validUser && validPswd && validPswd2) {
    signup(encodeURIComponent(signupUser.value), encodeURIComponent(signupPswd1.value));
  }
})

/********** LOGIN FORM **********/
var loginForm = document.getElementById('loginForm');
var loginUser = document.getElementById('loginUser');
var loginPswd = document.getElementById('loginPswd');

/* Formulari d'inscripcio */
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  login(encodeURIComponent(loginUser.value.toString()), encodeURIComponent(loginPswd.value.toString()))
})

/**
 * Logs in the chat. If credentials are valid, a token is given and added to localstorage and you are redirected to the chat.
 * @param {String} user 
 * @param {String} pswd 
 */
const login = async function (user, pswd) {
  const response = await fetch(`${api}/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      pswd
    })
  })
  const responseJSON = await response.json()
  if (response.status === 200) {
    localStorage.setItem('userData', JSON.stringify(responseJSON.data))
    localStorage.setItem('currentRoom', 1)
    return window.location.assign('./index.html')
  }
  alert("Wrong credentials")
}
/**
 * Crea un nou usuari. Si es crea correctament, es fa log in.
 * @param {String} user 
 * @param {String} pswd 
 */
const signup = async function (user, pswd) {
  try {
    const response = await fetch(`${api}/user`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        pswd //hauria de xifrar la contrassenya abans d'enviar-la al servidor??
      })
    })
    const responseJSON = await response.json()
    if (responseJSON.status === 201) { return login(user, pswd) }
    else { alert(`Server error creating you user: ${responseJSON.error.message}`) }
  } catch (error) { alert("There was an error with your signin in." + error.message) }
}
/**
 * Comprova que el nom d'usuari només contingui lletres i números.
 * @param {String} user 
 * @returns {Boolean}
 */
const validUserFn = (user) => {
  return /^[a-z0-9]+$/i.test(user);
}