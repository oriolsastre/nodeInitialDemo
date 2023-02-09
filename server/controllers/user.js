const {Models} = require('../database/initModels')
const Response = require('../models/Response')

const getUser = async (req, res) => {

}

/**
 * Given an input user, searches for users which names equals the output.
 * Used to check if a new username can register and the chosen name is free.
 * @returns {object} null or object {name: username} if it exists
 */
const getUserName = async (req, res) => {
    try {
        const qUser = req.params.user.toString();
        const user = await Models.User.findOne({where: {name: qUser}, attributes: ['name'], raw: true})
        await res.status(200).json(new Response(200,null,null,user))
    }catch (error){return res.status(500).json(new Response(500, {message: error.message}, "There was an error", null))}
}

const postUser = async (req, res) => {
    
}

module.exports = { getUser, getUserName, postUser }