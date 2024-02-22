const { handleErrorResponse } = require('../helpers/error')
const { verifyToken } = require('../helpers/jwt')

const authJWTMW = (req,res,next) => {
    try {
        if(!req.headers.authorization){return res.status(401).json({error: "You are not logged in", solution: "Login with your user and password at /login to get a valid token."})}
        const token = req.headers.authorization.split(" ").pop()
        const dataToken = verifyToken(token)
        if(isNaN(dataToken.id) || !dataToken.name){return res.status(401).json({error: "Wrong credentials", solution: "Login with your user and password at /login to get a valid token."})}
        return next();
    } catch (error) { return handleErrorResponse(res, error, 401)}
}

module.exports = { authJWTMW }