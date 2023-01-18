const { b64toasc, userPswd } = require('../helpers/basicAut')

const cacheControl = (req, res, next) => {
    res.set('Cache-control', 'no-cache');
    next();
}

const autoritzacio = (req, res, next) => {
    const noAutoritzat = motiu => res.status(401).json({Error: motiu});
    if(!req.headers.authorization){return noAutoritzat("No s'han rebut credencials")}
    const credencials = b64toasc(req.headers.authorization)
    const [usuari, pswd] = userPswd(credencials)
    if(credencials == ":"){return noAutoritzat("No s'han rebut credencials")}
    else if(usuari.length === 0 || pswd.length === 0){return noAutoritzat("Falta l'usuari o la contrassenya")}
    else if(usuari !== 'Admin' || pswd !== '1234'){return noAutoritzat("Usuari o contrassenya incorrectes")}
    next();
}

module.exports = { cacheControl, autoritzacio }