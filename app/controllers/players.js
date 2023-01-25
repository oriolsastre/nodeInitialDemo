const { dbLang } = require('../config/config')
const { handleErrorResponse } = require('../helpers/error')
let Player;
if(dbLang === 'mysql'){
    var { QueryTypes } = require('sequelize')
    var { sequelize } = require('../utils/dbMySQL');
    Player = require('../models/Player');
}else if(dbLang === 'mongo'){
    Player = require('../models/Mongo/Player');
}

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
        res.status(201).json({id: newPlayer.id, name: newPlayer.getName(), createdAt: newPlayer.createdAt})
    }catch(error){handleErrorResponse(res,error,500)}
}

const putPlayers = async (req,res) => {
    const playerID = req.params.id;
    try{
        if(req.body.name){
            const newName = req.body.name;
            if(dbLang==='mysql'){await Player.update({name: newName}, {where: {id: playerID}})}
            else if(dbLang==='mongo'){await Player.updateOne({id: playerID}, {name: newName})}
            return res.status(200).json({id: playerID, newName: newName})
        }
        res.status(400).json({Error: "You are only allowed to change your name", solution: "Give me your new name like this: {name: [new name]}"})
        
    }catch(error){handleErrorResponse(res,error,500)}
}
/* Aquest no és necessari */
const deletePlayers = async (req, res) => {
    const playerID = req.params.id;
    try{
        if(dbLang==='mysql'){await Player.destroy({where: {id: playerID}})}
        else if(dbLang==='mongo'){await Player.deleteOne({id: playerID})}
        res.status(200).json({message: "Jugador eliminat correctament"})
    }catch(error){handleErrorResponse(res,error,500)}
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
        WHERE name!='Admin' OR name IS NULL
        GROUP BY player.id ORDER BY player.id ASC;`;
        const allPlayers = await sequelize.query(sql_allPlayers, {type: QueryTypes.SELECT});
        if(allPlayers.length === 0){return res.status(200).json({message: "No Players registered"})}
        res.status(200).json({players: allPlayers})
    }catch(error){handleErrorResponse(res,error,500)}
}

/********** CONTROLADORS MONGO **********/
const getPlayersMongo = async (req,res) => {
    try{
        const allPlayers = await Player.find({id: {$gt: 0}})
        if(allPlayers.length === 0){return res.status(200).json({message: "No Players registered"})}
        let showPlayers = [];
        for(let player of allPlayers){
            showPlayers.push({id: player.id, name: player.getName(), victory_rate: player.victory_rate(), createdAt: player.createdAt})
        }
        res.status(200).json({players: showPlayers})
    }catch(error){handleErrorResponse(res,error,500)}
}

exports.postPlayers = postPlayers;
exports.putPlayers = putPlayers;
exports.deletePlayers = deletePlayers;
if(dbLang === 'mysql'){exports.getPlayers = getPlayersSQL;}
else if(dbLang === 'mongo'){exports.getPlayers = getPlayersMongo;}