const userData = JSON.parse(localStorage.getItem('userData'))

if(userData===null || !userData.token){
  window.location.assign('./login.html')
}

const socket = io(`http://localhost:3000`, {
  query: { 
    name: userData.name,
    id: userData.id,
    token: userData.token
  }
})

socket.on('connect_error', (error) => {
  //Els ifs per si volgués gestionar errors diferents.
  //En realitat crec que només tinc el 401 si el token no es verifica correctament i no en tinc més
  //Podria ser únicament l'última ordre de redirigir a login.html
  if(error.data){
    if(error.data.code && error.data.code===401){
      console.error(error.message);
    }
  }
  console.error(`Error genèric: ${error.message}`)
  window.location.assign('./login.html')
})