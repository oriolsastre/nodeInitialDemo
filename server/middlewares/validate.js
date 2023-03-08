const { Models } = require('../database/initModels')
const Response = require('../models/Response')

/**
 * Given an id at req.params.room, it checkt if there exists a room with that id. If it exists, continue.
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @param {function} next
 */
const existsRoomMW = async (req, res, next) => {
    const roomID = req.params.room;
    try {
        const room = await Models.Room.findOne({ where: { id: roomID } })
        if (room === null || !roomID) { return res.status(400).json(new Response(400, { message: "This room does not exist." }, "There was an error")) }
        return next();
    } catch (error) { return res.status(500).json(new Response(500, { message: error.message }, "There was an error.")) }
}

/**
 * Given a name at req.body.name, it checks if there exists a room with that name. If not, continue.
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @param {function} next 
 */
const existsNotRoomMW = async (req, res, next) => {
    const newRoom = req.body.name;
    try {
        const existsRoom = await Models.Room.findOne({ where: { name: newRoom } });
        if (existsRoom === null) { return next(); }
        return res.status(400).json(new Response(400, { message: "There already exists a room with this name" }, "There was an error"));
    } catch (error) { return res.status(500).json(new Response(500, { message: error.message }, "There was an error.")) }
}

/**
 * Given a name for a room at req.body.name, it checks if its a valid room name. Trimming any leading blank spaces and deleting all not alfanumeric characters.
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @param {function} next
 */
const validRoomNameMW = (req, res, next) => {
    let roomName = req.body.name;
    if (roomName) {
        let treatedRoomName = roomName.trim().replace(/[^a-zA-Z0-9]/g, '');
        if (treatedRoomName.length > 0 && treatedRoomName.length < 11) {
            req.body.name = treatedRoomName;
            return next();
        }
    }
    return res.status(400).json(new Response(400, { message: "Room name is invalid" }, "There was an error"));
}

/**
 * Given an id at req.params.user, it checks if there exists a user with that id. If it exists, continue.
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @param {function} next 
 */
const existsUserMW = async (req, res, next) => {
    const checkUser = req.params.user;
    try {
        const user = await Models.User.findOne({ where: { id: checkUser } });
        if (user === null || !checkUser) { return res.status(400).json(new Response(400, { message: "This user does not exist." }, "There was an error")) }
        return next();
    } catch (error) { return res.status(500).json(new Response(500, { message: error.message }, "There was an error.")) }
}

/**
 * Given a user name at req.body.user, it checks if it's valid. Meaning, only contains alphanumeric characters and length between 1-20.
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @param {function} next 
 */
const validUserMW = (req, res, next) => {
    const checkUser = req.body.user;
    if (/^[a-z0-9]+$/i.test(checkUser) && checkUser.length > 0 && checkUser.length <= 20) {
        return next();
    }
    return res.status(400).json(new Response(400, { message: "User name is invalid. Only alphanumeric characters." }, "There was an error"));
}

module.exports = { existsRoomMW, existsNotRoomMW, validRoomNameMW, existsUserMW, validUserMW }