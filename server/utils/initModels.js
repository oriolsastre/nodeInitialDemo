const Sequelize = require('sequelize')

const _User = require('../models/User')
const _Room = require('../models/Room')
const _Message = require('../models/Message')

function initModels(sequelize){
    const User = _User(sequelize, Sequelize.DataTypes)
    const Room = _Room(sequelize, Sequelize.DataTypes)
    const Message = _Message(sequelize, Sequelize.DataTypes)

    User.hasMany(Message, {as:'User_Messages', foreignKey: "user"});
    Message.belongsTo(User, {as:'Message_User', foreignKey: "user"});

    Room.hasMany(Message, {as:'Room_Messages', foreignKey: "room"});
    Message.belongsTo(Room, {as:'Message_Room', foreignKey: "room"});

    return {
        User,
        Room,
        Message
    }
}