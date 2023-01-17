const jwt = require('jsonwebtoken')
const { JWT_Secret } = require('../config/config') 

/**
 * 
 * @param {*} player Objecte Player
 */
const tokenSign = (player) => {
    return jwt.sign({
        id: player.id,
        name: player.name
    },
    JWT_Secret,
    {expiresIn:"2h"});
}

const verifyToken = (tokenJWT) => {
    try {
        return jwt.verify(tokenJWT, JWT_Secret)
    } catch (error) {
        return error;
    }
}

module.exports = { tokenSign, verifyToken }