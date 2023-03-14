const Response = require('../models/Response')
const { createMessage, getMessages } = require('../helpers/message')

/**
 * Get the Messages by Room given its ID. If there is no limit passed as req.body.limit, a max of 20 messages will be fetched.
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @returns {Array} - Array with the messages.
 */
const getMessageR = async (req, res) => {
    const room = req.params.room;
    let limit;
    (parseInt(req.body.limit) && req.body.limit < 20 && 0 < req.body.limit) ? limit=req.body.limit : limit=20
    try {
        const messages = await getMessages(room, limit)
        return res.status(200).json(new Response(200,null,"Messages fetched", messages))
    } catch (error) { return res.status(500).json(new Response(500, {message: error.message}, "There was an error.")) }
}

const getMessageRBefore = async (req, res) => {
    const room = req.params.room;
    const before = req.params.timestamp
    try {
        const messages = await getMessages(room, 20, before)
        return res.status(200).json(new Response(200,null,"Messages fetched before", messages))
    } catch (error) { return res.status(500).json(new Response(500, {message: error.message}, "There was an error.")) }

}

const postMessageUR = async (req, res) => {
    const user = req.params.user;
    const room = req.params.room;
    const message = req.body.message;
    if(!message){return res.status(400).json(new Response(400,{message: "Message sent is invalid"}, "There was an error"))}
    try {
        //message = encodeURIComponent(message) això en realitat vull fer-ho a la banda client
        const newMessage = await createMessage(user, room, message)
        return res.status(201).json(new Response(201,null,"Message created",{id: newMessage.id, user: newMessage.user, room: newMessage.room, message: newMessage.message}))
    } catch (error) { return res.status(500).json(new Response(500, {message: error.message}, "There was an error.")) }
}

module.exports = {getMessageR, getMessageRBefore, postMessageUR }