let Game, Player;
const { dbLang } = require('../config/config')
const tirarDaus = require('../helpers/daus')
if(dbLang==='mysql'){ Game = require('../models/Game') }
else if(dbLang==='mongo'){ Player = require('../models/Mongo/Player')}

/**
 * Rebre les tirades fetes per un jugador
 * @param {*} req 
 * @param {*} res 
 */
const getGamesSQL = async (req,res) => {
    const playerID = req.params.id;
    try {
        const allGames = await Game.findAll({attributes: ['dau1','dau2','victoria'], where: {player: playerID}})
        if(allGames.length===0){
            res.status(400).json({error: "This Player has not played a single game of dice", solution: "Play a game at this same endpoint with a POST request!"})
        }else{res.status(200).json(allGames)}
    }catch(error) {res.status(500).json(error)}
}

const postGames = async (req,res) => {
    const playerID = req.params.id;
    let tirada = tirarDaus();
    try{
        if(dbLang==='mysql'){
            tirada.player = playerID;
            await Game.create(tirada)
        }else if(dbLang==='mongo'){
            await Player.findOneAndUpdate({id: playerID}, {$push: {games: tirada}})
            tirada.player = playerID;
        }
        res.status(201).json(tirada)
    }catch(error){res.status(500).json(error.message)}  
}

const deleteGamesSQL = async (req,res) => {
    const playerID = req.params.id;
    try {
        await Game.destroy({where: {player: playerID}})
        res.status(200).json({message: `Games of Player with ID ${playerID} where deleted succesfully`})
    } catch (error) {res.status(500).json(error)}
}

exports.postGames = postGames;
if(dbLang === 'mysql'){
    exports.getGames = getGamesSQL;
    exports.deleteGames = deleteGamesSQL;
}else if(dbLang === 'mongo'){
    exports.getGames = getGamesSQL;
    exports.deleteGames = deleteGamesSQL;
}