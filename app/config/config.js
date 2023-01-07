require("dotenv").config()

const port = process.env.EXPRESS_PORT || 3000;

const db = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '1234',
    name: process.env.DATABASE_NAME || 'daus'
}

module.exports = { port, db }