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
        if(allPlayers.length === 0){return res.status(200).json({message: "No Players registered"})}
        const meanVR = await sequelize.query("SELECT AVG(victoria) AS 'value' FROM game", {type: QueryTypes.SELECT, plain:true});
        res.status(200).json({ranking: allPlayers, mean_victory_rate: meanVR.value})
    }catch(error){res.status(500).json(error)}
}

const getWinner = async (req,res) => {
    try {
        const winner = await sequelize.query(sql_ranking+" ORDER BY victory_rate DESC LIMIT 1;", {type: QueryTypes.SELECT});
        if(winner.length === 0){return res.status(200).json({message: "No Players registered"})}
        res.status(200).json(winner[0])
    }catch(error){res.status(500).json(error)}
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
        if(loser.length === 0){return res.status(200).json({message: "No Players registered"})}
        res.status(200).json(loser[0])
    }catch(error){res.status(500).json(error)}
}

module.exports = { getRanking, getWinner, getLoser }