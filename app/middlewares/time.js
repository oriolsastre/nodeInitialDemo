const { b64toasc, userPswd } = require('../helpers/basicAut')

const cacheControl = (req, res, next) => {
    res.set('Cache-control', 'no-cache');
    next();
}

const autoritzacio = (req, res, next) => {
    const noAutoritzat = motiu => res.status(401).json({Error: motiu});
    if(!req.headers.authorization){noAutoritzat("No s'han rebut credencials")}
    else{
        const credencials = b64toasc(req.headers.authorization)
        const [usuari, pswd] = userPswd(credencials)
        if(credencials == ":"){noAutoritzat("No s'han rebut credencials")}
        else if(usuari.length === 0 || pswd.length === 0){noAutoritzat("Falta l'usuari o la contrassenya")}
        else{next();}
    }
}

const bodyUser = (req, res, next) => {
    if(!req.body || !req.body.user){res.status(400).json({Error: "No s'ha enviat objecte JSON amb un user al body."})}
    else{next();}
}


module.exports = { cacheControl, autoritzacio, bodyUser }