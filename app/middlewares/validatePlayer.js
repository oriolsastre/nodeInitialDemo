/**
 * Comprova que si es vol crear un player amb rol d'admin (level=0), ha de tenir un nom i una contrassenya
 * Treu els espais i els : del nom d'usuari. Si un usuari només consiteix d'espais i : aleshores serà null i tractat d'anònim.
 */
const emptyValues = (req,res,next) => {
    if(!req.body.level) req.body.level=1
    if(req.body.name || req.body.name===""){
        req.body.name = req.body.name.replace( /\s|:/g, '');
        if(req.body.name.length===0){req.body.name=null}
    }
    if(req.body.level===0){
        if ((!req.body.password||req.body.password===null) || (!req.body.name||req.body.name===null)) return res.status(400).json({Error: "You can not create a player with admin status without a name and a password"})
    }
    return next();
}

module.exports = { emptyValues }