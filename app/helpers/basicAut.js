function b64toasc (autoritzacio) {
    return credencials = Buffer.from(autoritzacio.split(" ")[1], 'base64').toString()
}

function userPswd (credencials){
    //L'usuari no pot contenir ":" per norma imposada, però el password sí que en podria tenir.
    //Per això enlloc de split(":"), slice amb la primera ocorrencia de ":"
    const i = credencials.indexOf(":");
    return [credencials.slice(0,i), credencials.slice(i+1)]
}

module.exports = { b64toasc, userPswd }