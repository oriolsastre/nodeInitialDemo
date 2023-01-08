const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Player = sequelize.define("player", {
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

module.exports = Player;