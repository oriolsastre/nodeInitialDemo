const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Player = sequelize.define("player", {
    playerID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(25),
        unique: true
    },
    level: {
        type: Sequelize.TINYINT,
        defaultValue: 1     //0: Administrador, 1: User normal
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Player;