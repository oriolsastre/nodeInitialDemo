const jwt = require('jsonwebtoken')
const { JWT_Secret } = require('../config/config')

/**
 * Returns a JWT given a username
 * @param {object} userData - {id, name} 
 * @returns {JWT}
 */
const tokenSign = (userData) => {
    return jwt.sign(userData,
    JWT_Secret,
    {expiresIn:"2h"});
}

/**
 * Verifies a given JWT
 * @param {JWT} tokenJWT 
 * @returns 
 */
const verifyToken = (tokenJWT) => {
    try { return jwt.verify(tokenJWT, JWT_Secret) }
    catch (error) { return false; }
}

module.exports = { tokenSign, verifyToken }