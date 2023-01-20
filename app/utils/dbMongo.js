const Mongoose = require('mongoose')
const { db } = require('../config/config');

const connectMongo = () => {
    const enllacMongo=`mongodb://${db.mongo.host}:${db.mongo.port}/${db.mongo.name}`
    Mongoose.set('strictQuery', true)
    Mongoose.connect(enllacMongo, {
        user: db.mongo.user,
        pass: db.mongo.password
    }, (err) => err ? console.log(err) : null )
}

module.exports = connectMongo