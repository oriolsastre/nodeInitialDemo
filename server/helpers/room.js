const { Op } = require("sequelize");
const {Models} = require('../database/initModels')

/**
 * Get the room matchin the given name. If no name is given all rooms of the chat application are returned.
 * @returns {Promise<[Rooms]>}
 */
const fetchRooms = (name=null) => {
    if(name){
        return Models.Room.findOne({where: {name}, raw:true})
    }
    return Models.Room.findAll({order: [['id','ASC']], raw:true})
}

/**
 * Create a new room where to chat
 * @param {String} roomName - New room name 
 * @returns {Promise<Room>}
 */
const createRoom = (roomName) => Models.Room.create({name: roomName});

module.exports = { fetchRooms, createRoom }