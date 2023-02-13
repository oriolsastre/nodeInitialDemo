const {Models} = require('../database/initModels')
const Response = require('../models/Response')

/**
 * Donada una id al req.params.room, mira si existeix algun canal amb aquesta id. Si existeix, pots seguir.
 * @param {req} req - Objecte req d'express 
 * @param {res} res - Objecte res d'express
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
 * Donat un nom al req.body.name, comprova si ja existeix un canal amb aquest nom. Si no existeix, pots seguir.
 * @param {req} req - Objecte req d'express 
 * @param {res} res - Objecte res d'express
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
 * Donada una id al req.params.user, comprova si existeix algun usuari amb aquesta id. Si existeix, pots seguir.
 * @param {req} req - Objecte req d'express 
 * @param {res} res - Objecte res d'express
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