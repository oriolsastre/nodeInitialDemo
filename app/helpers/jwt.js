const jwt = require('jsonwebtoken')
const { JWT_Secret } = require('../config/config') 

/**
 * 
 * @param {*} player Objecte Player
 */
const tokenSign = (player) => {
    const sign = jwt.sign({
        id: player.id,
        name: player.name
    },
    JWT_Secret,
    {expiresIn:"2h"})
    return sign;
}

const verifyToken = async (tokenJWT) => {
    try {
        return jwt.verify(tokenJWT, JWT_Secret)
    } catch (error) {
        return error;
    }
}

module.exports = { tokenSign, verifyToken }