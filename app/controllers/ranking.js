const { dbLang } = require('../config/config')
const { handleErrorResponse } = require('../helpers/error')
const noPlayersMessage = {message: "No players registered, or no players have played a game of dice."}
/********** CONTROLADOR PER A MYSQL **********/
if(dbLang==='mysql'){
    const { QueryTypes } = require('sequelize')
    const { sequelize } = require('../utils/dbMySQL');

    const sql_ranking = `SELECT player.id,
            CASE
                WHEN player.name IS NULL THEN 'ANÒNIM'
                ELSE player.name
            END AS 'name', COUNT(game.id) AS 'number_games', AVG(game.victoria) AS 'victory_rate'
            FROM player LEFT JOIN game ON player.id=game.player
            GROUP BY player.id`;

    const getRanking = async (req,res) => {
        try {
            const allPlayers = await sequelize.query(sql_ranking+" ORDER BY victory_rate DESC;", {type: QueryTypes.SELECT});
            if(allPlayers.length === 0){return res.status(200).json(noPlayersMessage)}
            const meanVR = await sequelize.query("SELECT AVG(victoria) AS 'value' FROM game", {type: QueryTypes.SELECT, plain:true});
            res.status(200).json({ranking: allPlayers, mean_victory_rate: meanVR.value})
        }catch(error){handleErrorResponse(res,error,500)}
    }

    const getWinner = async (req,res) => {
        try {
            const winner = await sequelize.query(sql_ranking+" ORDER BY victory_rate DESC LIMIT 1;", {type: QueryTypes.SELECT});
            if(winner.length === 0){return res.status(200).json(noPlayersMessage)}
            res.status(200).json(winner[0])
        }catch(error){handleErrorResponse(res,error,500)}
    }

    const getLoser = async (req,res) => {
        const sql_rankingNotNull = `SELECT player.id,
            CASE
                WHEN player.name IS NULL THEN 'ANÒNIM'
                ELSE player.name
            END AS 'name', COUNT(game.id) AS 'number_games', AVG(game.victoria) AS 'victory_rate'
            FROM player JOIN game ON player.id=game.player
            GROUP BY player.id ORDER BY victory_rate ASC LIMIT 1;`;
        try {
            const loser = await sequelize.query(sql_rankingNotNull, {type: QueryTypes.SELECT});
            if(loser.length === 0){return res.status(200).json(noPlayersMessage)}
            res.status(200).json(loser[0])
        }catch(error){handleErrorResponse(res,error,500)}
    }

    module.exports = { getRanking, getWinner, getLoser }
}
/********** CONTROLADOR PER A MONGO **********/
else if(dbLang==='mongo'){
    const getMongoRanking = require('../helpers/ranking')
    const getRanking = async (req,res) => {
        try {  
            const sortedPlayers = await getMongoRanking();
            if(sortedPlayers.length===0) return res.status(200).json(noPlayersMessage)
            let rates=0;
            let total=0;
            for(let jugador of sortedPlayers){
                if(jugador.number_games>0){
                    total += jugador.number_games;
                    rates += (jugador.victory_rate*jugador.number_games)
                }
                if(jugador.name===null || jugador.name.length===0){jugador.name="ANÒNIM/A"}
            }
            const mean_victory_rate = total===0 ? null : rates/total;
            res.status(200).send({ranking: sortedPlayers, mean_victory_rate})
        }catch(error){handleErrorResponse(res,error,500)}
    }

    const getWinner = async (req,res) => {
        try {
            const sortedPlayers = await getMongoRanking();
            if(sortedPlayers.length===0) return res.status(200).json(noPlayersMessage)
            const winner = sortedPlayers[0];
            if(winner.number_games===0){return res.status(200).json(noPlayersMessage)}
            if(winner.name===null || winner.name.length===0){winner.name="ANÒNIM/A"}
            res.status(200).json(winner)
        }catch(error){handleErrorResponse(res,error,500)}
    }
    
    const getLoser = async (req,res) => {
        try {
            const sortedPlayers = await getMongoRanking();
            if(sortedPlayers.length===0) return res.status(200).json(noPlayersMessage)
            let loser = 0;
            while(sortedPlayers.length>0){
                //haig de mirar que hagi jugat partides
                let possibleLoser = sortedPlayers.pop();
                if(possibleLoser.number_games>0){
                    loser = possibleLoser;
                    break;
                }
            }
            if(loser===0){return res.status(200).json(noPlayersMessage)}
            if(loser.name===null || loser.name.length===0){loser.name="ANÒNIM/A"}
            res.status(200).json(loser)
        }catch(error){handleErrorResponse(res,error,500)}
    }
    
    module.exports = { getRanking, getWinner, getLoser }
}