const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Game = sequelize.define("game", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(25),
        unique: true
    }
});

module.exports = Game;