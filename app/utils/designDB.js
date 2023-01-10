const { sequelize, createDB } = require('./database');
const Player = require('../models/Player');
const Game = require('../models/Game');

const designDB = async () => {
    await createDB();
    Player.hasMany(Game, {foreignKey: 'player'})
    await sequelize.sync({ force: false })
}



module.exports = {designDB};