const { dbLang } = require('../config/config')
let Player;
if(dbLang === 'mysql'){
    Player = require('../models/Player')
}else if(dbLang === 'mongo'){
    Player = require('../models/Mongo/Player')
}

const invalidIDMW = async (req,res,next) => {
    const playerID = Number(req.params.id);
    if(!Number.isInteger(playerID)){return res.status(400).send({error: "Invalid ID", reason: "Must be an integer."})}
    
    let queryID;
    dbLang === 'mysql' ? queryID = {where: {id:playerID}} : queryID = {id:playerID}
    
    const playerExists = await Player.findOne(queryID)
    if(playerExists===null){return res.status(404).json({error: "No Player registered with ID: "+playerID})}
    
    //Per evitar que s'editi o s'elimini l'usuari Administrador. També es considerat ID invàlida per a totes les operacions.
    if(playerExists.name==='Admin') return res.status(401).json({error: "You are not allowed to edit/delete this user"})
    
    next();
}
module.exports = { invalidIDMW }