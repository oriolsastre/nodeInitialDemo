const {Models} = require('../database/initModels')
const Response = require('../models/Response')

/**
 * Given an id at req.params.room, it checkt if there exists a room with that id. If it exists, continue.
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @param {function} next
 */
const existsRoomMW = async (req,res,next) => {
    const roomID = req.params.room;
    try {
        const room = await Models.Room.findOne({where: {id: roomID}})
        if(room === null || !roomID){return res.status(400).json(new Response(400,{message: "This room does not exist."}, "There was an error"))}
        return next();
    } catch (error) { return res.status(500).json(new Response(500, {message: error.message}, "There was an error.")) }
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
        const existsRoom = await Models.Room.findOne({where: {name: newRoom}});
        if(existsRoom === null){ return next(); }
        return res.status(400).json(new Response(400, {message: "There already exists a room with this name"}, "There was an error"));
    } catch (error) { return res.status(500).json(new Response(500, {message: error.message}, "There was an error.")) }
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
        const user = await Models.User.findOne({where: {id: checkUser}});
        if(user === null || !checkUser){return res.status(400).json(new Response(400,{message: "This user does not exist."}, "There was an error"))}
        return next();
    } catch (error) { return res.status(500).json(new Response(500, {message: error.message}, "There was an error.")) }
}

module.exports = { existsRoomMW, existsNotRoomMW, existsUserMW }