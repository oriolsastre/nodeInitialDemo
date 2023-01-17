const Player = require('../models/Player')
//const { validationResult } = require('express-validator')

const { encrypt } = require('../helpers/password')

const getPlayers = async (req, res) => {
    try {
        const allPlayers = await Player.findAll({attributes: ['id', 'name'], order: ['id']});
        if(allPlayers.length === 0){return res.status(200).json({message: "No Players registered"})}
        res.status(200).json(allPlayers)
    }catch(error){res.status(500).json(error)}
}

const postPlayers = async (req,res) => {
    try{
        //console.log(req.body instanceof Array);
        if((typeof req.body === 'array' || req.body instanceof Array)){
            const newPlayers = req.body;
            await Player.bulkCreate(newPlayers)
            return res.status(200).json(req.body)
        }
        const pswdHash = await encrypt(req.body.password)
        const newPlayer = await Player.create({...req.body, password: pswdHash})
        newPlayer.set('password', undefined) //No cal retornar la contrassenya a l'output.
        res.status(201).json(newPlayer)
    }catch(error){res.status(500).json({errors: error.message})}
}

const putPlayers = async (req,res) => {
    const playerID = req.params.id;
    try{
        if(req.body.name){
            const newName = req.body.name;
            const updatedPlayer = await Player.update( {name: newName}, {where: {id: playerID}})
            return res.status(200).json({id: playerID, newName: newName})
        }
        res.status(400).json({Error: "You are only allowed to change you name", solution: "Give me your new name like this: {name: [new name]}"})
        
    }catch(error){
        if(error.name == 'SequelizeUniqueConstraintError'){return res.status(409).json({Error: "This name is already in use."})}
        res.status(500).json(error)
    }
}

/* No és necessari aquest últim */
const deletePlayers = async (req, res) => {
    const playerID = req.params.id;
    try{
        await Player.destroy({
            where: {
                playerID: playerID
            }
        })
        res.status(200).json({message: "Jugador eliminat correctament"})
    }catch(err){res.status(500).json({error: err.array()})}
}

module.exports = { getPlayers, postPlayers, putPlayers, deletePlayers }