const { Models } = require('../../database/initModels');
const Room = require('../Room');

module.exports = class repositoryRoom {
    constructor() {}

    async crear(name) {
        let newRoom = new Room(null, name)
        const newRoomSQL = await Models.Room.create({name});
        newRoom.id=newRoomSQL.id;
        return newRoom;
    }

    
}