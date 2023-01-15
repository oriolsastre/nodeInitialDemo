const { QueryTypes } = require('sequelize')
const { sequelize } = require('../utils/database');
const Player = require('../models/Player');
//const { validationResult } = require('express-validator')

const getPlayers = async (req, res) => {
    try {
        const sql_allPlayers = `SELECT player.id,
        CASE
            WHEN player.name IS NULL THEN 'ANÒNIM'
            ELSE player.name
        END AS 'name', avg(game.victoria) AS 'victory_rate'
        FROM player LEFT JOIN game ON player.id=game.player
        GROUP BY player.id ORDER BY player.id ASC;`;
        
        const allPlayers = await sequelize.query(sql_allPlayers, {type: QueryTypes.SELECT});
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
        const newPlayer = await Player.create({name: req.body.name, email: req.body.email, password: req.body.password})
        res.status(201).json({id: newPlayer.id, name: newPlayer.name})
    }catch(error){res.status(500).send(error)}
}

const putPlayers = async (req,res) => {
    const playerID = req.params.id;
    try{
        if(req.body.name){
            const newName = req.body.name;
            await Player.update( {name: newName}, {where: {id: playerID}})
            return res.status(200).json({id: playerID, newName: newName})
        }
        res.status(400).json({Error: "You are only allowed to change your name", solution: "Give me your new name like this: {name: [new name]}"})
        
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