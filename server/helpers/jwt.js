const jwt = require('jsonwebtoken')
const { JWT_Secret } = require('../config/config') //AFEGIR!!

/**
 * Returns a JWT given a username
 * @param {*} User data 
 * @returns {jwt}
 */
const tokenSign = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name
    },
    JWT_Secret,
    {expiresIn:"2h"});
}

const verifyToken = (tokenJWT) => {
    try {
        return jwt.verify(tokenJWT, JWT_Secret)
    }
    catch (error) {
        return false;
    }
}

module.exports = { tokenSign, verifyToken }