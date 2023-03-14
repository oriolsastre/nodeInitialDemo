const Response = require('../models/Response')
const { fetchRooms, createRoom } = require('../helpers/room')

const getRooms = async (req, res) => {
    try {
        const allRooms = await fetchRooms()
        return res.status(200).json(new Response(200,null,null,allRooms))
    } catch (error) { return res.status(500).json(new Response(500, {message: error.name}, "There was an error", null)) }
}

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

module.exports = { getRooms, postRoom }