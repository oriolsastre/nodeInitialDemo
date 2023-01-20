require("dotenv").config({ path:__dirname+'/./../../.env'})

const port = process.env.EXPRESS_PORT || 3000;

const dbLang = process.env.DB_ENV || 'mysql';

const db = {
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD,
        name: process.env.MYSQL_NAME || 'daus'
    },
    mongo: {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || 27017,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        name: process.env.MONGO_NAME || 'daus'
    }
}

const JWT_Secret = process.env.JW_Secret || 'JocDeDaus';

module.exports = { port, dbLang, db, JWT_Secret }