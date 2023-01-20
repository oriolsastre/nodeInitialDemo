const Mongoose = require('mongoose')
const { db } = require('../config/config');

console.log("Creo la DB de mongo, segurament creant ja el primer usuari Admin");

const credencialMongo = `${db.mongo.user}:${db.mongo.password}@`;

const enllacMongo=`mongodb://${db.mongo.host}:${db.mongo.port}/${db.mongo.name}`
Mongoose.set('strictQuery', true)
Mongoose.connect(enllacMongo, {
    user: db.mongo.user,
    pass: db.mongo.password
})

//module.exports = { mongoose }