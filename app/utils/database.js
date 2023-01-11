const Sequelize = require('sequelize')
const mysql2 = require('mysql2/promise');

const { db } = require('../config/config')

const sequelize = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: 'mysql',
    define: {freezeTableName: true}, //sinó les taules es pluralitzen automaticament fent servir el nom del model.
    logging: false
})

//crear la base de dades en cas que no existeixi. El sequelize només es connecta, no crea.
const createDB = async () => {
    const dbcnx = await mysql2.createConnection({
        host: db.host,
        port: db.port,
        user: db.user,
        password: db.password
    })
    await dbcnx.query(`CREATE DATABASE IF NOT EXISTS \`${db.name}\``)
}

module.exports = { createDB, sequelize };