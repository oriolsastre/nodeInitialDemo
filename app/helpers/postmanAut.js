function b64toascPostman (autoritzacio) {
    return credencials = Buffer.from(autoritzacio.split(" ")[1], 'base64').toString()
}

function userPswd (credencials){
    const i = credencials.indexOf(":");
    return [credencials.slice(0,i), credencials.slice(i+1)]
}

module.exports = { b64toascPostman, userPswd }