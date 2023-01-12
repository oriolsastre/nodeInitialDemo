const Game = require('../models/Game')

const getGames = async (req,res) => {
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
    const dau1 = Math.ceil(Math.random()*6)
    const dau2 = Math.ceil(Math.random()*6)
    try{
        const newGame = await Game.create({dau1: dau1, dau2: dau2, victoria: dau1+dau2===7, player: playerID})
        res.status(201).json(newGame)
    }catch(error){res.status(500).json(error)}  
}

const deleteGames = async (req,res) => {
    const playerID = req.params.id;
    try {
        await Game.destroy({where: {player: playerID}})
        res.status(200).json({message: `Games of Player with ID ${playerID} where deleted succesfully`})
    } catch (error) {res.status(500).json(error)}
}

module.exports = { getGames, postGames, deleteGames }