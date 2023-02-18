const {Models} = require('../database/initModels')

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
 * @param {Integer} limit - number of messages fetched
 * @returns {Array<Message>}
 */
const getMessages = async (room, limit=20) => {
    return Models.Message.findAll({
        include: [{
            model: Models.User,
            attributes: ['name']
        }],
        where: {room},
        order: [['createdAt','DESC']],
        limit,
        raw:true});
}

module.exports = { createMessage, getMessages }