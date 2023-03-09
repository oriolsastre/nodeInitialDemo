import Mongoose from 'mongoose'
import { db as dbconfig } from '../config/config.js';

export const connectMongo = async () => {
    const enllacMongo = `mongodb://${dbconfig.mongo.host}:${dbconfig.mongo.port}/${dbconfig.mongo.name}`
    Mongoose.set('strictQuery', true)
    Mongoose.connect(enllacMongo, {
        user: dbconfig.mongo.user,
        pass: dbconfig.mongo.password
    })
    const dbcnx = Mongoose.connection;
    dbcnx.once('open', () => console.log('Connexió al MongoDB correcta'));
    dbcnx.on('error', (err) => console.log(err.message));
    dbcnx.on('disconnected', () => console.log("S'ha tancat la connexió"));
}