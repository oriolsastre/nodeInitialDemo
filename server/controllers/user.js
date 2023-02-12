const {Models} = require('../database/initModels')
const Response = require('../models/Response')
const {encrypt} = require('../helpers/password')

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

/**
 * Create a new user given a valid username and password
 * @param {*} req Express req object 
 * @param {*} res Express res object
 * @returns {object} with new id and name.
 */
const postUser = async (req, res) => {
    try {
        const newUserName = req.body.user;
        const newUserPswd = req.body.pswd;
        let newUserLvl = 1;
        if(req.body.level){newUserLvl=req.body.level}
        const newUserPswdHashed = await encrypt(newUserPswd);
        const newUser = await Models.User.create({name: newUserName, password: newUserPswdHashed, level: newUserLvl})
        return res.status(201).json(new Response(201,null,"New user created", {id: newUser.id, name: newUser.name}))
    }catch (error){return res.status(500).json(new Response(500, {message: error.message}, "There was an error", null))}
}

module.exports = { getUserName, postUser }