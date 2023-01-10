const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');

const Game = sequelize.define("game", {
    gameID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Game;