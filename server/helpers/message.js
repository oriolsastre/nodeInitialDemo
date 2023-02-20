const {Models} = require('../database/initModels')
const { Op } = require("sequelize");

/**
 * 
 * @param {Integer} user - user ID that's posts the message 
 * @param {Integer} room - room ID where the message is posted
 * @param {String} message - message contents
 * @returns {Message}
 */
const createMessage = async (user, room, message) => {
    return await Models.Message.create({message, user, room});
}

/**
 * 
 * @param {Integer} room - room ID from where the messages are fetched 
 * @param {Integer | 20} limit - number of messages fetched
 * @param {Date | null} before - fetch messages before this timestamp
 * @returns {Array<Message>}
 */
const getMessages = async (room, limit=20, before=null) => {
    let whereCondition
    if(before===null){
        whereCondition = {room}
    }else{
        whereCondition = {
            room,
            createdAt: {[Op.lt]: Date.parse(before)}
        }
    }
    return Models.Message.findAll({
        include: [{
            model: Models.User,
            attributes: ['name']
        }],
        where: whereCondition,
        order: [['createdAt','DESC']],
        limit,
        raw:true});
}

module.exports = { createMessage, getMessages }