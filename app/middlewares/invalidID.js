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
    if(playerExists===null){return res.status(400).json({error: "No Player registered with ID: "+playerID})}
    
    next();
}

module.exports = { invalidIDMW }