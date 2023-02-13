const Sequelize = require('sequelize')
const { mysqlConfig, chatAdminPswd } = require('../config/config')

const _User = require('../models/User')
const _Room = require('../models/Room')
const _Message = require('../models/Message')

const { encrypt } = require('../helpers/password')

function initModels (sequelize){
    const User = _User(sequelize, Sequelize.DataTypes)
    const Room = _Room(sequelize, Sequelize.DataTypes)
    const Message = _Message(sequelize, Sequelize.DataTypes)

    User.hasMany(Message, {foreignKey: "user"});
    Message.belongsTo(User, {foreignKey: "user"});

    Room.hasMany(Message, {foreignKey: "room"});
    Message.belongsTo(Room, {foreignKey: "room"});

    return {
        User,
        Room,
        Message
    }
}

const sequelize = new Sequelize(mysqlConfig.name, mysqlConfig.user, mysqlConfig.password, {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    define: {freezeTableName: true},
    logging: false
})

const Models = initModels(sequelize)

const initDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: false})
        //Si no n'hi ha, creo d'inici un administrador
        const admin = await Models.User.findOne({where: {name: 'Admin'}})
        if(admin === null){
            const adminPswd = await encrypt(chatAdminPswd)
            await Models.User.create({name: 'Admin', password: adminPswd, level: 0})
        }
        //Si no existeix un canal principal, el creo d'inici
        const main = await Models.Room.findOne({where: {id: 1}})
        if(main === null){ await Models.Room.create({id: 1, name: "Principal"}) }
        console.log('Connexió a la DB satisfactòria');
    } catch (error) {
        console.log(error.message);
        console.log("There was an error connecting with the database");
        process.exit(1)
    } 
}

module.exports = { Models, initDB }