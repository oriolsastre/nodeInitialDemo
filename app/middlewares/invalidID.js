const Player = require('../models/Player')

const invalidIDMW = async (req,res,next) => {
    const playerID = Number(req.params.id);
    if(!Number.isInteger(playerID)){return res.status(400).send({error: "Invalid ID", reason: "Must be an integer."})}
    
    const playerExists = await Player.findAll({where: {id: playerID}});
    if(playerExists.length===0){return res.status(400).json({error: "No Player registered with ID:"+playerID})}
    
    next();
}

module.exports = { invalidIDMW }