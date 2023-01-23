const { dbLang } = require('../config/config')
let Player;
if(dbLang === 'mysql'){
    var { QueryTypes } = require('sequelize')
    var { sequelize } = require('../utils/dbMySQL');
    Player = require('../models/Player');
}else if(dbLang === 'mongo'){
    Player = require('../models/Mongo/Player');
}
//const { validationResult } = require('express-validator')

/********** CONTROLADORS UNIFICATS **********/
const postPlayers = async (req,res) => {
    const { encrypt } = require('../helpers/password')
    try{
        const pswdHash = await encrypt(req.body.password)
        let newPlayerQuery = {...req.body, password: pswdHash};
        if(dbLang==='mongo'){
            const newID = (await Player.find({})).length
            newPlayerQuery.id = newID;
        }
        const newPlayer = await Player.create(newPlayerQuery)
        res.status(201).json({id: newPlayer.id, name: newPlayer.name, createdAt: newPlayer.createdAt})
    }catch(error){res.status(500).json({errors: error.message})}
}

/********** CONTROLADORS MySQL **********/
const getPlayersSQL = async (req, res) => {
    try {
        const sql_allPlayers = `SELECT player.id,
        CASE
            WHEN player.name IS NULL THEN 'ANÒNIM/A'
            ELSE player.name
        END AS 'name', avg(game.victoria) AS 'victory_rate', player.createdAt AS 'createdAt'
        FROM player LEFT JOIN game ON player.id=game.player
        WHERE name!='Admin'
        GROUP BY player.id ORDER BY player.id ASC;`;
        
        const allPlayers = await sequelize.query(sql_allPlayers, {type: QueryTypes.SELECT});
        if(allPlayers.length === 0){return res.status(200).json({message: "No Players registered"})}
        res.status(200).json({players: allPlayers})
    }catch(error){res.status(500).json(error)}
}

const putPlayersSQL = async (req,res) => {
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
const deletePlayersSQL = async (req, res) => {
    const playerID = req.params.id;
    try{
        await Player.destroy({where: {playerID: playerID}})
        res.status(200).json({message: "Jugador eliminat correctament"})
    }catch(err){res.status(500).json({error: err.array()})}
}

/********** CONTROLADORS MONGO **********/
const getPlayersMongo = async (req,res) => {
    try {
        const allPlayers = await Player.find({id: {$gt: 0}})
        if(allPlayers.length === 0){return res.status(200).json({message: "No Players registered"})}
        let showPlayers = [];
        for(let player of allPlayers){
            if(player.name === null){player.name='ANÒNIM/A'}
            showPlayers.push({id: player.id, name: player.name, victory_rate: player.victory_rate(), createdAt: player.createdAt})
        }
        res.status(200).json({players: showPlayers})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.postPlayers = postPlayers;
if(dbLang === 'mysql'){
    exports.getPlayers = getPlayersSQL;
    exports.putPlayers = putPlayersSQL;
    exports.deletePlayers = deletePlayersSQL;
}else if(dbLang === 'mongo'){
    exports.getPlayers = getPlayersMongo;
    exports.putPlayers = putPlayersSQL;
    exports.deletePlayers = deletePlayersSQL;
}