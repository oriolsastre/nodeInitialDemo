const Sequelize = require('sequelize');
const { sequelize } = require('../utils/dbMySQL');

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
    },
    level: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '0: Administrador, 1: User normal'
    },
    password: {
        type: Sequelize.STRING(65),
        allowNull: false
    }
});

module.exports = Player;