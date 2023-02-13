const Response = require('../models/Response')
const { createRoom } = require('../helpers/room')

const postRoom = async (req, res) => {
    const newRoomName = req.body.name;
    if(!newRoomName){return res.status(400).json(new Response(400,{message: "Room name sent is invalid"}, "There was an error"))}
    try {
        const newRoom = await createRoom(newRoomName)
        return res.status(201).json(new Response(201,null,"New room created",{name: newRoom.name}))
    } catch (error) { return res.status(500).json(new Response(500, {message: error.name}, "There was an error", null)) }
}

const deleteRoom = async (req, res) => {

}

module.exports = { postRoom }