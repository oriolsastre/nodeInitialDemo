let Game, Player;
const { dbLang } = require('../config/config')
const { handleErrorResponse } = require('../helpers/error')
const tirarDaus = require('../helpers/daus')
if(dbLang==='mysql'){ Game = require('../models/Game') }
else if(dbLang==='mongo'){ Player = require('../models/Mongo/Player')}

const getGames = async (req,res) => {
    const playerID = req.params.id;
    try {
        let allGames;
        if(dbLang==='mysql'){allGames = await Game.findAll({attributes: ['dau1','dau2','victoria'], where: {player: playerID}})}
        else if(dbLang==='mongo'){
            const jugadorGames = await Player.findOne({id: playerID})
            allGames = jugadorGames.games
        } 
        if(allGames.length===0) return res.status(400).json({error: "This Player has not played a single game of dice", solution: "Play a game at this same endpoint with a POST request!"})
        res.status(200).json(allGames)
    }catch(error){handleErrorResponse(res,error,500)}
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
    }catch(error){handleErrorResponse(res,error,500)}
}

const deleteGames = async (req,res) => {
    const playerID = req.params.id;
    try {
        if(dbLang==='mysql'){await Game.destroy({where: {player: playerID}})}
        else if(dbLang==='mongo'){await Player.findOneAndUpdate({id: playerID}, {games: []})}
        res.status(200).json({message: `Games of Player with ID ${playerID} where deleted succesfully`})
    }catch(error){handleErrorResponse(res,error,500)}
}

module.exports = { getGames, postGames, deleteGames }