const Sequelize = require('sequelize')

const { db } = require('../config/config')

const sequelize = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: 'mysql'
})

module.exports = sequelize;