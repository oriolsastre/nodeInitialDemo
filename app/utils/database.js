const Sequelize = require('sequelize')
const mysql2 = require('mysql2');

const { db } = require('../config/config')

const dbcnx = mysql2.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password
})

dbcnx.query(
    `CREATE DATABASE IF NOT EXISTS \`${db.name}\``, (err,res) => {
        if(err){console.log(err);}
    }
)

const sequelize = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: 'mysql',
    define: {freezeTableName: true} //sinó les taules es pluralitzen automaticament fent servir el nom del model.
})

module.exports = sequelize;