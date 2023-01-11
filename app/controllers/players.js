const Player = require('../models/Player')
//const { validationResult } = require('express-validator')

const getPlayers = async (req, res) => {
    const allPlayers = await Player.findAll({attributes: ['name']});
    res.status(201).json(allPlayers)
}

const postPlayers = async (req,res) => {
    try{
        const newPlayer = await Player.create({name: req.body.name, email: req.body.email, password: req.body.password})
        res.status(200).json(newPlayer.name)
    }catch(err){
        const specificError = err.errors[0]
        if(specificError.type == 'unique violation'){
            res.status(500).send(
            {Error: {
                type: specificError.type,
                message: `${specificError.message}. ${req.body[specificError.path]} already exists`
                }
            })
        }
        else{res.status(500).send({Error: err})}
    }
    
}

const putPlayers = async (req,res) => {
    const playerID = req.params.id;
    if(!Number.isInteger(playerID)){return res.status(400).send({Error: "Invalid ID", reason: "Must be an integer."})}

    const updatedPlayer = await Player.update( req.body, {
        where: {playerID: playerID}
    })
}

/* No és necessari aquest últim */
const deletePlayers = async (req, res) => {
    const playerID = Number(req.params.id);
    if(!Number.isInteger(playerID)){return res.status(400).send({Error: "Invalid ID", reason: "Must be an integer."})}
    try{
        await Player.destroy({
            where: {
                playerID: playerID
            }
        })
        res.status(200).json({message: "Jugador eliminat correctament"})
    }catch(err){
        res.status(500).json({error: err.array()})
    }
}

module.exports = { getPlayers, postPlayers, putPlayers, deletePlayers }