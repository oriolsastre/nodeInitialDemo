const Response = require('../models/Response')
const { verifyToken } = require('../helpers/jwt')

/**
 * It checks that the header bears a token and that its valid. To protect the routes of the API for messages and rooms
 * @param {req} req - Express' req object 
 * @param {res} res - Express' res object
 * @param {function} next
 */
exports.authJWT = (req,res,next) => {
    try {
        if(!req.headers.authorization){return res.status(401).json(new Response(401, {message: "Wrong token"}, "There was an error."))}
        const token = req.headers.authorization.split(" ").pop()
        const dataToken = verifyToken(token)
        if(isNaN(dataToken.id) || !dataToken.name){return res.status(401).json(new Response(401, {message: "Wrong token"}, "There was an error."))}
        return next();
    } catch (error) { return res.status(500).json(new Response(500, {message: error.message}, "There was an error.")) }
}