const Mongoose = require('mongoose')
const { db } = require('../config/config');

const connectMongo = () => {
    const enllacMongo=`mongodb://${db.mongo.host}:${db.mongo.port}/${db.mongo.name}`
    Mongoose.set('strictQuery', true)
    Mongoose.connect(enllacMongo, {
        user: db.mongo.user,
        pass: db.mongo.password
    }, (err) => err ? console.log(err) : null )
    const dbcnx = Mongoose.connection;
    dbcnx.once('open', () => console.log('Connexió al MongoDB correcta'));
    dbcnx.on('error', (err) => console.log(err.message));
    dbcnx.on('disconnected', () => console.log("S'ha tancat la connexió"));
}

module.exports = connectMongo