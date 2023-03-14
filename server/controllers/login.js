const {Models} = require('../database/initModels')
const Response = require('../models/Response')

const { compare } = require('../helpers/password')
const { tokenSign } = require('../helpers/jwt')

/**
 * Given valid credentials on the body {user, pswd} a JWToken is returned for that user
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @returns {{token: JWT}}
 */
const postLogin = async (req, res) => {
    try {
        const user = req.body.user;
        const pswd = req.body.pswd;
        const findUser = await Models.User.findOne({where: {name: user}});
        if(findUser === null){return res.status(401).json(new Response(401,{message: "User not found"}, "There was an error", null))}
        const checkPswd = await compare(pswd, findUser.password)
        if(!checkPswd){return res.status(401).json(new Response(401,{message: "Wrong password"}, "There was an error", null))}
        const tokenData = {id: findUser.id, name: findUser.name}
        const token = tokenSign(tokenData);
        return res.status(200).json(new Response(200,null,"Login OK",{name: findUser.name, id: findUser.id, token}))
    } catch(error) {return res.status(500).json(new Response(500, {message: error.message}, "Error connecting to server", null))}
}

module.exports = { postLogin }