const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Player = require('../models/Player');
const Game = require('../models/Game');

Player.hasMany(Game, {foreignKey: 'player'})

sequelize
    .sync()
    //.then(res => {console.log(res);})
    .catch(err => {console.log(err)})