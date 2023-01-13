const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');

const Game = sequelize.define("game", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dau1: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    dau2: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    victoria: {
        type: Sequelize.BOOLEAN,
        defaultValue: (this.dau1+this.dau2)===7,
        allowNull: false
    }
},{updatedAt: false});

module.exports = Game;