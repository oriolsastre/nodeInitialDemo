const {Models} = require('../database/initModels')

/**
 * Create a new room where to chat
 * @param {String} roomName - New room name 
 * @returns 
 */
const createRoom = async (roomName) => await Models.Room.create({name: roomName});

module.exports = { createRoom }