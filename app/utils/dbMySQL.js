const mysql2 = require('mysql2');
const Sequelize = require('sequelize')
const { db } = require('../config/config');

const dbcnx = mysql2.createConnection({
    host: db.mysql.host,
    port: db.mysql.port,
    user: db.mysql.user,
    password: db.mysql.password
})
dbcnx.on('error', err => {
    console.log("No s'ha pogut establir connexió amb la base de dades MySQL")
    process.exit(1)
})
dbcnx.query(`CREATE DATABASE IF NOT EXISTS \`${db.mysql.name}\``)
dbcnx.end(err => {err ? console.log(err) : null})
/* CREACIÓ DE LA BASE DE DADES MYSQL QUE S'USA COM A PERSISTÈNCIA. EL SEQUELIZE NECESSITA QUE LA DB EXISTEIXI */

const sequelize = new Sequelize(db.mysql.name, db.mysql.user, db.mysql.password, {
    host: db.mysql.host,
    port: db.mysql.port,
    dialect: 'mysql',
    define: {freezeTableName: true}, //sinó les taules es pluralitzen automaticament fent servir el nom del model.
    logging: false
})

module.exports = { sequelize }